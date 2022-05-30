export interface Locker {
  number: number
  isRented: number
  rentedAt?: string
  FK_section_id: number
  status: number
}
