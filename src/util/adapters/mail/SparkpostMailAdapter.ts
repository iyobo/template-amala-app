import config from '../../../config'
import { errors } from 'amala'
import { IMailAdapter } from '../../../types/config/IMailAdapter'
import { IMailSendParams } from '../../../types/config/IMailSendParams'

const SparkPost = require('sparkpost')

class SparkpostMailAdapter implements IMailAdapter {
  client = null
  opts = null

  send({ from, to, subject, body, fromName, opts = {} }: IMailSendParams): Promise<any> {
    if (!this.client) {
      throw errors.dependencyFailed('init(...) has not been run yet')
    }
    if (!to) {
      throw errors.badInput('No Destination email provided')
    }

    let recipients = []
    if (Array.isArray(to)) {
      recipients = to
    } else {
      recipients = [to]
    }

    recipients = recipients.map((address) => {
      return { address }
    })

    const content = {
      from: {
        email: from || config.mail.defaultFromEmail,
        name: fromName || config.mail.defaultFromName,
      },
      subject: subject || `A message from ${config.appName}`,
      html: body,
    }

    return this.client.transmissions.send({
      options: { ...this.opts, ...opts },
      content,
      recipients,
    })
  }

  async init(opts: any) {
    this.opts = opts || {}
    this.client = new SparkPost(opts.apiKey)

    //create list
    // const list = await this.client.recipientLists.get('userList');
    // if (!list) {
    //     // list does not exist. Create it
    //
    // }

    return this.client
  }
}

export default new SparkpostMailAdapter()
