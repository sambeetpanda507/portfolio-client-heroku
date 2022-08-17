import type { NextApiHandler, NextApiRequest, NextApiResponse } from 'next'
import connectToDb from '../../utils/db'
import Payment, { IPayment } from '../../models/payment.model'
import * as Yup from 'yup'
import validation from '../../utils/validation'
import { HydratedDocument } from 'mongoose'

connectToDb()

const handler: NextApiHandler = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  switch (req.method) {
    case 'POST':
      try {
        const paymentData: HydratedDocument<IPayment>[] = await Payment.find({
          email: req.body.email,
        })

        return res.status(200).json({
          message: 'Payment data fetched',
          orderDetails: paymentData,
        })
      } catch (e: any) {
        console.log(e.message)
        return res
          .status(500)
          .json({ error: { message: 'Internal server error.' } })
      }
    default:
      return res.status(200).json({ message: 'Ok' })
  }
}

export default validation(
  Yup.object({
    email: Yup.string().email().required("Email can't left empty"),
  }),
  handler
)
