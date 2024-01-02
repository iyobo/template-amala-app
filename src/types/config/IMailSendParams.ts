export interface IMailSendParams {
  to: string | [string]
  body: string
  from?: string
  fromName?: string
  subject?: string
  opts?: any
}