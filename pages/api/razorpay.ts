import type { NextApiHandler, NextApiRequest, NextApiResponse } from 'next'
import razorPaySchema from '../../schema/razorpay.schema'
import connectToDb from '../../utils/db'
import validation from '../../utils/validation'
import Razorpay from 'razorpay'

connectToDb()

const handler: NextApiHandler = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  switch (req.method) {
    case 'POST':
      try {
        const razorPayApiKey: string | undefined = process.env.RZ_PAY_API_KEY
        const razorPayApiSecret: string | undefined =
          process.env.RZ_PAY_API_SECRET

        if (!razorPayApiKey || !razorPayApiSecret) {
          console.log('razor pay api key: ', razorPayApiKey !== undefined)
          console.log('razor pay api secret: ', razorPayApiSecret !== undefined)
          return res
            .status(500)
            .json({ error: { message: 'Internal server error.' } })
        }

        const instance = new Razorpay({
          key_id: razorPayApiKey,
          key_secret: razorPayApiSecret,
        })

        const orderOpt = {
          amount: req.body.amount * 100,
          currency: 'INR',
          receipt: 'order_receipt_id11',
        }

        const paymentRes = await instance.orders.create(orderOpt)

        return res
          .status(201)
          .json({
            message: 'Successfully create order',
            orderId: paymentRes.id,
          })
      } catch (e: any) {
        console.log(e.message)
        return res
          .status(500)
          .json({ error: { message: 'Internal server error' } })
      }
    default:
      return res.status(200).json({ message: 'Ok' })
  }
}

export default validation(razorPaySchema, handler)
