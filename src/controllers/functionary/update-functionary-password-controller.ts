import { PrismaFunctionariesRepository } from '@repositories/prisma/prisma-functionaries-repository'
import { UpdateFunctionaryPasswordService } from '@services/functionary/update-functionary-password-service'
import { Request, Response } from 'express'

export class UpdateFunctionaryPasswordController {
  async handle(req: Request, res: Response) {
    const { cpf, password, oldPassword, forgotPassword } = req.body

    const prismaFunctionaryRepository = new PrismaFunctionariesRepository()
    const updateFunctionaryPasswordService =
      new UpdateFunctionaryPasswordService(prismaFunctionaryRepository)

    await updateFunctionaryPasswordService.execute({
      cpf,
      password,
      oldPassword,
      forgotPassword,
    })

    return res.status(204).json({ message: 'Senha atualizada com sucesso' })
  }
}
