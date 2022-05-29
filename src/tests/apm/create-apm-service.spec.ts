import { CreateApmService } from '@services/apm/create-apm-service'
import { ApmsRepositoryTest } from './apms-repository'

const createApmService = new CreateApmService(ApmsRepositoryTest)

describe('Create Apm', () => {
  it('should be able to create an Apm with all the parameters', async () => {
    await expect(
      createApmService.execute({
        isPaid: 1,
        student_ra: '200146',
        functionary_cpf: '000-000-000.00',
      })
    ).resolves.not.toThrow()

    expect(ApmsRepositoryTest.create).toBeCalled()
  })

  it('should be able to create an Apm with all the required parameters', async () => {
    await expect(
      createApmService.execute({
        student_ra: '200146',
        functionary_cpf: '000-000-000.00',
      })
    ).resolves.not.toThrow()

    expect(ApmsRepositoryTest.create).toBeCalled()
  })

  it('should not be able to create an Apm with missing informations', async () => {
    await expect(
      createApmService.execute({
        student_ra: '',
        functionary_cpf: '',
      })
    ).rejects.toThrow()

    expect(ApmsRepositoryTest.create).not.toBeCalled()
  })
})
