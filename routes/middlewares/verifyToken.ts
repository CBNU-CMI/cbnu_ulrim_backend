/* External dependencies */
import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config()

declare const process: {
  env: {
    AUTH_KEY: string
  }
}

export interface JWTTokenAttributes {
  id: string
  email: string
}

export interface InjectedRequestType {
  decoded?: JWTTokenAttributes
}

export const verifyToken = (req: Request & InjectedRequestType, res: Response, next: NextFunction) => {
  try {
    req.decoded = jwt.verify(req.cookies.token, process.env.AUTH_KEY) as JWTTokenAttributes
    return next()
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      error.status = 419
      return next(error)
    }

    error.status = 401
    return next(error)
  }
}
