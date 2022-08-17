import type { NextApiHandler, NextApiRequest, NextApiResponse } from 'next'
import { verify, sign } from 'jsonwebtoken'
import User, { IUser } from '../../models/user.model'
import GoogleUser, { IGoogleUser } from '../../models/googleUser.model'
import connectToDb from '../../utils/db'
import { HydratedDocument } from 'mongoose'

connectToDb()

const handler: NextApiHandler = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  try {
    const refreshToken: string | undefined = req.cookies['refreshToken']

    if (!refreshToken) {
      return res.status(401).json({ error: { message: 'Not authorized' } })
    }

    const refreshTokenSecret: string | undefined =
      process.env.REFRESH_TOKEN_SECRET

    if (!refreshTokenSecret) {
      return res
        .status(500)
        .json({ error: { message: 'Internal server error' } })
    }

    const payload: any = verify(refreshToken, refreshTokenSecret)

    if (!payload || !payload.userId) {
      return res.status(401).json({ error: { message: 'Not authorized' } })
    }

    const userData: HydratedDocument<IUser> | null = await User.findOne({
      _id: payload.userId,
    })
    const googleUser: HydratedDocument<IGoogleUser> | null =
      await GoogleUser.findOne({ _id: payload.userId })

    if (!userData && !googleUser) {
      return res.status(401).json({ error: { message: 'Not authorized' } })
    }

    if (userData) {
      const accessToken = sign({ userId: userData._id }, refreshTokenSecret, {
        expiresIn: '1h',
      })

      return res.status(200).json({
        message: 'New access token.',
        auth: true,
        userData: {
          userId: userData.id,
          name: userData.name,
          email: userData.email,
          avatar: userData.avatar,
          accessToken,
        },
      })
    } else if (googleUser) {
      const accessToken = sign({ userId: googleUser._id }, refreshTokenSecret, {
        expiresIn: '1h',
      })

      return res.status(200).json({
        message: 'New access token.',
        auth: true,
        userData: {
          userId: googleUser.id,
          name: googleUser.name,
          email: googleUser.email,
          avatar: googleUser.avatar,
          accessToken,
        },
      })
    } else {
      return res.status(401).json({ error: { message: 'Not authorized' } })
    }
  } catch (e: any) {
    console.log(e.message)
    if (e.message === 'jwt malformed' || e.message === 'invalid signature')
      return res.status(401).json({ error: { message: 'Not authorized' } })
    else
      return res
        .status(500)
        .json({ error: { message: 'Internal server error' } })
  }
}

export default handler
