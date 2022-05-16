import { Locker } from '@models/locker-model'

export interface LockersRepositories {
  listAll: () => Promise<Locker[]>
}
