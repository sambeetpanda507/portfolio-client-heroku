import type { NextApiHandler, NextApiRequest, NextApiResponse } from 'next'
import connectToDb from '../../utils/db'
import { contactSchema } from '../../schema/contact.schema'
import validation from '../../utils/validation'
import Contact, { IContact } from '../../models/contact.model'
import { HydratedDocument } from 'mongoose'

connectToDb()

const handler: NextApiHandler = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  switch (req.method) {
    case 'POST':
      try {
        const contactObj: HydratedDocument<IContact> = new Contact({
          email: req.body.email,
          firstName: req.body.firstName,
          lastName: req.body.lastName,
          message: req.body.message,
        })

        await contactObj.save()

        return res.status(200).json({ message: 'Message sent.' })
      } catch (e: any) {
        return res.status(500).json({ error: { message: e.message } })
      }
    default:
      res.status(200).send('OK')
      break
  }
}

export default validation(contactSchema, handler)
