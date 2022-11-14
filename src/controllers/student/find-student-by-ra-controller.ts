import { PrismaStudentsRepository } from '@repositories/prisma/prisma-students-repository'
import { FindStudentByRaService } from '@services/student/find-student-by-ra-service'
import { Request, Response } from 'express'

export class FindStudentByRaController {
  async handle(req: Request, res: Response) {
    const { ra } = req.params

    const prismaStudentRepository = new PrismaStudentsRepository()
    const findStudentByRaService = new FindStudentByRaService(
      prismaStudentRepository
    )

    const student = await findStudentByRaService.execute({ ra })

    return res.status(200).json(student)
  }
}
