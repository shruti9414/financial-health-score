import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database';
import User from './User';

class EPFOData extends Model {
  public id!: number;
  public user_id!: number;
  public employee_count!: number;
  public payroll_consistency!: number;
  public avg_monthly_payroll!: number;
  public growth_trend!: string;
  public last_fetched!: Date;
  public data!: any;
  public readonly created_at!: Date;
  public readonly updated_at!: Date;
}

EPFOData.init(
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
    employee_count: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    payroll_consistency: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    avg_monthly_payroll: {
      type: DataTypes.DECIMAL(15, 2),
      allowNull: true,
    },
    growth_trend: {
      type: DataTypes.STRING(50),
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
    tableName: 'epfo_data',
    timestamps: true,
    underscored: true,
  }
);

EPFOData.belongsTo(User, { foreignKey: 'user_id', onDelete: 'CASCADE' });

export default EPFOData;
