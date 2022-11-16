import { student } from '@prisma/client'

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

export interface StudentUpdateStatusData {
  ra: string
  status: 0 | 1
}

export interface StudentUpdateLockerNumberData {
  ra: string
  lockerNumber: number | null
}

export interface StudentupdateInformationData {
  ra: string
  email: string
  first_name: string
  last_name: string
}

export interface StudentsRepositories {
  create: (data: StudentCreateData) => Promise<void>
  findUniqueByRa: (data: StudentFindUniqueByRaData) => Promise<
    student & {
      _count: {
        apm: number
      }
      apm: {
        id: number
        status: number
      }[]
    }
  >
  findUniqueByEmail: (data: StudentFindUniqueByEmailData) => Promise<
    student & {
      _count: {
        apm: number
      }
      apm: {
        id: number
        status: number
      }[]
    }
  >
  updatePassword: (data: StudentUpdatePasswordData) => Promise<void>
  updateVerificationCode: (
    data: StudentUpdateVerificationCodeData
  ) => Promise<void>

  updateProfilePicture: (data: StudentUpdateProfilePictureData) => Promise<void>
  updateLockerNumber: (data: StudentUpdateLockerNumberData) => Promise<void>
  updateInformation: (data: StudentupdateInformationData) => Promise<void>
  updateStatus: (data: StudentUpdateStatusData) => Promise<void>
  listAll: () => Promise<student[]>
}
