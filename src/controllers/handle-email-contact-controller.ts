import { NodemailerMailAdapter } from '@adapters/nodemailer/nodemailer-mail-adapter'
import { HandleEmailContactService } from '@services/handle-email-contact-service'
import { Request, Response } from 'express'

export class HandleEmailContactController {
  async handle(req: Request, res: Response) {
    const { name, email, message } = req.body

    const nodemailerMailAdapter = new NodemailerMailAdapter()

    const handleEmailContactService = new HandleEmailContactService(
      nodemailerMailAdapter
    )

    await handleEmailContactService.execute({
      name,
      email,
      message,
    })

    return res.status(200).send()
  }
}
