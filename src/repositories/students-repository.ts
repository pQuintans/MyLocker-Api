import { Student } from '@models/student-model'

export interface StudentCreateData {
  ra: string
  first_name: string
  last_name: string
  email: string
}

export interface StudentFindUniqueByRaData {
  ra: string
}

export interface StudentFindUniqueByEmailData {
  email: string
}

export interface studentsRepositories {
  create: (data: StudentCreateData) => Promise<void>
  findUniqueByRa: (data: StudentFindUniqueByRaData) => Promise<Student>
  findUniqueByEmail: (data: StudentFindUniqueByEmailData) => Promise<Student>
}
