/* External dependencies */
import { Sequelize, Model, ModelDefined, DataTypes, Optional } from 'sequelize'

interface AgreeAttributes {
  id: number
  userId: number
  petitionId: number
}
interface AgreeCreationAttributes extends Optional<AgreeAttributes, 'id'> {}
interface AgreeInstance extends Model<AgreeAttributes, AgreeCreationAttributes>, AgreeAttributes {}

function agreeInit(sequelize: Sequelize) {
  const Agree: ModelDefined<AgreeAttributes, AgreeCreationAttributes> = sequelize.define<AgreeInstance>('Agree', {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },
    petitionId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },
  }, {
    modelName: 'Agree',
    tableName: 'agrees',
    timestamps: true,
    paranoid: true,
    engine: 'InnoDB',
    charset: 'utf8',
    collate: 'utf8_general_ci',
  })

  return Agree
}

export default agreeInit
