import { PrismaApmsRepository } from '@repositories/prisma/prisma-apms-repository'
import { PrismaStudentsRepository } from '@repositories/prisma/prisma-students-repository'
import { CreateApmService } from '@services/apm/create-apm-service'
import { Request, Response } from 'express'

export class CreateApmController {
  async handle(req: Request, res: Response) {
    const { student_ra } = req.body

    const prismaApmsRepository = new PrismaApmsRepository()
    const prismastudentRepository = new PrismaStudentsRepository()
    const createApmService = new CreateApmService(
      prismaApmsRepository,
      prismastudentRepository
    )

    const requisitionPDF = `http://${req.headers.host}/apm-requisition-pdf/${req.file.filename}`

    const { student, token } = await createApmService.execute({
      requisitionPDF,
      student_ra,
    })

    return res
      .status(201)
      .cookie('token', token, {
        sameSite: 'none',
        secure: req.headers.host == 'localhost:3000' ? false : true,
        path: '/',
        expires: new Date(new Date().getTime() + 24 * 60 * 60 * 1000),
        httpOnly: true,
      })
      .json({ student })
  }
}
