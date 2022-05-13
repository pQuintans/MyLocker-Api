import { NodemailerMailAdapter } from '@adapters/nodemailer/nodemailer-mail-adapter'
import { PrismaStudentsRepository } from '@repositories/prisma/prisma-students-repository'
import { SetStudentVerificationCodeService } from '@services/student/set-student-verification-code-service'
import { Request, Response } from 'express'

export class SetStudentVerificationCodeController {
  async handle(req: Request, res: Response) {
    const { ra } = req.body

    const prismaStudentsRepository = new PrismaStudentsRepository()
    const nodemailerMailAdapter = new NodemailerMailAdapter()

    const setStudentVerificationCodeService =
      new SetStudentVerificationCodeService(
        prismaStudentsRepository,
        nodemailerMailAdapter
      )

    setStudentVerificationCodeService.execute({
      ra,
    })

    return res.status(204).send()
  }
}
