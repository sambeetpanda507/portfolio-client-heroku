import type { NextApiHandler, NextApiRequest, NextApiResponse } from 'next'
import connectToDb from '../../../utils/db'
import Product, { IProduct } from '../../../models/product.model'
import productSchema from '../../../schema/product.schema'
import validation from '../../../utils/validation'
import { HydratedDocument } from 'mongoose'

connectToDb()

const handler: NextApiHandler = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  switch (req.method) {
    case 'POST':
      try {
        const product: HydratedDocument<IProduct> = new Product({
          img: req.body.img,
          title: req.body.title,
          details: req.body.details,
          price: req.body.price,
          mrp: req.body.mrp,
        })

        await product.save()

        return res
          .status(201)
          .json({ message: 'Product saved successfully', product })
      } catch (e: any) {
        return res
          .status(500)
          .json({ error: { message: 'Internal server error' } })
      }
    default:
      try {
        //get all products from db
        const products: HydratedDocument<IProduct>[] = await Product.find({})
        return res.status(200).json({
          message: 'Products fetched successfully',
          products,
        })
      } catch (e: any) {
        return res
          .status(500)
          .json({ error: { message: 'Internal server error' } })
      }
  }
}

export default validation(productSchema, handler)
