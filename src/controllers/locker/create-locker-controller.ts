import { PrismaLockersRepository } from '@repositories/prisma/prisma-lockers-repository'
import { CreateLockerService } from '@services/locker/create-locker-service'
import { Request, Response } from 'express'

export class CreateLockerController {
  async handle(req: Request, res: Response) {
    const { number, section_id } = req.body
    const prismaLockersRepository = new PrismaLockersRepository()
    const listAllLockersService = new CreateLockerService(
      prismaLockersRepository
    )

    await listAllLockersService.execute({
      number,
      section_id,
    })

    return res.status(201).send()
  }
}
