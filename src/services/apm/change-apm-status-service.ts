import { MailAdapter } from '@adapters/mail-adapter'
import { ApmsRepositories } from '@repositories/apms-repository'
import { FunctionariesRepositories } from '@repositories/functionaries-repository'
import { StudentsRepositories } from '@repositories/students-repository'

interface ChangeApmStatusServiceData {
  id: number
  status: number
  functionaryCpf: string
}

export class ChangeApmStatusService {
  constructor(
    private apmRepositories: ApmsRepositories,
    private functionariesRepositories: FunctionariesRepositories,
    private studentsRepositories: StudentsRepositories,
    private mailAdapter: MailAdapter
  ) {}

  async execute({ id, status, functionaryCpf }: ChangeApmStatusServiceData) {
    if (id == null || status == null || functionaryCpf == null) {
      throw new Error('Faltam informações')
    }

    if (status != 0 && status != 1 && status != 2) {
      throw new Error('Status inválido')
    }

    const apm = await this.apmRepositories.findUniqueById({ id })

    if (!apm) {
      throw new Error('ID inválido')
    }

    const functionary = await this.functionariesRepositories.findUniqueByCpf({
      cpf: functionaryCpf,
    })

    if (!functionary) {
      throw new Error('CPF inválido')
    }

    if (status == 0) {
      const student = await this.studentsRepositories.findUniqueByRa({
        ra: apm.FK_student_ra,
      })

      const studentsFullName = `${student.first_name} ${student.last_name}`

      if (student.locker_number != null) {
        await this.mailAdapter.sendMail({
          subjectName: studentsFullName,
          subject: student.email,
          emailSubject: 'Aviso de devolução de armário',
          body: [
            '<div style="font-family: sans-serif; font-size: 16px; color: #111">',
            `<p>Oi ${studentsFullName},`,
            '<p>Sua apm foi recusada, portanto você perdeu o acesso ao seu armário.</p>',
            `<p>${
              student._count.apm < 3
                ? `Você ainda pode submeter a apm mais ${
                    3 - student._count.apm
                  } vezes. Se for de seu interesse, você pode alugar um armário sem o desconto.`
                : 'Você estourou o limite de requisições de apm, porém você ainda pode alugar um armário com o preço regular'
            }.</p>`,
            '<div>',
          ].join('\n'),
        })

        await this.studentsRepositories.clearOutLocker({ ra: student.ra })
      }
    }

    await this.apmRepositories.updateApmStatus({ id, status, functionaryCpf })

    return
  }
}
