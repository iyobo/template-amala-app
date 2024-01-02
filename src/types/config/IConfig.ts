import type { S3ClientConfig } from '@aws-sdk/client-s3'
import { IMailAdapter } from './IMailAdapter'
import { ISMSAdapter } from './ISMSAdapter'

export interface IConfig {
  appName?: string
  server?: {
    port?: number
    hostUrl?: string /** (string) The base url you would prepend a route with before sharing a link */
    // apiBaseUrl?: string; /*Very optional for specifying where the baseUrl on axios is*/
    webUrl?: string
  }
  devMode?: boolean

  auth: {
    keys: string[]
  }

  log?: {
    debug?: boolean
    token?: string
    subdomain?: string
  }

  storage?: {
    s3?: S3ClientConfig
  }

  db?: {
    url: string
  }

  mail?: {
    engine?: {
      adapter: IMailAdapter
      opts: any
    }

    defaultFromEmail?: string
    defaultFromName?: string

    supportEmail: string
  }

  sms?: {
    engine: {
      adapter: ISMSAdapter
      opts: {
        apiKey: string
        apiSecret: string
      }
    }
    defaultFromPhone: string
  }

  geo?: {
    google: {
      key: string
    }
  }

  /**
   * Place your application specific configs here
   */
  app?: {
    onboardingURl?: string
  }
}
