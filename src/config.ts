/**
 * It is encouraged to load all process.env values in here and only use config values from this file around your app.
 * Consider this file your app's config source of truth.
 *
 * As your config needs grow, modify IConfig to change the shape of your app's config options.
 */

import { IConfig } from './types/config/IConfig'
import TwilioSMSAdapter from './util/adapters/sms/TwilioSMSAdapter'
import SMTPMailAdapter from './util/adapters/mail/SMTPMailAdapter'

const port = process.env.PORT ? Number.parseInt(process.env.PORT) : 4000
const securityKeys = []
if (process.env.AUTH_SECURITY_KEY_1) {
  securityKeys.push(process.env.AUTH_SECURITY_KEY_1)
}
if (process.env.AUTH_SECURITY_KEY_2) {
  securityKeys.push(process.env.AUTH_SECURITY_KEY_2)
}
if (securityKeys.length === 0) {
  // throw new Error('Please specify security keys in env file');
  securityKeys.push('changeMeASAP')
}

const isDebug = !process.env.NODE_ENV || process.env.NODE_ENV === 'dev'

const hostUrl = process.env.BASE_API_URL || `http://localhost:${port}`
const webUrl = process.env.BASE_WEB_URL || `http://localhost:3000`

const config: IConfig = {
  appName: process.env.APP_NAME || 'Sifical',

  devMode: isDebug,

  server: {
    port,
    hostUrl,
    webUrl,
  },

  auth: {
    keys: securityKeys,
  },

  db: {
    url: process.env.DB_URL,
  },

  log: {
    debug: isDebug,
    token: process.env.LOGGLY_KEY,
    subdomain: process.env.LOGGLY_SUBDOMAIN,
  },

  storage: {
    s3: {
      forcePathStyle: false, // Configures to use subdomain/virtual calling format.
      endpoint: process.env.S3_ENDPOINT,
      // region: "us-east-1",
      credentials: {
        accessKeyId: process.env.S3_KEY,
        secretAccessKey: process.env.S3_SECRET,
      },
    },
  },

  geo: {
    google: {
      key: process.env.GOOGLE_MAPS_KEY,
    },
  },

  sms: {
    engine: {
      adapter: TwilioSMSAdapter,
      opts: {
        apiKey: process.env.SMS_TWILIO_KEY,
        apiSecret: process.env.SMS_TWILIO_SECRET,
      },
    },
    defaultFromPhone: process.env.SMS_DEFAULT_PHONE,
  },

  mail: {
    engine: {
      adapter: SMTPMailAdapter,
      opts: {
        host: process.env.MAIL_HOST,
        port: Number.parseInt(process.env.MAIL_PORT),
        username: process.env.MAIL_USERNAME,
        password: process.env.MAIL_PASSWORD,
        secure: process.env.MAIL_SECURE === 'true',
      },
    },
    defaultFromEmail: process.env.MAIL_DEFAULT_ADDRESS,
    defaultFromName: process.env.MAIL_DEFAULT_NAME,
    supportEmail: process.env.MAIL_SUPPORT_ADDRESS || 'support@sifical.com',
  },

  app: {
    onboardingURl: '/c',
  },
}

export default config
