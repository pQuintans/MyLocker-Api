import { StudentsRepositories } from '@repositories/students-repository'

export class ListAllStudentsService {
  constructor(private studentsRepository: StudentsRepositories) {}

  async execute() {
    const lockers = this.studentsRepository.listAll()

    return lockers
  }
}
