import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database';
import User from './User';

class GSTData extends Model {
  public id!: number;
  public user_id!: number;
  public gst_number!: string;
  public registration_status!: string;
  public business_turnover!: number;
  public filing_status!: string;
  public compliance_score!: number;
  public last_fetched!: Date;
  public data!: any;
  public readonly created_at!: Date;
  public readonly updated_at!: Date;
}

GSTData.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: User,
        key: 'id',
      },
    },
    gst_number: {
      type: DataTypes.STRING(15),
      allowNull: false,
    },
    registration_status: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
    business_turnover: {
      type: DataTypes.DECIMAL(15, 2),
      allowNull: true,
    },
    filing_status: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
    compliance_score: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    last_fetched: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    data: {
      type: DataTypes.JSON,
      allowNull: true,
    },
  },
  {
    sequelize,
    tableName: 'gst_data',
    timestamps: true,
    underscored: true,
  }
);

GSTData.belongsTo(User, { foreignKey: 'user_id', onDelete: 'CASCADE' });

export default GSTData;
