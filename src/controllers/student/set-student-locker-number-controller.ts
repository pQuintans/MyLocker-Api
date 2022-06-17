import { PrismaStudentsRepository } from '@repositories/prisma/prisma-students-repository'
import { SetStudentLockerNumber } from '@services/student/set-student-locker-number'
import { Request, Response } from 'express'

export class SetStudentLockerNumberController {
  async handle(req: Request, res: Response) {
    const { ra, lockerNumber } = req.body

    const prismaStudentRepository = new PrismaStudentsRepository()
    const setStudentLockerNumber = new SetStudentLockerNumber(
      prismaStudentRepository
    )

    const { student, token } = await setStudentLockerNumber.execute({
      ra,
      lockerNumber,
    })

    return res
      .status(200)
      .cookie('token', token, {
        path: '/',
        expires: new Date(new Date().getTime() + 24 * 60 * 60 * 1000),
        httpOnly: true,
      })
      .json(student)
  }
}
