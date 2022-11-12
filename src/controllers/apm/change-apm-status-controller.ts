import { PrismaApmsRepository } from '@repositories/prisma/prisma-apms-repository'
import { ChangeApmStatusService } from '@services/apm/change-apm-status-service'
import { Request, Response } from 'express'

export class ChangeApmStatusController {
  async handle(request: Request, response: Response) {
    const { id, status } = request.body

    const prismaApmsRepository = new PrismaApmsRepository()
    const changeApmStatusService = new ChangeApmStatusService(
      prismaApmsRepository
    )

    await changeApmStatusService.execute({ id, status })

    return response.status(200).send()
  }
}
