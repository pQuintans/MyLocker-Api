import { PrismaFunctionariesRepository } from '@repositories/prisma/prisma-functionaries-repository'
import { FindFunctionaryService } from '@services/find-functionary-service'
import { Request, Response } from 'express'

export class FindFunctionaryController {
  async handle(req: Request, res: Response) {
    const { cpf } = req.params

    const prismaFunctionariesRepository = new PrismaFunctionariesRepository()
    const findFunctionaryService = new FindFunctionaryService(
      prismaFunctionariesRepository
    )

    const functionary = await findFunctionaryService.execute({ cpf })

    return res.status(200).json(functionary)
  }
}
