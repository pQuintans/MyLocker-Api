export interface SendMailData {
  subjectName: string
  subject: string
  body: string
}

export interface SendContactMailData {
  senderName: string
  senderEmail: string
  body: string
}

export interface MailAdapter {
  sendMail: (data: SendMailData) => Promise<void>
  sendContactMail: (data: SendContactMailData) => Promise<void>
}
