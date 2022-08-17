import type { NextApiHandler, NextApiResponse, NextApiRequest } from 'next'
import validation from '../../utils/validation'
import registerSchema from '../../schema/register.schema'
import connectToDb from '../../utils/db'
import User, { IUser } from '../../models/user.model'
import bcrypt from 'bcrypt'
import { HydratedDocument } from 'mongoose'

connectToDb()

const handler: NextApiHandler = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  switch (req.method) {
    case 'POST':
      try {
        //check already present user
        const user = await User.findOne({ email: req.body.email })
        if (user) {
          return res
            .status(409)
            .json({ message: 'User with this email already exist.' })
        }

        //hash the password
        const hashedPassword = await bcrypt.hash(req.body.password, 12)
        if (!hashedPassword) {
          return res.status(500).json({ message: 'Internal server error.' })
        }

        //create new user obj
        const userObj: HydratedDocument<IUser> = new User({
          name: req.body.name,
          email: req.body.email,
          avatar: req.body.avatar,
          password: hashedPassword,
        })

        //save new user
        await userObj.save()

        //final response
        return res.status(201).json({
          message: 'Registration successfull.',
          userData: {
            email: userObj.email,
            name: userObj.email,
            avatar: userObj.avatar,
          },
        })
      } catch (e: any) {
        console.log(e.message)
        return res.status(500).json({ message: 'Internal server error' })
      }
    default:
      res.status(200).json({ message: 'Ok' })
      break
  }
}

export default validation(registerSchema, handler)
