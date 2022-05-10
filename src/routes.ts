import { CreateFunctionaryController } from '@controllers/create-functionary-controller'
import { FindFunctionaryController } from '@controllers/find-functionary-controller'
import express from 'express'

export const router = express.Router()

const createFunctionaryController = new CreateFunctionaryController()
const findFunctionaryController = new FindFunctionaryController()

router.post('/functionaries', createFunctionaryController.handle)
router.get('/functionaries/:cpf', findFunctionaryController.handle)
