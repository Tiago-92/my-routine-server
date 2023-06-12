import fastify from 'fastify'
import cors from '@fastify/cors'
import { tasksRoutes } from './routes/tasks'

const app = fastify()

app.register(cors, {
  origin: true,
})

app.register(tasksRoutes)

app.listen({
  port: 3333,
}).then(() => {
  console.log(`Server is running on port:3333`)
})