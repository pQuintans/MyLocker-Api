import { PrismaApmsRepository } from '@repositories/prisma/prisma-apms-repository'
import { CreateApmService } from '@services/apm/create-apm-service'
import { Request, Response } from 'express'

export class CreateApmController {
  async handle(req: Request, res: Response) {
    const { student_ra } = req.body

    const prismaApmsRepository = new PrismaApmsRepository()
    const createApmService = new CreateApmService(prismaApmsRepository)

    const requisitionPDF = `http://${req.headers.host}/apm-requisition-pdf/${req.file.filename}`

    await createApmService.execute({
      requisitionPDF,
      student_ra,
    })

    return res.status(201).send()
  }
}
