import type { NextApiHandler, NextApiRequest, NextApiResponse } from 'next'
import connectToDb from '../../../utils/db'
import Product, { IProduct } from '../../../models/product.model'
import mongoose, { HydratedDocument } from 'mongoose'

connectToDb()

const handler: NextApiHandler = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  try {
    const { sid } = req.query

    //NOT A VALID MONGOD OBJECT ID
    if (
      typeof sid === 'string' &&
      mongoose.Types.ObjectId.isValid(sid) === false
    ) {
      return res.status(400).json({ error: { message: 'Invalid product id' } })
    }

    //GET PRODUCT BY ID
    const product: HydratedDocument<IProduct> | null = await Product.findById({
      _id: sid,
    })
    if (!product) {
      return res.status(404).json({
        error: { message: `Product with  product id ${sid} not found.` },
      })
    }

    return res.status(200).json({ message: 'Product found', product })
  } catch (e: any) {
    console.log(e.message)
    return res.status(500).json({ error: { message: 'Internal server error' } })
  }
}

export default handler
