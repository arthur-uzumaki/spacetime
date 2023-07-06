import { FastifyInstance } from 'fastify'
import { randomUUID } from 'node:crypto'
import { createWriteStream } from 'node:fs'
import { extname, resolve } from 'node:path'
import { pipeline } from 'node:stream'
import { promisify } from 'node:util'

const pump = promisify(pipeline)

export async function uplodRoutes(app: FastifyInstance) {
  app.post('/uplod', async (request, reply) => {
    const upload = await request.file({
      limits: {
        fileSize: 5_242_800, // 5mb
      },
    })
    if (!upload) {
      return reply.status(400).send()
    }
    const mineTypeRegex = /^(image|video)\/[a-zA-Z]+/

    const isValidFileFormat = mineTypeRegex.test(upload.mimetype)

    if (!isValidFileFormat) {
      return reply.status(400).send
    }
    const fileId = randomUUID()
    const extision = extname(upload.filename)

    const fileName = fileId.concat(extision)

    const writeStream = createWriteStream(
      resolve(__dirname, '../../uploads/', fileName),
    )

    await pump(upload.file, writeStream)
    const fullUrl = request.protocol.concat('://').concat(request.hostname)

    const fileUrl = new URL(`/uploads/${fileName}`, fullUrl).toString()
    return { fileUrl }
  })
}
