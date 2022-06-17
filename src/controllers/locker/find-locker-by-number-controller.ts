import { PrismaLockersRepository } from '@repositories/prisma/prisma-lockers-repository'
import { FindLockerByNumberService } from '@services/locker/find-locker-by-number-service'
import { Request, Response } from 'express'

export class FindLockerByNumberController {
  async handle(req: Request, res: Response) {
    const { lockerNumberString } = req.params

    const prismaLockersRepository = new PrismaLockersRepository()
    const findLockerByNumberService = new FindLockerByNumberService(
      prismaLockersRepository
    )

    const locker = await findLockerByNumberService.execute({
      lockerNumberString,
    })

    return res.status(200).json(locker)
  }
}
