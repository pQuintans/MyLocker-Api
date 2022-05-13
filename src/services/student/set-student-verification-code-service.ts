import { MailAdapter } from '@adapters/mail-adapter'
import { StudentsRepositories } from '@repositories/students-repository'
import randomstring from 'randomstring'

interface SetStudentVerificationCodeServiceData {
  ra: string
}

export class SetStudentVerificationCodeService {
  constructor(
    private studentsRepository: StudentsRepositories,
    private mailAdapter: MailAdapter
  ) {}

  async execute(request: SetStudentVerificationCodeServiceData) {
    const { ra } = request

    if (!ra) {
      throw new Error('Faltam informações')
    }

    const student = await this.studentsRepository.findUniqueByRa({ ra })

    if (!student) {
      throw new Error('Nenhum aluno com este RA encontrado')
    }

    const randomCode = randomstring.generate(6)

    await this.studentsRepository.updateVerificationCode({
      ra,
      code: randomCode,
    })

    const studentsFullName = `${student.first_name} ${student.last_name}`

    await this.mailAdapter.sendMail({
      subjectName: studentsFullName,
      subject: student.email,
      body: [
        '<div style="font-family: sans-serif; font-size: 16px; color: #111">',
        `<p>Oi ${studentsFullName},`,
        `<p>Seu código de verificação é <b>${randomCode}</b></p>`,
        '<div>',
      ].join('\n'),
    })
  }
}
