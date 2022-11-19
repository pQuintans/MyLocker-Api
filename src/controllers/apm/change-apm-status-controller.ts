import { NodemailerMailAdapter } from '@adapters/nodemailer/nodemailer-mail-adapter'
import { PrismaApmsRepository } from '@repositories/prisma/prisma-apms-repository'
import { PrismaFunctionariesRepository } from '@repositories/prisma/prisma-functionaries-repository'
import { PrismaStudentsRepository } from '@repositories/prisma/prisma-students-repository'
import { ChangeApmStatusService } from '@services/apm/change-apm-status-service'
import { Request, Response } from 'express'

export class ChangeApmStatusController {
  async handle(request: Request, response: Response) {
    const { id, status, functionaryCpf } = request.body

    const prismaApmsRepository = new PrismaApmsRepository()
    const prismaFunctionariesRepository = new PrismaFunctionariesRepository()
    const prismaStudentsRepository = new PrismaStudentsRepository()
    const nodemailerMailAdapter = new NodemailerMailAdapter()

    const changeApmStatusService = new ChangeApmStatusService(
      prismaApmsRepository,
      prismaFunctionariesRepository,
      prismaStudentsRepository,
      nodemailerMailAdapter
    )

    await changeApmStatusService.execute({ id, status, functionaryCpf })

    return response.status(200).send()
  }
}
