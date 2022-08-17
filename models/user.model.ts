import { model, Schema, models } from 'mongoose'

export interface IUser {
  name: string
  email: string
  password: string
  avatar: string
}

const userSchema = new Schema<IUser>(
  {
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
    password: {
      type: String,
      required: true,
    },
    avatar: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
)

const User = models.User || model<IUser>('User', userSchema)

export default User
