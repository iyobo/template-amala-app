import { IMailAdapter } from '../types/config/IMailAdapter'
import config from '../config'
import { IMailSendParams } from '../types/config/IMailSendParams'

let mailEngine: IMailAdapter

export const initMail = async () => {
  console.log(`Initializing Mailer...`)
  if (config.mail.engine.adapter) {
    mailEngine = config.mail.engine.adapter
    await mailEngine.init(config.mail.engine.opts)
  }
}

export const sendEmail = async (params: IMailSendParams) => {
  if (!mailEngine) await initMail()

  return await mailEngine.send(params)
}
