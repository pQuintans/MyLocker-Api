export interface ApmsCreateData {
  isPaid: number
  FK_student_ra: string
  FK_functionary_cpf: string
}

export interface ApmsRepositories {
  create: (data: ApmsCreateData) => Promise<void>
}
