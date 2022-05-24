import { CreateLockerService } from '@services/locker/create-locker-service'
import { lockersRepositoryTest } from './lockers-repository'

const createLocker = new CreateLockerService(lockersRepositoryTest)

describe('Create locker', () => {
  it('should be able to create a locker', async () => {
    await expect(
      createLocker.execute({
        number: 123,
        section_id: 1,
      })
    ).resolves.not.toThrow()

    expect(lockersRepositoryTest.findUniqueByNumber).toHaveBeenCalled()
    expect(lockersRepositoryTest.create).toHaveBeenCalled()
  })

  it('should not be able to create a locker with missing informations', async () => {
    await expect(
      createLocker.execute({
        number: undefined,
        section_id: undefined,
      })
    ).rejects.toThrow()

    expect(lockersRepositoryTest.findUniqueByNumber).not.toHaveBeenCalled()
    expect(lockersRepositoryTest.create).not.toHaveBeenCalled()
  })

  it('should not be able to create a functionary with an already registered CPF', async () => {
    lockersRepositoryTest.findUniqueByNumber.mockReturnValueOnce({
      number: 123,
      section_id: 1,
    }) //If 'findUniqueByNumber' returns something, an Locker with that number exists

    await expect(
      createLocker.execute({
        number: 123,
        section_id: 1,
      })
    ).rejects.toThrow()

    expect(lockersRepositoryTest.findUniqueByNumber).toHaveBeenCalled()
    expect(lockersRepositoryTest.create).not.toHaveBeenCalled()
  })
})
