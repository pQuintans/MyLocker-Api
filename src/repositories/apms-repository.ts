import { apm } from '@prisma/client'

export interface ApmsCreateData {
  FK_student_ra: string
  requisitionPDF: string
}

export interface ApmsFindUniqueByIdData {
  id: number
}

export interface ApmsRepositories {
  create: (data: ApmsCreateData) => Promise<void>
  findUniqueById: (data: ApmsFindUniqueByIdData) => Promise<apm>
}
