export interface ISMSSendParams {
  to: string | [string]
  body: string
  from?: string
}