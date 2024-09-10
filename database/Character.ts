import sequelize from '@/database'
import { getSnowflake } from '@/utils/snowflake';
import { DataTypes, Model, InferAttributes, InferCreationAttributes, CreationOptional } from 'sequelize'

class Character extends Model<InferAttributes<Character>, InferCreationAttributes<Character>> {
  /** Snowflake ID */
  declare uid: string

  // timestamps!
  // createdAt can be undefined during creation
  declare createdAt: CreationOptional<Date>;
  // updatedAt can be undefined during creation
  declare updatedAt: CreationOptional<Date>;
}

Character.init(
  {
    uid: {
      type: DataTypes.STRING(23),
      autoIncrement: false,
      primaryKey: true,
      defaultValue: () => getSnowflake()
    },
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
  },
  {
    tableName: 'characters',
    sequelize
  },
);

export default Character
