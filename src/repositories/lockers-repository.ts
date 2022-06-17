import { Locker } from '@models/locker-model'

export interface LockerCreateData {
  number: number
  FK_section_id: number
}
export interface LockerFindUniqueByNumberData {
  number: number
}

export interface LockerSetIsRentedData {
  number: number
  isRented: number
  rentedAt: string | null
}

export interface LockersRepositories {
  create: (data: LockerCreateData) => Promise<void>
  listAll: () => Promise<Locker[]>
  findUniqueByNumber: (data: LockerFindUniqueByNumberData) => Promise<Locker>
  setLockerIsRented: (data: LockerSetIsRentedData) => Promise<void>
}
