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

const sequelize = new Sequelize(database, username, password, config[env])

export const Agree = agreeInit(sequelize)
export const Petition = petitionInit(sequelize)
export const PetitionFile = petitionFileInit(sequelize)
export const User = userInit(sequelize)

User.hasMany(Petition)
Petition.belongsTo(User)
Petition.hasMany(PetitionFile)
PetitionFile.belongsTo(Petition)
User.belongsToMany(Petition, { sourceKey: 'id', foreignKey: 'userId', through: Agree })
Petition.belongsToMany(User, { sourceKey: 'id', foreignKey: 'petitionId', through: Agree })

export default sequelize
