import cors from '@fastify/cors'
import jwt from '@fastify/jwt'
import multipart from '@fastify/multipart'
import 'dotenv/config'
import fastify from 'fastify'
import { resolve } from 'node:path'
import { authRoutes } from './routes/auth'
import { memoriesRoutes } from './routes/memories'
import { uplodRoutes } from './routes/upload'

const app = fastify()
app.register(cors, { origin: true })
app.register(jwt, { secret: 'spacetime' })
app.register(memoriesRoutes)
app.register(authRoutes)
app.register(multipart)
app.register(uplodRoutes)

app.register(require('@fastify/static'), {
  root: resolve(__dirname, '../uploads'),
  prefix: '/uploads',
})

app
  .listen({
    port: 3333,
  })
  .then(() => {
    console.log('😛 HTPP server running on http://localhost:3333')
  })
