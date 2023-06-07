import fastify from 'fastify'
import { tasksRoutes } from './routes/tasks'

const app = fastify()

app.register(tasksRoutes)

app.listen({
  port: 3333,
}).then(() => {
  console.log(`Server is running on port:3333`)
})