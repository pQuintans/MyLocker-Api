import { NextFunction, Request, Response } from 'express'

export function handleErrorsMiddleware(
  err: Error,
  request: Request,
  response: Response,
  next: NextFunction
) {
  if (err instanceof Error) {
    return response.status(400).json({
      erro: err.message,
    })
  }

  return response.status(500).json({
    status: 'error',
    message: 'Internal Server Error',
  })
}
