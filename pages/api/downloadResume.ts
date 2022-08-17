import type { NextApiHandler, NextApiRequest, NextApiResponse } from 'next'
import path from 'path'
import fs from 'fs'

const handler: NextApiHandler = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  const filePath = path.join(process.cwd(), 'public', 'resume.pdf')
  const fileName = path.basename(filePath)
  const mimeType = 'application/pdf'

  res.setHeader('Content-Disposition', 'attachment; filename=' + fileName)
  res.setHeader('Content-Type', mimeType)
  const fileStream = fs.createReadStream(filePath)
  fileStream.pipe(res)
}

export default handler
