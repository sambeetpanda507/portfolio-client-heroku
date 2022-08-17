import { Schema, model, models } from 'mongoose'

export interface IContact {
  firstName: string
  lastName: string
  email: string
  message: string
}

const contactSchema = new Schema<IContact>(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
)

const Contact = models.Contact || model<IContact>('Contact', contactSchema)

export default Contact
