/* External dependencies */
import { Sequelize, Model, DataTypes, Optional } from 'sequelize'

interface UserAttributes {
  id: number
  email: string
  password: string
}
interface UserCreationAttributes extends Optional<UserAttributes, 'id'> {}
interface UserInstance extends Model<UserAttributes, UserCreationAttributes>, UserAttributes {}

function userInit(sequelize: Sequelize) {
  const User = sequelize.define<UserInstance>('users', {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(30),
      allowNull: false,
      unique: true,
      validate: {
        isEmail: {
          msg: 'Invalid email address. Please check your email again',
        },
      },
    },
    password: {
      type: DataTypes.STRING(60),
      allowNull: false
    }
  }, {
    modelName: 'users',
    tableName: 'users',
    timestamps: true,
    paranoid: true,
    engine: 'InnoDB',
    charset: 'utf8',
    collate: 'utf8_general_ci',
  })

  return User
}

export default userInit
