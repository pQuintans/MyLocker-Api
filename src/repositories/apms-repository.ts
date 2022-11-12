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
  status: 0 | 1 | 2
  functionaryCpf: string
}

export interface ApmsRepositories {
  create: (data: ApmsCreateData) => Promise<void>
  findUniqueById: (data: ApmsFindUniqueByIdData) => Promise<apm>
  listAll: () => Promise<apm[]>
  updateApmStatus: (data: ApmsUpdateStatusData) => Promise<void>
}
