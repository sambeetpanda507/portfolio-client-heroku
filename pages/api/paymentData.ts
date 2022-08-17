import type { NextApiHandler, NextApiRequest, NextApiResponse } from 'next'
import connectToDb from '../../utils/db'
import Payment, { IPayment } from '../../models/payment.model'
import { HydratedDocument } from 'mongoose'
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
          console.log('api key: ', razorPayApiKey !== undefined)
          console.log('api secret: ', razorPayApiSecret !== undefined)
          return res
            .status(500)
            .json({ error: { message: 'Internal server error.' } })
        }

        const instance = new Razorpay({
          key_id: razorPayApiKey,
          key_secret: razorPayApiSecret,
        })

        const paymentDetails = await instance.payments.fetch(req.body.paymentId)

        const paymentObj: HydratedDocument<IPayment> = new Payment({
          paymentId: paymentDetails.id,
          amount: paymentDetails.amount,
          currency: paymentDetails.currency,
          email: paymentDetails.email,
          contact: paymentDetails.contact,
          orders: req.body.cart,
        })

        await paymentObj.save()
        return res.status(201).json({ message: 'Payment successfull' })
      } catch (e: any) {
        console.log('-------------------------')
        console.log('error:', e.message)
        console.log('-------------------------')
        return res
          .status(500)
          .json({ error: { message: 'Internal server error.' } })
      }
    default:
      return res.status(200).json({ message: 'Ok' })
  }
}

export default handler
