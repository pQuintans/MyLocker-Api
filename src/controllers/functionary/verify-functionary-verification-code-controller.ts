import { PrismaFunctionariesRepository } from '@repositories/prisma/prisma-functionaries-repository'
import { VerifyFunctionaryVerificationCodeService } from '@services/functionary/verify-functionary-verification-code-service'
import { Request, Response } from 'express'

export class VerifyFunctionaryVerificationCodeController {
  async handle(request: Request, response: Response) {
    const { cpf, typedCode } = request.params

    const prismaFunctionaryRepository = new PrismaFunctionariesRepository()
    const verifyFunctionaryVerificationCodeService =
      new VerifyFunctionaryVerificationCodeService(prismaFunctionaryRepository)

    await verifyFunctionaryVerificationCodeService.execute({
      cpf,
      typedCode,
    })

    return response.status(200).send()
  }
}
