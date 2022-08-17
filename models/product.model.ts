import { model, models, Schema } from 'mongoose'

export interface IProduct {
  img: string
  title: string
  count: number
  mrp: number
  price: number
  details: string
}

const productSchema = new Schema<IProduct>(
  {
    img: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    mrp: {
      type: Number,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    details: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
)

const Product = models.Product || model<IProduct>('Product', productSchema)

export default Product
