import { PrismaLockersRepository } from '@repositories/prisma/prisma-lockers-repository'
import { ListAllLockersService } from '@services/locker/list-all-lockers-service'
import { Request, Response } from 'express'

export class ListAllLockersController {
  async handle(req: Request, res: Response) {
    const prismaLockersRepository = new PrismaLockersRepository()
    const listAllLockersService = new ListAllLockersService(
      prismaLockersRepository
    )

    const lockers = await listAllLockersService.execute()

    return res.status(200).json(lockers)
  }
}
