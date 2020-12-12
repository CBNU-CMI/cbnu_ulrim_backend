/* External dependencies */
import { Request, Response, NextFunction } from 'express'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

/* Internal dependencies */
import { User } from 'models'

dotenv.config()

declare const process: {
  env: {
    AUTH_KEY: string
  }
}

export const signup = async (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body

  try {
    const user = await User.findOne({ where: { email } })
    if (user) {
      return res.status(403).send({ message: 'Email already exists. Please enter another email' })
    }

    const hash = await bcrypt.hash(password, 12)
    await User.create({ email, password: hash })
    return res.send({ message: 'Thanks for signing up with us' })
  } catch (error) {
    return next(error)
  }
}

export const signin = async (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body

  try {
    const user = await User.findOne({ where: { email } })
    if (user) {
      const isValidPassword = await bcrypt.compare(password, user.password)
      if (isValidPassword)  {
        const token = jwt.sign({
          id: user.id,
          email: user.email,
        }, process.env.AUTH_KEY, {
          expiresIn: '3h',
        })
        return res
          .cookie('token', token, { httpOnly: true })
          .send({ user: { id: user.id, email: user.email }, isLoggedIn: true })
      } else {
        return res.status(401).send({ message: "Password is wrong. Please check your password again." })
      }
    } else {
      return res.status(401).send({ message: "Can't find user. Please check your email again." })
    }
  } catch (err) {
    return next(err)
  }
}

export const signout = (req: any, res: Response) => {
  return res.cookie('token', '').sendStatus(240)
}

export const isLoggedIn = (req: any, res: Response) => {
  return res.send({ user: req.decoded, isLoggedIn: true })
}
