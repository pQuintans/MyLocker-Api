import { MailAdapter } from '@adapters/mail-adapter'
import { StudentsRepositories } from '@repositories/students-repository'
import randomstring from 'randomstring'

interface SetStudentVerificationCodeServiceData {
  email: string
}

export class SetStudentVerificationCodeService {
  constructor(
    private studentsRepository: StudentsRepositories,
    private mailAdapter: MailAdapter
  ) {}

  async execute(request: SetStudentVerificationCodeServiceData) {
    const { email } = request

    if (!email) {
      throw new Error('Faltam informações')
    }

    const student = await this.studentsRepository.findUniqueByEmail({ email })

    if (!student) {
      throw new Error('Nenhum aluno com este E-mail encontrado')
    }

    if (student.status == 0) {
      throw new Error('Este aluno está inativado')
    }

    const randomCode = randomstring.generate(6)

    await this.studentsRepository.updateVerificationCode({
      email,
      code: randomCode,
    })

    const studentsFullName = `${student.first_name} ${student.last_name}`

    await this.mailAdapter.sendMail({
      subjectName: studentsFullName,
      subject: student.email,
      body: [
        '<div style="font-family: sans-serif; font-size: 16px; color: #111">',
        `<p>Oi ${studentsFullName},`,
        `<p>Seu código de verificação é <b style="font-family: fixed-width">${randomCode}</b></p>`,
        '<div>',
      ].join('\n'),
    })

    return randomCode
  }
}
