import { Request, Response, NextFunction } from 'express'

export const cors = (req: Request, res: Response, nextFunction: NextFunction): void => {
  res.set('access-control-allow-origin', '*')
  res.set('access-control-allow-headers', '*')
  res.set('access-control-allow-methods', 'PATCH')
  nextFunction()
}
