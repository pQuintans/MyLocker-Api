import express from 'express'
import 'express-async-errors'
import { handleErrorsMiddleware } from './middlewares/handle-errors-middleware'

import { router } from './routes'

const app = express()

app.use(express.json())
app.use(router)

app.use(handleErrorsMiddleware)

app.listen(process.env.PORT || 3333)
