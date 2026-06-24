import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database';
import User from './User';

class FinancialHealthScore extends Model {
  public id!: number;
  public user_id!: number;
  public total_score!: number;
  public revenue_score!: number;
  public stability_score!: number;
  public compliance_score!: number;
  public growth_score!: number;
  public risk_level!: string;
  public confidence_level!: number;
  public score_breakdown!: any;
  public recommendations!: any;
  public generated_at!: Date;
  public expires_at!: Date;
  public readonly created_at!: Date;
  public readonly updated_at!: Date;
}

FinancialHealthScore.init(
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
    total_score: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    revenue_score: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    stability_score: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    compliance_score: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    growth_score: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    risk_level: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
    confidence_level: {
      type: DataTypes.DECIMAL(5, 2),
      allowNull: true,
    },
    score_breakdown: {
      type: DataTypes.JSON,
      allowNull: true,
    },
    recommendations: {
      type: DataTypes.JSON,
      allowNull: true,
    },
    generated_at: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: DataTypes.NOW,
    },
    expires_at: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  },
  {
    sequelize,
    tableName: 'financial_health_scores',
    timestamps: true,
    underscored: true,
  }
);

FinancialHealthScore.belongsTo(User, { foreignKey: 'user_id', onDelete: 'CASCADE' });

export default FinancialHealthScore;
