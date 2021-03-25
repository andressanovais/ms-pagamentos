import { HttpResponse } from './http-protocolos'

export interface Controller<T = any> {
  handle: (Request: T) => Promise<HttpResponse>
}
