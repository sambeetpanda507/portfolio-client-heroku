import type { NextApiHandler, NextApiRequest, NextApiResponse } from 'next'
import cookie from 'cookie'

const handler: NextApiHandler = (_: NextApiRequest, res: NextApiResponse) => {
  res
    .setHeader(
      'Set-Cookie',
      cookie.serialize('refreshToken', '', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        expires: new Date(0),
        sameSite: 'strict',
        path: '/',
      })
    )
    .json({ message: 'Logout successfull' })
}

export default handler
