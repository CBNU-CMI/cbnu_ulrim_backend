/* External dependencies */
import express, { Request, Response, NextFunction } from 'express'
import http, { Server } from 'http'
import path from 'path'
import fs from 'fs'
import cookieParser from 'cookie-parser'
import morgan from 'morgan'
import helmet from 'helmet'
import hpp from 'hpp'
import dotenv from 'dotenv'
import cors from 'cors'
import { Sequelize } from 'sequelize/types'

/* Internal dependencies */
import sequelize from 'models'
import authRouter from 'routes/auth'
import petitionRouter from 'routes/petition'
import logger from 'logger'

dotenv.config()

async function stopServer(server: Server, sequelize: Sequelize, signal?: string) {
  logger.info(`Stoping server with signal: ${signal}`)
  await server.close()
  await sequelize.close()
  process.exit()
}

async function runServer() {
  const app = express()
  const server = http.createServer(app)
  const { PORT: port = 4000 } = process.env

  if (process.env.NODE_ENV === 'production') {
    app.use(morgan('combined'))
    app.use(helmet())
    app.use(hpp())
  } else {
    app.use(morgan('dev'))
  }

  if (!fs.existsSync(path.join(__dirname, 'images'))) {
    fs.mkdirSync(path.join(__dirname, 'images'));
  }

  app.use(cors({ origin: '*' })) // NOTE: (@daniel) 추후에 cors설정필요. 현재는 모든 origin을 허용.
  app.use('/image', express.static(path.join(__dirname, 'images')))
  app.use(express.json())
  app.use(express.urlencoded({ extended: false }))
  app.use(cookieParser(process.env.COOKIE_SECRET))

  app.use('/api/auth', authRouter)
  app.use('/api/petition', petitionRouter)

  app.use((error: any, req: Request, res: Response, next: NextFunction) => {
    logger.error(error.message)
    return res.status(error.status || 500).send({
      message: error.message,
    })
  })

  server.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`)
  })

  try {
    await sequelize.authenticate()
    await sequelize.sync()
  } catch (error) {
    stopServer(server, sequelize)
    throw error
  }
}

runServer()
  .then(() => {
    logger.info(`run successfully`)
  })
  .catch((ex: Error) => {
    logger.error('Unable run', ex)
  })
