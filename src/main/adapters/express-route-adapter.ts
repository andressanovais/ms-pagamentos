import { Request, Response } from 'express'
import { Controller } from '@/presentation/protocols'

export const adaptarRota = (controller: Controller) => {
  return async (req: Request, res: Response) => {
    const { body = {} } = req
    const httpResponse = await controller.handle(body)

    if (httpResponse.statusCode >= 200 && httpResponse.statusCode <= 299) {
      res.status(httpResponse.statusCode).json(httpResponse.body)
    } else {
      res.status(httpResponse.statusCode).json({
        error: httpResponse.body.message
      })
    }
  }
}
