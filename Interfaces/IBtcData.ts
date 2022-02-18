export interface IBtcData {
  time: ITime
  disclaimer: string
  chartName: string
  bpi: ICurrency
}

export interface ITime {
  updated: Date
  updatedISO: Date
  updateduk: Date
}
export interface ICurrency {
  USD: IExchangeData
  GBP: IExchangeData
  EUR: IExchangeData
}
export interface IExchangeData {
  code: string
  symbol: string
  rate: string
  description: string
  rate_float: number
}