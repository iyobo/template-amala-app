/**
 * An example mail adapter for SMTP. Feel free to delete or use as example to create a different one e.g mailchimp.
 * Active default mail adapter is set in config.ts
 */
import { errors } from 'amala'
import { IMailAdapter } from '../../../types/config/IMailAdapter'
import { IMailSendParams } from '../../../types/config/IMailSendParams'
import config from '../../../config'

const nodemailer = require('nodemailer')

class SMTPMailAdapter implements IMailAdapter {
  client = null
  opts = null

  async send({ from, to, subject, body, fromName, opts = {} }: IMailSendParams): Promise<any> {
    if (!this.client) {
      throw errors.dependencyFailed('init(...) has not been run yet')
    }
    if (!to) {
      throw errors.badInput('No Destination email provided')
    }

    let recipients = to
    if (Array.isArray(to)) {
      recipients = to.join(',')
    }

    const info = await this.client.sendMail({
      from: `"${fromName || config.mail.defaultFromName}" <${
        from || config.mail.defaultFromEmail
      }>`, // sender address
      to: recipients,
      subject: subject || `A message from ${config.appName}`,
      html: body,
    })

    console.log('Message sent: %s', info.messageId)
  }

  async init(opts: any) {
    this.opts = opts || {}

    this.client = nodemailer.createTransport({
      host: opts.host,
      port: opts.port,
      secure: opts.secure, // true for 465, false for other ports
      auth: {
        user: opts.username, // generated ethereal user
        pass: opts.password, // generated ethereal password
      },
      tls: {
        ciphers: 'SSLv3',
      },
    })

    return this.client
  }
}

export default new SMTPMailAdapter()
