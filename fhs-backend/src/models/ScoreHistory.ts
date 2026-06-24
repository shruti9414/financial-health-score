import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database';
import User from './User';
import FinancialHealthScore from './FinancialHealthScore';

class ScoreHistory extends Model {
  public id!: number;
  public user_id!: number;
  public score_id!: number;
  public total_score!: number;
  public risk_level!: string;
  public snapshot_data!: any;
  public readonly created_at!: Date;
}

ScoreHistory.init(
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
    score_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: FinancialHealthScore,
        key: 'id',
      },
    },
    total_score: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    risk_level: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
    snapshot_data: {
      type: DataTypes.JSON,
      allowNull: true,
    },
  },
  {
    sequelize,
    tableName: 'score_history',
    timestamps: false,
    underscored: true,
  }
);

ScoreHistory.belongsTo(User, { foreignKey: 'user_id', onDelete: 'CASCADE' });
ScoreHistory.belongsTo(FinancialHealthScore, { foreignKey: 'score_id', onDelete: 'CASCADE' });

export default ScoreHistory;
