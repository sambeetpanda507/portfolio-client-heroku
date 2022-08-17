import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next'
import { OptionalObjectSchema, ObjectShape } from 'yup/lib/object'

const validation = (
  schema: OptionalObjectSchema<ObjectShape>,
  handler: NextApiHandler
) => {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    if (['POST', 'PATCH', 'PUT'].includes(req.method!)) {
      try {
        await schema.validate(req.body, { strict: true })
      } catch (error: any) {
        if (error.name === 'ValidationError') {
          return res.status(422).json({
            error: {
              message: error.message,
              param: error.path,
            },
          })
        } else {
          return res.status(500).json({ error: { message: error.message } })
        }
      }
    }
    await handler(req, res)
  }
}

export default validation
