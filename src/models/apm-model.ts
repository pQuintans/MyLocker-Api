export interface Apm {
  id: number
  requisitionPDF: string
  FK_student_ra?: string
  FK_functionary_cpf?: string
  status: 0 | 1 | 2
}
