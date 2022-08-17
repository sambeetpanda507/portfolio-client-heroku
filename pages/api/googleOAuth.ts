import type { NextApiHandler, NextApiRequest, NextApiResponse } from 'next'
import validation from '../../utils/validation'
import GoogleUser, { IGoogleUser } from '../../models/googleUser.model'
import googleOAuthSchema from '../../schema/googleOauth.schema'
import { HydratedDocument } from 'mongoose'
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
        //check for existing user
        const user: HydratedDocument<IGoogleUser> | null =
          await GoogleUser.findOne({ email: req.body.email })

        //create access token secret
        const accessTokenSecret: string | undefined =
          process.env.ACCESS_TOKEN_SECRET

        //create refresh token secret
        const refreshTokenSecret: string | undefined =
          process.env.REFRESH_TOKEN_SECRET

        //if no refresh token secret or access token secret
        if (!accessTokenSecret || !refreshTokenSecret) {
          console.log('access token secret: ', accessTokenSecret !== undefined)
          console.log(
            'refresh token secret: ',
            refreshTokenSecret !== undefined
          )
          return res
            .status(500)
            .json({ error: { message: 'Internal server error' } })
        }

        //if user alerady present
        if (user) {
          const accessToken = sign({ userId: user._id }, accessTokenSecret, {
            expiresIn: '1h',
          })

          const refreshToken = sign({ userId: user._id }, refreshTokenSecret, {
            expiresIn: '5h',
          })

          res.setHeader(
            'Set-Cookie',
            cookie.serialize('refreshToken', refreshToken, {
              httpOnly: true,
              secure: process.env.NODE_ENV === 'production',
              maxAge: Date.now() + 1000 * 60 * 60 * 5,
              sameSite: 'strict',
              path: '/',
            })
          )

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
        } else {
          //for new user
          const newUser: HydratedDocument<IGoogleUser> = new GoogleUser({
            name: req.body.name,
            email: req.body.email,
            avatar: req.body.avatar,
          })

          await newUser.save()

          const accessToken = sign({ userId: newUser._id }, accessTokenSecret, {
            expiresIn: '1h',
          })

          const refreshToken = sign(
            { userId: newUser._id },
            refreshTokenSecret,
            {
              expiresIn: '5h',
            }
          )

          res.setHeader(
            'Set-Cookie',
            cookie.serialize('refreshToken', refreshToken, {
              httpOnly: true,
              secure: process.env.NODE_ENV === 'production',
              maxAge: Date.now() + 1000 * 60 * 60 * 5,
              sameSite: 'strict',
              path: '/',
            })
          )

          return res.status(200).json({
            message: 'Login successfull',
            auth: true,
            userData: {
              userId: newUser.id,
              name: newUser.name,
              email: newUser.email,
              avatar: newUser.avatar,
              accessToken,
            },
          })
        }
      } catch (e: any) {
        console.log('error: ', e.message)
        return res
          .status(500)
          .json({ error: { message: 'Internal server error.' } })
      }
    default:
      return res.status(200).json({ message: 'Ok' })
  }
}

export default validation(googleOAuthSchema, handler)
