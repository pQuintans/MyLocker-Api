import { PrismaFunctionariesRepository } from '@repositories/prisma/prisma-functionaries-repository'
import { CreateFunctionaryService } from '@services/functionary/create-functionary-service'
import { Request, Response } from 'express'

export class CreateFunctionaryController {
  async handle(req: Request, res: Response) {
    const { cpf, first_name, last_name, email, password } = req.body

    const prismaFunctionariesRepository = new PrismaFunctionariesRepository()
    const createFunctionaryService = new CreateFunctionaryService(
      prismaFunctionariesRepository
    )

    await createFunctionaryService.execute({
      cpf,
      first_name,
      last_name,
      email,
      password,
    })

    return res.status(201).send()
  }
}
