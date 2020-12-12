/* External dependencies */
import { Sequelize, Model, DataTypes, Optional } from 'sequelize'

interface PetitionFileAttributes {
  id: number
  petitionId: number
  url: string
}
interface PetitionFileCreationAttributes extends Optional<PetitionFileAttributes, 'id'> {}
interface PetitionFileInstance extends Model<PetitionFileAttributes, PetitionFileCreationAttributes>, PetitionFileAttributes {}

function petitionFileInit(sequelize: Sequelize) {
  const PetitionFile = sequelize.define<PetitionFileInstance>('petitionFiles', {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    petitionId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },
    url: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }, {
    modelName: 'petitionFiles',
    tableName: 'petitionFiles',
    timestamps: true,
    paranoid: true,
    engine: 'InnoDB',
    charset: 'utf8',
    collate: 'utf8_general_ci',
  })

  return PetitionFile
}

export default petitionFileInit
