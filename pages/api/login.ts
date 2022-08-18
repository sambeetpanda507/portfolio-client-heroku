import type { NextApiHandler, NextApiRequest, NextApiResponse } from 'next'
import validation from '../../utils/validation'
import loginSchema from '../../schema/login.schema'
import User, { IUser } from '../../models/user.model'
import { HydratedDocument } from 'mongoose'
import bcrypt from 'bcrypt'
import { sign } from 'jsonwebtoken'
import cookie from 'cookie'
import connectToDb from '../../utils/db'

connectToDb()

const handler: NextApiHandler = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  switch (req.method) {
    case 'POST':
      try {
        //validate email
        const user: HydratedDocument<IUser> | null = await User.findOne({
          email: req.body.email,
        })
        if (!user) {
          return res
            .status(404)
            .json({ error: { message: 'User not registered.' } })
        }

        //validate password
        const isPasswordValid: boolean = await bcrypt.compare(
          req.body.password,
          user.password
        )
        if (isPasswordValid === false) {
          return res
            .status(401)
            .json({ error: { message: 'Invalid email or password' } })
        }

        const refreshTokenSecret: string | undefined =
          process.env.REFRESH_TOKEN_SECRET
        const accessTokenSecret: string | undefined =
          process.env.ACCESS_TOKEN_SECRET

        if (!refreshTokenSecret || !accessTokenSecret) {
          console.log('refresh token: ', refreshTokenSecret !== undefined)
          console.log('access token: ', accessTokenSecret !== undefined)
          return res
            .status(500)
            .json({ error: { message: 'Internal server error.' } })
        }

        //create a new access token
        const accessToken: string = sign(
          { userId: user._id },
          accessTokenSecret,
          { expiresIn: '1h' }
        )

        //create a new refresh token
        const refreshToken: string = sign(
          { userId: user._id },
          refreshTokenSecret,
          { expiresIn: '5h' }
        )

        //add refresh token to cookie
        res.setHeader(
          'Set-Cookie',
          cookie.serialize('refreshToken', refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            expires: new Date(Date.now() + 1000 * 60 * 60 * 5),
            sameSite: 'strict',
            path: '/',
          })
        )

        //send final response
        return res.status(200).json({
          message: 'Login successfull',
          auth: true,
          userData: {
            userId: user.id,
            name: user.name,
            email: user.email,
            avatar: user.avatar,
            accessToken,
          },
        })
      } catch (e: any) {
        console.log(e.message)
        return res
          .status(500)
          .json({ error: { message: 'Internal server error' } })
      }
    default:
      return res.status(200).json({ message: 'Ok' })
  }
}

export default validation(loginSchema, handler)
