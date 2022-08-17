import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next'
import crypto from 'crypto'

const handler: NextApiHandler = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  switch (req.method) {
    case 'POST':
      try {
        const webhookSecret: string | undefined = process.env.WEBHOOK_SECRET

        if (!webhookSecret) {
          console.log('webhook secret missing')
          return res
            .status(500)
            .json({ error: { message: 'Internal server error.' } })
        }

        const shasum = crypto.createHmac('sha256', webhookSecret)
        shasum.update(JSON.stringify(req.body))
        const digest = shasum.digest('hex')
        const signatureHeader = req.headers['x-razorpay-signature']

        if (digest !== signatureHeader)
          return res.status(502).json({ message: 'Bad gateway' })

        return res.status(200).json({ status: 'Ok' })
      } catch (e: any) {
        return res
          .status(500)
          .json({ error: { message: 'Internal server error' } })
      }
    default:
      return res.status(200).json({ message: 'ok' })
  }
}

export default handler
