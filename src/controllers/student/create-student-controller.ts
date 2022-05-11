import { PrismaStudentsRepository } from '@repositories/prisma/prisma-students-repository'
import { CreateStudentService } from '@services/student/create-student-service'
import { Request, Response } from 'express'

export class CreateStudentController {
  async handle(req: Request, res: Response) {
    const { ra, first_name, last_name, email } = req.body

    const prismaStudentRepository = new PrismaStudentsRepository()
    const createStudentService = new CreateStudentService(
      prismaStudentRepository
    )

    await createStudentService.execute({
      ra,
      first_name,
      last_name,
      email,
    })

    return res.status(201).send()
  }
}
