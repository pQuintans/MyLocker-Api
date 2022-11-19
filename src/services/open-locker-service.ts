import { StudentsRepositories } from '@repositories/students-repository'

interface OpenLockerServiceData {
  ra: string
  lockerNumberString: string
}

export class OpenLockerService {
  constructor(private studentsRepository: StudentsRepositories) {}

  async execute(request: OpenLockerServiceData) {
    const { ra, lockerNumberString } = request

    if (!ra || !lockerNumberString) {
      throw new Error('Faltam informações')
    }
    const lockerNumber = parseInt(lockerNumberString)

    if (isNaN(lockerNumber)) {
      throw new Error('Número inválido')
    }

    const student = await this.studentsRepository.findUniqueByRa({ ra })

    if (!student) {
      throw new Error('Nenhum aluno com este RA encontrado')
    }

    if (student.status == 0) {
      throw new Error('Este aluno está inativado')
    }

    if (student.locker_number != lockerNumber) {
      throw new Error('Este aluno não possui este armário')
    }

    return
  }
}
