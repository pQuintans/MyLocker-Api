import { PrismaApmsRepository } from '@repositories/prisma/prisma-apms-repository'
import { FindApmByIdService } from '@services/apm/find-apm-by-id'
import { Request, Response } from 'express'

export class FindApmByIdController {
  async handle(req: Request, res: Response) {
    const { id } = req.params

    const prismaApmsRepository = new PrismaApmsRepository()
    const findApmByIdService = new FindApmByIdService(prismaApmsRepository)

    const apm = await findApmByIdService.execute({ idAsString: id })

    return res.status(200).json(apm)
  }
}
