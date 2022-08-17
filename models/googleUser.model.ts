import { models, model, Schema } from 'mongoose'

export interface IGoogleUser {
  name: string
  email: string
  avatar: string
}

const googleUserSchema = new Schema<IGoogleUser>({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  avatar: {
    type: String,
    required: true,
  },
})

const GoogleUser =
  models.GoogleUser || model<IGoogleUser>('GoogleUser', googleUserSchema)

export default GoogleUser
