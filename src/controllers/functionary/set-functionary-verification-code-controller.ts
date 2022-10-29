import { NodemailerMailAdapter } from '@adapters/nodemailer/nodemailer-mail-adapter'
import { PrismaFunctionariesRepository } from '@repositories/prisma/prisma-functionaries-repository'
import { SetFunctionaryVerificationCodeService } from '@services/functionary/set-functionary-verification-code-service'
import { Request, Response } from 'express'

export class SetFunctionaryVerificationCodeController {
  async handle(req: Request, res: Response) {
    const { cpf } = req.body

    const prismaFunctionaryRepository = new PrismaFunctionariesRepository()
    const nodemailerMailAdapter = new NodemailerMailAdapter()

    const setFunctionaryVerificationCodeService =
      new SetFunctionaryVerificationCodeService(
        prismaFunctionaryRepository,
        nodemailerMailAdapter
      )

    const randomCode = await setFunctionaryVerificationCodeService.execute({
      cpf,
    })

    return res.status(200).json({ randomCode: randomCode })
  }
}
