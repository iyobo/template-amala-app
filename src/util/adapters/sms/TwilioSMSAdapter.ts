import twilio from 'twilio'
import { errorBadInput, errorDependencyFailed } from 'amala/dist/util/errors'
import { ISMSAdapter } from '../../../types/config/ISMSAdapter'
import { ISMSSendParams } from '../../../types/config/ISMSSendParams'

class TwilioSMSAdapter implements ISMSAdapter {
  client = null
  opts = null

  async init(opts: any) {
    this.opts = opts || {}
    const { apiKey, apiSecret, ...otherOptions } = opts
    this.client = twilio(apiKey, apiSecret, otherOptions)

    return this.client
  }

  async send({ from, to, body }: ISMSSendParams) {
    if (!this.client) {
      throw errorDependencyFailed('init(...) has not been run yet')
    }
    if (!to) {
      throw errorBadInput('No Destination phone number provided')
    }

    return await this.client.messages.create({ from, to, body })
  }
}

export default new TwilioSMSAdapter()
