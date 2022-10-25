import { PrismaApmsRepository } from '@repositories/prisma/prisma-apms-repository'
import { ListApmsService } from '@services/apm/list-apm'
import { Request, Response } from 'express'

export class ListApmsController {
  async handle(req: Request, res: Response) {
    const prismaApmsRepository = new PrismaApmsRepository()
    const listApmsService = new ListApmsService(prismaApmsRepository)

    const apms = await listApmsService.execute()

    return res.status(200).json(apms)
  }
}
