import { MailAdapter } from '@adapters/mail-adapter'
import { FunctionariesRepositories } from '@repositories/functionaries-repository'
import randomstring from 'randomstring'

interface SetFunctionaryVerificationCodeServiceData {
  cpf: string
}

export class SetFunctionaryVerificationCodeService {
  constructor(
    private functionariesRepository: FunctionariesRepositories,
    private mailAdapter: MailAdapter
  ) {}

  async execute(request: SetFunctionaryVerificationCodeServiceData) {
    const { cpf } = request

    if (!cpf) {
      throw new Error('Faltam informações')
    }

    const functionary = await this.functionariesRepository.findUniqueByCpf({
      cpf,
    })

    if (!functionary) {
      throw new Error('Nenhum funcionário com este CPF encontrado')
    }

    if (functionary.status == 0) {
      throw new Error('Este funcionário está inativado')
    }

    const randomCode = randomstring.generate(6)

    await this.functionariesRepository.updateVerificationCode({
      cpf,
      code: randomCode,
    })

    const functionaryFullName = `${functionary.first_name} ${functionary.last_name}`

    await this.mailAdapter.sendMail({
      subjectName: functionaryFullName,
      subject: functionary.email,
      body: [
        '<div style="font-family: sans-serif; font-size: 16px; color: #111">',
        `<p>Olá ${functionaryFullName},`,
        `<p>Seu código de verificação é <b style="font-family: fixed-width">${randomCode}</b></p>`,
        '<div>',
      ].join('\n'),
    })

    return randomCode
  }
}
