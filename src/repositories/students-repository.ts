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

export interface StudentUpdatePasswordData {
  email: string
  password: string
}

export interface StudentUpdateVerificationCodeData {
  email: string
  code: string
}

export interface StudentUpdateProfilePictureData {
  ra: string
  url: string
}

export interface InativateStudentData {
  ra: string
}

export interface StudentUpdateLockerNumberData {
  ra: string
  lockerNumber: number | null
}

export interface StudentsRepositories {
  create: (data: StudentCreateData) => Promise<void>
  findUniqueByRa: (data: StudentFindUniqueByRaData) => Promise<Student>
  findUniqueByEmail: (data: StudentFindUniqueByEmailData) => Promise<Student>
  updatePassword: (data: StudentUpdatePasswordData) => Promise<void>
  updateVerificationCode: (
    data: StudentUpdateVerificationCodeData
  ) => Promise<void>

  updateProfilePicture: (data: StudentUpdateProfilePictureData) => Promise<void>
  updateLockerNumber: (data: StudentUpdateLockerNumberData) => Promise<void>
  inativateStudent: (data: InativateStudentData) => Promise<void>
  listAll: () => Promise<Student[]>
}
