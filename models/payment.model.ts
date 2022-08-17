import { models, model, Schema } from 'mongoose'

interface IOrder {
  title: string
  count: number
  mrp: number
  price: number
}

export interface IPayment {
  paymentId: string
  amount: number
  currency: string
  email: string
  contact: string
  orders: IOrder[]
}

const paymentSchema = new Schema<IPayment>(
  {
    paymentId: { type: String, required: true },
    amount: { type: Number, required: true },
    currency: { type: String, required: true },
    email: { type: String, required: true },
    contact: { type: String, required: true },
    orders: [{ title: String, count: Number, mrp: Number, price: Number }],
  },
  { timestamps: true }
)

const Payment = models.Payment || model<IPayment>('Payment', paymentSchema)

export default Payment
