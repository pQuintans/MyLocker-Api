import { PrismaApmsRepository } from '@repositories/prisma/prisma-apms-repository'
import { CreateApmService } from '@services/apm/create-apm-service'
import { Request, Response } from 'express'

export class CreateApmController {
  async handle(req: Request, res: Response) {
    const { isPaid, student_ra, functionary_cpf } = req.body

    const prismaApmsRepository = new PrismaApmsRepository()
    const createApmService = new CreateApmService(prismaApmsRepository)

    await createApmService.execute({
      isPaid,
      student_ra,
      functionary_cpf,
    })

    return res.status(201).send()
  }
}
