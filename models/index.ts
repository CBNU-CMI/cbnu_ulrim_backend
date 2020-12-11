/* External dependencies */
import { Sequelize } from 'sequelize'

/* Internal dependencies */
import agreeInit from 'models/Agree'
import petitionInit from 'models/Petition'
import petitionFileInit from 'models/PetitionFile'
import userInit from 'models/User'
import config from 'config/config'
import EnvironmentType from 'constants/EnvironmentType'

const env: EnvironmentType = (process.env.NODE_ENV || EnvironmentType.Development) as EnvironmentType
const { database, username, password } = config[env]

const db = {} as any

export function init(): Sequelize {
  const sequelize = new Sequelize(database, username, password, config[env])

  const Agree = agreeInit(sequelize)
  const Petition = petitionInit(sequelize)
  const PetitionFile = petitionFileInit(sequelize)
  const User = userInit(sequelize)

  db.Agree = Agree
  db.Petition = Petition
  db.PetitionFile = PetitionFile
  db.User = User

  User.hasMany(Petition, { foreignKey: {
    name: 'UserId',
    field: 'userId'
  }})
  Petition.belongsTo(User)
  Petition.hasMany(PetitionFile, { foreignKey: {
    name: 'PetitionId',
    field: 'petitionId'
  }})
  PetitionFile.belongsTo(Petition)
  User.belongsToMany(Petition, { sourceKey: 'id', foreignKey: 'userId', through: Agree })
  Petition.belongsToMany(User, { sourceKey: 'id', foreignKey: 'petitionId', through: Agree })

  return sequelize
}

export default db
