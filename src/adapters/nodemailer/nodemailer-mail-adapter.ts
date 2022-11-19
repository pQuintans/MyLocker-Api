import nodemailer from 'nodemailer'
import { MailAdapter, SendContactMailData, SendMailData } from '../mail-adapter'

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
  async sendMail({ subjectName, subject, emailSubject, body }: SendMailData) {
    await transport.sendMail({
      from: 'Equipe MyLocker <mylocker.contato@gmail.com>',
      to: subjectName + '<' + subject + '>',
      subject: emailSubject,
      html: body,
    })
  }

  async sendContactMail({
    senderName,
    senderEmail,
    body,
  }: SendContactMailData) {
    await transport.sendMail({
      from: `${senderName} <${senderEmail}>`,
      to: 'Equipe MyLocker <mylocker.contato@gmail.com>',
      subject: 'Contato via site',
      html: body,
    })
  }
}
