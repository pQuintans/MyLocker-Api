import { PrismaStudentsRepository } from '@repositories/prisma/prisma-students-repository'
import { ListAllStudentsService } from '@services/student/list-all-students-service'
import { Request, Response } from 'express'

export class ListAllStudentsController {
  async handle(req: Request, res: Response) {
    const prismaStudentsRepository = new PrismaStudentsRepository()
    const listAllStudentsService = new ListAllStudentsService(
      prismaStudentsRepository
    )

    const students = await listAllStudentsService.execute()

    return res.status(200).json(students)
  }
}
