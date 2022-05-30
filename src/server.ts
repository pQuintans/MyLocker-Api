import express from 'express'
import 'express-async-errors'
import cors from 'cors'

import { handleErrorsMiddleware } from './middlewares/handle-errors-middleware'

import { router } from './routes'

const allowedOrigins = [
  'http://localhost:3000',
  'https://mylocker-web.herokuapp.com',
]

const options: cors.CorsOptions = {
  origin: allowedOrigins,
}

const app = express()

app.use(express.json())
app.use(cors(options))
app.use('/profile-picture', express.static('upload/images'))
app.use(router)

app.use(handleErrorsMiddleware)

app.listen(process.env.PORT || 3333)
