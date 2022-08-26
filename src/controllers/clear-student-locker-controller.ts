import { PrismaLockersRepository } from '@repositories/prisma/prisma-lockers-repository'
import { PrismaStudentsRepository } from '@repositories/prisma/prisma-students-repository'
import { ClearStudentLockerService } from '@services/clear-student-locker-service'
import { Request, Response } from 'express'

export class ClearStudentLockerController {
  async handle(req: Request, res: Response) {
    const { ra } = req.body

    const prismaStudentRepository = new PrismaStudentsRepository()
    const prismaLockersRepository = new PrismaLockersRepository()

    const handleEmailContactService = new ClearStudentLockerService(
      prismaStudentRepository,
      prismaLockersRepository
    )

    const student = await handleEmailContactService.execute({
      ra,
    })

    return res.status(200).json(student)
  }
}
