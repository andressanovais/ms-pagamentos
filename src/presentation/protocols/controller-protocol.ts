import { HttpResponse } from './http-protocols'

export interface Controller<T = any> {
  handle: (Request: T) => Promise<HttpResponse>
}
