import { PrismaLockersRepository } from '@repositories/prisma/prisma-lockers-repository'
import { SetLockerIsRentedService } from '@services/locker/set-locker-is-rented-service'
import { Request, Response } from 'express'

export class SetLockerIsRentedController {
  async handle(req: Request, res: Response) {
    const { lockerNumber, isRented } = req.body

    const prismaLockersRepository = new PrismaLockersRepository()
    const setLockerIsRentedService = new SetLockerIsRentedService(
      prismaLockersRepository
    )

    await setLockerIsRentedService.execute({ lockerNumber, isRented })

    res.status(200).send()
  }
}
