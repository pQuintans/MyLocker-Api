import { LockersRepositories } from '@repositories/lockers-repository'
import { StudentsRepositories } from '@repositories/students-repository'

interface ClearStudentLockerServiceData {
  ra: string
}

export class ClearStudentLockerService {
  constructor(
    private studentsRepository: StudentsRepositories,
    private lockersRepository: LockersRepositories
  ) {}

  async execute(request: ClearStudentLockerServiceData) {
    const { ra } = request

    if (!ra) {
      throw new Error('Faltam informações')
    }

    const student = await this.studentsRepository.findUniqueByRa({ ra })

    if (!student) {
      throw new Error('Nenhum aluno com este RA encontrado')
    }

    if (student.status == 0) {
      throw new Error('Este aluno está inativado')
    }

    await this.lockersRepository.setLockerIsRented({
      number: student.locker_number,
      isRented: 0,
      rentedAt: null,
    })

    await this.studentsRepository.updateLockerNumber({ ra, lockerNumber: null })
    student.locker_number = null

    return { student }
  }
}
