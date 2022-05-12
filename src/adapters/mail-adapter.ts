export interface SendMailData {
  subjectName: string
  subject: string
  body: string
}

export interface MailAdapter {
  sendMail: (data: SendMailData) => Promise<void>
}
