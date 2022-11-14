import { uploadImage, uploadPDF } from './multer'
import express from 'express'

import { CreateStudentController } from '@controllers/student/create-student-controller'
import { FindStudentByEmailController } from '@controllers/student/find-student-by-email-controller'
import { UpdateStudentPasswordController } from '@controllers/student/update-student-password-controller'
import { SetStudentVerificationCodeController } from '@controllers/student/set-student-verification-code-controller'
import { SetStudentProfilePictureController } from '@controllers/student/set-student-profile-picture-controller'
import { AuthenticateStudentController } from '@controllers/student/authenticate-student-controller'
import { ValidateHttpOnlyJwtTokenStudentController } from '@controllers/student/validate-httpOnly-jwt-token-student-controller'
import { VerifyPasswordExistenceStudentController } from '@controllers/student/verify-password-existence-student-controller'
import { SetStudentLockerNumberController } from '@controllers/student/set-student-locker-number-controller'
import { ListAllStudentsController } from '@controllers/student/list-all-students-controller'
import { UpdateStudentStatusController } from '@controllers/student/update-student-status-controller'
import { UpdateStudentInformationController } from '@controllers/student/update-student-information-controller'
import { FindStudentByRaController } from '@controllers/student/find-student-by-ra-controller'

import { CreateFunctionaryController } from '@controllers/functionary/create-functionary-controller'
import { FindFunctionaryController } from '@controllers/functionary/find-functionary-controller'

import { CreateLockerController } from '@controllers/locker/create-locker-controller'
import { ListAllLockersController } from '@controllers/locker/list-all-lockers-controller'
import { FindLockerByNumberController } from '@controllers/locker/find-locker-by-number-controller'
import { SetLockerIsRentedController } from '@controllers/locker/set-locker-is-rented-controller'

import { CreateSectionController } from '@controllers/section/create-section-controller'

import { CreateApmController } from '@controllers/apm/create-apm-controller'

import { HandleEmailContactController } from '@controllers/handle-email-contact-controller'
import { ClearStudentLockerController } from '@controllers/clear-student-locker-controller'
import { FindApmByIdController } from '@controllers/apm/find-apm-by-id-controller'
import { ListApmsController } from '@controllers/apm/list-apm-controller'
import { SetFunctionaryVerificationCodeController } from '@controllers/functionary/set-functionary-verification-code-controller'
import { UpdateFunctionaryPasswordController } from '@controllers/functionary/update-functionary-password-controller'
import { VerifyFunctionaryVerificationCodeController } from '@controllers/functionary/verify-functionary-verification-code-controller'
import { ChangeApmStatusController } from '@controllers/apm/change-apm-status-controller'

export const router = express.Router()

const createStudentController = new CreateStudentController()
const findStudentByEmailController = new FindStudentByEmailController()
const findStudentByRaController = new FindStudentByRaController()
const updateStudentPasswordController = new UpdateStudentPasswordController()
const updateStudentInformationController =
  new UpdateStudentInformationController()
const setStudentVerificationCodeController =
  new SetStudentVerificationCodeController()
const setStudentProfilePictureController =
  new SetStudentProfilePictureController()
const authenticateStudentController = new AuthenticateStudentController()
const validateHttpOnlyJwtTokenStudentController =
  new ValidateHttpOnlyJwtTokenStudentController()
const verifyPasswordExistenceStudentController =
  new VerifyPasswordExistenceStudentController()
const setStudentLockerNumberController = new SetStudentLockerNumberController()
const listAllStudentsController = new ListAllStudentsController()
const updateStudentStatusController = new UpdateStudentStatusController()

const createFunctionaryController = new CreateFunctionaryController()
const findFunctionaryController = new FindFunctionaryController()
const setFunctionaryVerificationCodeController =
  new SetFunctionaryVerificationCodeController()
const updateFunctionaryPasswordController =
  new UpdateFunctionaryPasswordController()
const verifyFunctionaryVerificationCodeController =
  new VerifyFunctionaryVerificationCodeController()

const createLockerController = new CreateLockerController()
const listAllLockersController = new ListAllLockersController()
const findLockerByNumberController = new FindLockerByNumberController()
const setLockerIsRentedController = new SetLockerIsRentedController()

const createSectionController = new CreateSectionController()

const createApmController = new CreateApmController()
const findApmByIdController = new FindApmByIdController()
const listApmsController = new ListApmsController()
const changeApmStatusController = new ChangeApmStatusController()

const handleEmailContactController = new HandleEmailContactController()

const clearStudentLockerController = new ClearStudentLockerController()

router.post('/functionaries', createFunctionaryController.handle)
router.get('/functionaries/:cpf', findFunctionaryController.handle)
router.get(
  '/functionaries/:cpf/verify-code/:typedCode',
  verifyFunctionaryVerificationCodeController.handle
)
router.put(
  '/functionaries/generate-code',
  setFunctionaryVerificationCodeController.handle
)
router.put(
  '/functionaries/update-password',
  updateFunctionaryPasswordController.handle
)

router.post('/students', createStudentController.handle)
router.post('/students/update-status', updateStudentStatusController.handle)
router.get('/students/:email', findStudentByEmailController.handle)
router.get('/students/:ra', findStudentByRaController.handle)
router.get('/students', listAllStudentsController.handle)
router.put('/students/update-password', updateStudentPasswordController.handle)
router.put(
  '/students/update-informations',
  updateStudentInformationController.handle
)
router.put(
  '/students/generate-code',
  setStudentVerificationCodeController.handle
)
router.post(
  '/students/verifyPasswordExistence',
  verifyPasswordExistenceStudentController.handle
)
router.post(
  '/uploadImage',
  uploadImage.single('profile'),
  setStudentProfilePictureController.handle
)
router.post(
  '/students/update-locker-number',
  setStudentLockerNumberController.handle
)
router.post('/students/session', authenticateStudentController.handle)
router.get('/logout/students', (req, res) => {
  res
    .status(202)
    .cookie('token', '', {
      sameSite: 'none',
      secure: req.headers.host == 'localhost:3000' ? false : true,
      path: '/',
      expires: new Date(new Date().getTime() - 24 * 60 * 60 * 1000),
      httpOnly: true,
    })
    .send()
})
router.get(
  '/validate/students',
  validateHttpOnlyJwtTokenStudentController.handle
)

router.post('/lockers', createLockerController.handle)
router.get('/lockers', listAllLockersController.handle)
router.get('/lockers/:lockerNumberString', findLockerByNumberController.handle)
router.post('/lockers/set-is-rented', setLockerIsRentedController.handle)

router.get('/apms', listApmsController.handle)
router.get('/apms/:id', findApmByIdController.handle)
router.put('/apms/change-status', changeApmStatusController.handle)
router.post(
  '/apms',
  uploadPDF.single('apmRequisitionPDF'),
  createApmController.handle
)

router.post('/sections', createSectionController.handle)

router.post('/contact', handleEmailContactController.handle)

router.post('/clear-locker-demonstration', clearStudentLockerController.handle)
