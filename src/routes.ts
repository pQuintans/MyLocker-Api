import { upload } from './multer'

import { CreateStudentController } from '@controllers/student/create-student-controller'
import { FindStudentByEmailController } from '@controllers/student/find-student-by-email-controller'
import { UpdateStudentPasswordController } from '@controllers/student/update-student-passowrd-controller'

import { CreateFunctionaryController } from '@controllers/functionary/create-functionary-controller'
import { FindFunctionaryController } from '@controllers/functionary/find-functionary-controller'

import express from 'express'
import { SetStudentVerificationCodeController } from '@controllers/student/set-student-verification-code-controller'
import { SetProfilePictureStudentController } from '@controllers/student/set-student-profile-controller'

export const router = express.Router()

const createFunctionaryController = new CreateFunctionaryController()
const findFunctionaryController = new FindFunctionaryController()

const createStudentController = new CreateStudentController()
const findStudentByEmailController = new FindStudentByEmailController()
const updateStudentPasswordController = new UpdateStudentPasswordController()
const setStudentVerificationCodeController =
  new SetStudentVerificationCodeController()
const setProfilePictureStudentController =
  new SetProfilePictureStudentController()

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
  setProfilePictureStudentController.handle
)
