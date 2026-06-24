import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database';
import User from './User';

class UPIData extends Model {
  public id!: number;
  public user_id!: number;
  public consent_id!: string;
  public consent_status!: string;
  public total_inflow!: number;
  public total_outflow!: number;
  public avg_transaction!: number;
  public transaction_frequency!: number;
  public monthly_average!: number;
  public consistency_score!: number;
  public last_fetched!: Date;
  public data!: any;
  public readonly created_at!: Date;
  public readonly updated_at!: Date;
}

UPIData.init(
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
    consent_id: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    consent_status: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
    total_inflow: {
      type: DataTypes.DECIMAL(15, 2),
      allowNull: true,
    },
    total_outflow: {
      type: DataTypes.DECIMAL(15, 2),
      allowNull: true,
    },
    avg_transaction: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: true,
    },
    transaction_frequency: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    monthly_average: {
      type: DataTypes.DECIMAL(15, 2),
      allowNull: true,
    },
    consistency_score: {
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
    tableName: 'upi_data',
    timestamps: true,
    underscored: true,
  }
);

UPIData.belongsTo(User, { foreignKey: 'user_id', onDelete: 'CASCADE' });

export default UPIData;
