export interface ApmsCreateData {
  FK_student_ra: string
  requisitionPDF: string
}

export interface ApmsRepositories {
  create: (data: ApmsCreateData) => Promise<void>
}
