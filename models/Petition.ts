/* External dependencies */
import { Sequelize, Model, DataTypes, Optional } from 'sequelize'

/* Internal dependencies */
import CategoryType from 'constants/CategoryType'

interface PetitionAttributes {
  id: number
  userId: number
  title: string
  category: CategoryType
  content: string
  dueDate: Date
}
interface PetitionCreationAttributes extends Optional<PetitionAttributes, 'id'> {}
interface PetitionInstance extends Model<PetitionAttributes, PetitionCreationAttributes>, PetitionAttributes {}

function petitionInit(sequelize: Sequelize) {
  const Petition = sequelize.define<PetitionInstance>('petitions', {
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
    title: {
      type: DataTypes.STRING(50),
      allowNull: false,
      defaultValue: '',
    },
    category: {
      type: DataTypes.STRING(20),
      allowNull: false,
      validate: {
        isIn: [[CategoryType.Student, CategoryType.Recruitment, CategoryType.Etc]],
      },
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
      defaultValue: '',
    },
    dueDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  }, {
    modelName: 'petitions',
    tableName: 'petitions',
    timestamps: true,
    paranoid: true,
    engine: 'InnoDB',
    charset: 'utf8',
    collate: 'utf8_general_ci',
  })

  return Petition
}

export default petitionInit
