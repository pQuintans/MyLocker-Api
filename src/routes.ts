import { CreateFunctionaryController } from '@controllers/create-functionary-controller'
import express from 'express'

export const router = express.Router()

const createFunctionaryController = new CreateFunctionaryController()

router.post('/functionaries', createFunctionaryController.handle)
