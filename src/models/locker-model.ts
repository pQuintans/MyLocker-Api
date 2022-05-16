export interface Locker {
  number: number
  isRented: number
  rentedAt?: Date
  FK_section_id: number
  status: number
}
