import nodemailer from 'nodemailer'
import { MailAdapter, SendMailData } from '../mail-adapter'

const transport = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  auth: {
    user: 'mylocker.contato@gmail.com',
    pass: process.env.EMAIL_PASS,
  },
  tls: {
    rejectUnauthorized: false,
  },
})

export class NodemailerMailAdapter implements MailAdapter {
  async sendMail({ subjectName, subject, body }: SendMailData) {
    await transport.sendMail({
      from: 'Equipe MyLocker <mylocker.contato@gmail.com>',
      to: subjectName + '<' + subject + '>',
      subject: 'Código de verificação',
      html: body,
    })
  }
}
