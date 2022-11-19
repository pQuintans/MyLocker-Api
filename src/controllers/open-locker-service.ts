import { PrismaStudentsRepository } from '@repositories/prisma/prisma-students-repository'
import { OpenLockerService } from '@services/open-locker-service'
import { Request, Response } from 'express'

export class OpenLockerController {
  async handle(req: Request, res: Response) {
    const { ra, lockerNumberString } = req.params

    const prismaStudentRepository = new PrismaStudentsRepository()

    const openLockerService = new OpenLockerService(prismaStudentRepository)

    await openLockerService.execute({
      ra,
      lockerNumberString,
    })

    return res.status(200).send()
  }
}
