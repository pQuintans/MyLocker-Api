import { ApmsRepositories } from '@repositories/apms-repository'

interface CreateApmServiceRequest {
  isPaid?: number
  student_ra: string
  functionary_cpf: string
}

export class CreateApmService {
  constructor(private apmsRepository: ApmsRepositories) {}

  async execute(request: CreateApmServiceRequest) {
    const { isPaid = 0, student_ra, functionary_cpf } = request

    if (!student_ra || !functionary_cpf) {
      throw new Error('Faltam informações')
    }

    await this.apmsRepository.create({
      isPaid,
      FK_student_ra: student_ra,
      FK_functionary_cpf: functionary_cpf,
    })

    return
  }
}
