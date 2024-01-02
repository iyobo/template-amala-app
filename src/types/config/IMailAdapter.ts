import { IMailSendParams } from './IMailSendParams'

export interface IMailAdapter {
  init: (opts: any) => Promise<any>

  send: (params: IMailSendParams) => Promise<any>
}