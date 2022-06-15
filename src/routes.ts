import { upload } from './multer'
import express from 'express'

import { CreateStudentController } from '@controllers/student/create-student-controller'
import { FindStudentByEmailController } from '@controllers/student/find-student-by-email-controller'
import { UpdateStudentPasswordController } from '@controllers/student/update-student-passowrd-controller'
import { SetStudentVerificationCodeController } from '@controllers/student/set-student-verification-code-controller'
import { SetStudentProfilePictureController } from '@controllers/student/set-student-profile-picture-controller'

import { CreateFunctionaryController } from '@controllers/functionary/create-functionary-controller'
import { FindFunctionaryController } from '@controllers/functionary/find-functionary-controller'

import { CreateLockerController } from '@controllers/locker/create-locker-controller'
import { ListAllLockersController } from '@controllers/locker/list-all-lockers-controller'

import { CreateSectionController } from '@controllers/section/create-section-controller'

import { CreateApmController } from '@controllers/apm/create-apm-controller'
import { AuthenticateStudentController } from '@controllers/student/authenticate-student-controller'
import { VerifyPasswordExistenceStudentController } from '@controllers/student/verify-password-existence-student-controller'

export const router = express.Router()

const createFunctionaryController = new CreateFunctionaryController()
const findFunctionaryController = new FindFunctionaryController()

const createStudentController = new CreateStudentController()
const findStudentByEmailController = new FindStudentByEmailController()
const updateStudentPasswordController = new UpdateStudentPasswordController()
const setStudentVerificationCodeController =
  new SetStudentVerificationCodeController()
const setStudentProfilePictureController =
  new SetStudentProfilePictureController()

const createLockerController = new CreateLockerController()
const listAllLockersController = new ListAllLockersController()

const createSectionController = new CreateSectionController()

const createApmController = new CreateApmController()

const authenticateStudentController = new AuthenticateStudentController()
const verifyPasswordExistenceStudentController =
  new VerifyPasswordExistenceStudentController()

router.post('/functionaries', createFunctionaryController.handle)
router.get('/functionaries/:cpf', findFunctionaryController.handle)

router.post('/students', createStudentController.handle)
router.get('/students/:email', findStudentByEmailController.handle)
router.put('/students/update-password', updateStudentPasswordController.handle)
router.put(
  '/students/generate-code',
  setStudentVerificationCodeController.handle
)

router.post(
  '/upload',
  upload.single('profile'),
  setStudentProfilePictureController.handle
)

router.post('/lockers', createLockerController.handle)
router.get('/lockers', listAllLockersController.handle)

router.post('/sections', createSectionController.handle)

router.post('/apms', createApmController.handle)

router.post('/students/session', authenticateStudentController.handle)
router.post(
  '/students/verifyPassword',
  verifyPasswordExistenceStudentController.handle
)
