import { SetStudentProfilePictureService } from '@services/student/set-student-profile-picture-service'
import { studentsRepositoryTest } from './students-repository'

const setStudentProfilePictureService = new SetStudentProfilePictureService(
  studentsRepositoryTest
)

describe('Set student profile picture', () => {
  it('should be able to find a student', async () => {
    studentsRepositoryTest.findUniqueByRa.mockReturnValueOnce({
      ra: '200146',
      first_name: 'Pedro',
      last_name: 'Quintans',
      email: 'cl200146@g.unicamp.br',
    }) //if 'findUniqueByRaSpy' returns something, an student was found

    await expect(
      setStudentProfilePictureService.execute({
        ra: '200146',
        url: 'https://localhost:3000/url',
      })
    ).resolves.not.toThrow()

    expect(studentsRepositoryTest.findUniqueByRa).toBeCalled()
    expect(studentsRepositoryTest.updateProfilePicture).toBeCalled()
  })

  it('should not be able to set an student profile picture with missing informations', async () => {
    await expect(
      setStudentProfilePictureService.execute({
        ra: '',
        url: '',
      })
    ).rejects.toThrow()

    expect(studentsRepositoryTest.findUniqueByRa).not.toBeCalled()
    expect(studentsRepositoryTest.updateProfilePicture).not.toBeCalled()
  })

  it('should not be able to set an student profile picture for an non-existing student', async () => {
    await expect(
      setStudentProfilePictureService.execute({
        ra: '',
        url: '',
      })
    ).rejects.toThrow()

    expect(studentsRepositoryTest.findUniqueByRa).not.toBeCalled()
    expect(studentsRepositoryTest.updateProfilePicture).not.toBeCalled()
  })

  it('should not be able to set an student profile picture for an non-existing student', async () => {
    //if 'findUniqueByRa' returns nothing, it does not exists an student with that RA
    await expect(
      setStudentProfilePictureService.execute({
        ra: '200146',
        url: 'https://localhost:3000/url',
      })
    ).rejects.toThrow()

    expect(studentsRepositoryTest.findUniqueByRa).toBeCalled()
    expect(studentsRepositoryTest.updateProfilePicture).not.toBeCalled()
  })
})
