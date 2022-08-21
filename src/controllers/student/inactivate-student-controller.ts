import { PrismaStudentsRepository } from '@repositories/prisma/prisma-students-repository'
import { InactivateStudentService } from '@services/student/inactivate-student-service'
import { Request, Response } from 'express'

export class InactivateStudentController {
  async handle(req: Request, res: Response) {
    const { ra } = req.body

    const prismaStudentRepository = new PrismaStudentsRepository()
    const inativateStudentService = new InactivateStudentService(
      prismaStudentRepository
    )

    await inativateStudentService.execute({
      ra,
    })

    return res.status(201).send()
  }
}
