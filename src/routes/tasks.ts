import { FastifyInstance } from 'fastify'
import { prisma } from '../lib/prisma'
import { z } from 'zod'

export async function tasksRoutes(app: FastifyInstance) {
  app.get('/tasks', async () => {
    const tasks = await prisma.tasks.findMany({
      orderBy: {
        createdAt: 'asc'
      }
    }
    )

    return tasks
  })

  app.get('/tasks/:id', async (request) => {
    const paramsSchema = z.object({
      id: z.string().uuid(),
    })

    const { id } = paramsSchema.parse(request.params)

    const task = await prisma.tasks.findUniqueOrThrow({
      where: {
        id,
      }
    })

    return task
  })

  /*app.post('/tasks', async (request) => {
    const bodySchema = z.object({
      title: z.string(),
      description: z.string(),
      date: z.date()
    })

    const { title, description, date } = bodySchema.parse(request.body)

    const task = await prisma.tasks.create({
      data: {
        title,
        description,
        date,
        userR: requ
      }
    })
  }) */
}