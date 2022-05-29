import { CreateSectionService } from '@services/section/create-section-service'
import { SectionsRepositoryTest } from './sections-repository'

const createSectionService = new CreateSectionService(SectionsRepositoryTest)

describe('Create section', () => {
  it('should be able to create a section', async () => {
    await expect(
      createSectionService.execute({
        color: '#fefefe',
        left_room: 'Saúde',
        right_room: 'Sala 13',
      })
    ).resolves.not.toThrow()

    expect(SectionsRepositoryTest.create).toBeCalled()
  })

  it('should not be able to create a section with missing informations', async () => {
    await expect(
      createSectionService.execute({
        color: '',
        left_room: '',
        right_room: '',
      })
    ).rejects.toThrow()

    expect(SectionsRepositoryTest.create).not.toBeCalled()
  })

  it('should not be able to create a section with left_room data equal to right_room data', async () => {
    await expect(
      createSectionService.execute({
        color: '#fefefe',
        left_room: 'Saúde',
        right_room: 'Saúde',
      })
    ).rejects.toThrow()

    expect(SectionsRepositoryTest.create).not.toBeCalled()
  })
})
