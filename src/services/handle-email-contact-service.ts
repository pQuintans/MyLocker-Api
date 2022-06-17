import { MailAdapter } from '@adapters/mail-adapter'

interface HandleEmailContactServiceData {
  name: string
  email: string
  message: string
}

export class HandleEmailContactService {
  constructor(private mailAdapter: MailAdapter) {}

  async execute(request: HandleEmailContactServiceData) {
    const { name, email, message } = request

    if (!name || !email || !message) {
      throw new Error('Faltam informações')
    }

    await this.mailAdapter.sendContactMail({
      senderName: name,
      senderEmail: email,
      body: [
        '<div style="font-family: sans-serif; font-size: 16px; color: #111">',
        `<p>Nome: ${name}</p>`,
        `<p>E-mail: ${email}</p>`,
        `<p>Messagem: ${message}</p>`,
        '<div>',
      ].join('\n'),
    })

    return
  }
}
