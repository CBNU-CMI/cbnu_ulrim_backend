/* External dependencies */
import dotenv from 'dotenv'

dotenv.config()

interface configType {
  [key: string]: any
}

const config: configType = {
  development: {
    username: 'cmi',
    password: process.env.DB_PASSWORD,
    database: 'cbnu_ulrim',
    host: 'cmi.jaryapp.kro.kr',
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
    username: 'cmi',
    password: process.env.DB_PASSWORD,
    database: 'cbnu_ulrim',
    host: 'cmi.jaryapp.kro.kr',
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
