import { apm } from '@prisma/client'

export interface ApmsCreateData {
  FK_student_ra: string
  requisitionPDF: string
}

export interface ApmsFindUniqueByIdData {
  id: number
}

export interface ApmsUpdateStatusData {
  id: number
  status: number
}

export interface ApmsRepositories {
  create: (data: ApmsCreateData) => Promise<void>
  findUniqueById: (data: ApmsFindUniqueByIdData) => Promise<apm>
  listAll: () => Promise<apm[]>
  updateApmStatus: (data: ApmsUpdateStatusData) => Promise<void>
}
