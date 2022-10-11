import { ApmsRepositories } from '@repositories/apms-repository'

interface CreateApmServiceRequest {
  student_ra: string
  requisitionPDF: string
}

export class CreateApmService {
  constructor(private apmsRepository: ApmsRepositories) {}

  async execute(request: CreateApmServiceRequest) {
    const { student_ra, requisitionPDF } = request

    if (!student_ra || !requisitionPDF) {
      throw new Error('Faltam informações')
    }

    await this.apmsRepository.create({
      FK_student_ra: student_ra,
      requisitionPDF,
    })

    return
  }
}
