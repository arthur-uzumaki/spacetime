import { FastifyInstance } from 'fastify'
import z from 'zod'
import { prisma } from '../lib/prisma'

export async function memoriesRoutes(app: FastifyInstance) {
  app.addHook('preHandler', async (request) => {
    await request.jwtVerify()
  })
  app.get('/memories', async (request) => {
    const menories = await prisma.memory.findMany({
      where: {
        userId: request.user.sub,
      },
      orderBy: {
        createdAt: 'asc',
      },
    })

    return menories.map((memories) => {
      return {
        id: memories.id,
        coverUrl: memories.converUrl,
        excerpt: memories.content.substring(0, 115).concat('...'),
        createdAt: memories.createdAt,
      }
    })
  })

  app.get('/memories/:id', async (request, reply) => {
    const paramSchames = z.object({
      id: z.string().uuid(),
    })

    const { id } = paramSchames.parse(request.params)

    const memory = await prisma.memory.findUniqueOrThrow({
      where: {
        id,
      },
    })

    if (!memory.isPublic && memory.userId !== request.user.sub) {
      return reply.status(401).send()
    }
    return memory
  })

  app.post('/memories', async (request) => {
    const bodySchames = z.object({
      content: z.string(),
      converUrl: z.string(),
      isPublic: z.coerce.boolean().default(false),
    })

    const { content, converUrl, isPublic } = bodySchames.parse(request.body)

    const memory = await prisma.memory.create({
      data: {
        content,
        converUrl,
        isPublic,
        userId: request.user.sub,
      },
    })

    return memory
  })

  app.put('/memories/:id', async (request, reply) => {
    const paramSchames = z.object({
      id: z.string().uuid(),
    })
    const { id } = paramSchames.parse(request.params)

    const bodySchames = z.object({
      content: z.string(),
      converUrl: z.string(),
      isPublic: z.coerce.boolean().default(false),
    })

    const { content, converUrl, isPublic } = bodySchames.parse(request.body)

    let memory = await prisma.memory.findUniqueOrThrow({
      where: {
        id,
      },
    })

    if (memory.userId !== request.user.sub) {
      return reply.status(401).send()
    }
    memory = await prisma.memory.update({
      where: {
        id,
      },
      data: {
        content,
        converUrl,
        isPublic,
      },
    })

    return memory
  })

  app.delete('/memories/:id', async (request, reply) => {
    const paramsSchames = z.object({
      id: z.string().uuid(),
    })

    const { id } = paramsSchames.parse(request.params)

    const memory = await prisma.memory.findUniqueOrThrow({
      where: {
        id,
      },
    })

    if (memory.userId !== request.user.sub) {
      return reply.status(401).send()
    }

    await prisma.memory.delete({
      where: {
        id,
      },
    })
  })
}
