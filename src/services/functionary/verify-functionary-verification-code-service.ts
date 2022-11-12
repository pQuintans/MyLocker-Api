import { FunctionariesRepositories } from '@repositories/functionaries-repository'

interface VerifyFunctionaryVerificationCodeServiceData {
  cpf: string
  typedCode: string
}

export class VerifyFunctionaryVerificationCodeService {
  constructor(
    private readonly functionaryRepository: FunctionariesRepositories
  ) {}

  async execute({
    cpf,
    typedCode,
  }: VerifyFunctionaryVerificationCodeServiceData) {
    if (!cpf || !typedCode) {
      throw new Error('Faltam informações')
    }

    const functionary = await this.functionaryRepository.findUniqueByCpf({
      cpf,
    })

    if (!functionary) {
      throw new Error('Funcionário não encontrado')
    }

    if (functionary.code === null) {
      throw new Error('Código não gerado')
    }

    if (functionary.code !== typedCode) {
      throw new Error('Código de verificação incorreto')
    }

    await this.functionaryRepository.updateVerificationCode({
      cpf,
      code: null,
    })

    return
  }
}
