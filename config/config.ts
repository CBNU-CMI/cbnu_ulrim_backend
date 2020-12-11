/* External dependencies */
import dotenv from 'dotenv'

dotenv.config()

interface configType {
  [key: string]: any
}

const config: configType = {
  development: {
    username: 'root',
    password: process.env.DB_PASSWORD,
    database: 'ulrim',
    host: '127.0.0.1',
    dialect: 'mysql',
    operatorsAliases: 'false',
    logging: false,
    dialectOptions: {
      dateStrings: true,
      typeCast: true,
      timezone: '+09:00'
    },
    timezone: '+09:00'
  },
  production: {
    username: 'root',
    password: process.env.DB_PASSWORD,
    database: 'ulrim',
    host: '127.0.0.1',
    dialect: 'mysql',
    operatorsAliases: 'false',
    logging: false,
    dialectOptions: {
      dateStrings: true,
      typeCast: true,
      timezone: '+09:00'
    },
    timezone: '+09:00'
  }
}

export default config
