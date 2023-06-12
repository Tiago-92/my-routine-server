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

  app.post('/tasks', async (request) => {
    const bodySchema = z.object({
      title: z.string(),
      description: z.string(),
      date: z.string(),
      status: z.string()
    })

    const { title, description, status, date } = bodySchema.parse(request.body)

    const task = await prisma.tasks.create({
      data: {
        title,
        description,
        status,
        date,
        userId: 'f9efb206-3b74-407c-85b7-6a674effe5c5',
      },
    })

    return task
  })

  app.put('/tasks/:id', async (request) => {
    const paramsSchema = z.object({
      id: z.string().uuid(),
    })

    const { id } = paramsSchema.parse(request.params)

    const bodySchema = z.object({
      title: z.string(),
      description: z.string(),
      date: z.string(),
      status: z.string()
    })

    const { title, description, date, status } = bodySchema.parse(request.body)

    const task = await prisma.tasks.update({
      where: {
        id,
      },
      data: {
        title,
        description,
        date,
        status
      }
    })

    return task
  })  

  app.delete('/tasks/:id', async (request) => {
    const paramsSchema = z.object({
      id: z.string().uuid(),
    })

    const { id } = paramsSchema.parse(request.params)

    const task = await prisma.tasks.delete({
      where: {
        id,
      }
    })
  })
}