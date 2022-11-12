import { PrismaApmsRepository } from '@repositories/prisma/prisma-apms-repository'
import { PrismaFunctionariesRepository } from '@repositories/prisma/prisma-functionaries-repository'
import { ChangeApmStatusService } from '@services/apm/change-apm-status-service'
import { Request, Response } from 'express'

export class ChangeApmStatusController {
  async handle(request: Request, response: Response) {
    const { id, status, functionaryCpf } = request.body

    const prismaApmsRepository = new PrismaApmsRepository()
    const prismaFunctionariesRepository = new PrismaFunctionariesRepository()
    const changeApmStatusService = new ChangeApmStatusService(
      prismaApmsRepository,
      prismaFunctionariesRepository
    )

    await changeApmStatusService.execute({ id, status, functionaryCpf })

    return response.status(200).send()
  }
}
