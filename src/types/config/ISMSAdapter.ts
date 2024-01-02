import { ISMSSendParams } from './ISMSSendParams'

export interface ISMSAdapter {
  init: (opts: any) => Promise<any>

  send: (params: ISMSSendParams) => Promise<any>
}