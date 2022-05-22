import { ListAllLockersService } from '@services/locker/list-all-lockers-service'
import { lockersRepositoryTest } from './lockers-repository'

const listAllLockersService = new ListAllLockersService(lockersRepositoryTest)

describe('List all lockers', () => {
  it('should be able to list all lockers', async () => {
    expect(listAllLockersService.execute()).resolves.not.toThrow()
    expect(lockersRepositoryTest.listAll).toBeCalled()
  })
})
