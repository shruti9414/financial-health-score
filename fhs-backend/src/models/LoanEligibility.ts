import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database';
import User from './User';
import FinancialHealthScore from './FinancialHealthScore';

class LoanEligibility extends Model {
  public id!: number;
  public score_id!: number;
  public user_id!: number;
  public personal_loan_eligible!: boolean;
  public personal_loan_amount!: number;
  public personal_loan_rate!: number;
  public business_loan_eligible!: boolean;
  public business_loan_amount!: number;
  public business_loan_rate!: number;
  public working_capital_eligible!: boolean;
  public working_capital_amount!: number;
  public working_capital_rate!: number;
  public home_loan_eligible!: boolean;
  public home_loan_amount!: number;
  public home_loan_rate!: number;
  public auto_loan_eligible!: boolean;
  public auto_loan_amount!: number;
  public auto_loan_rate!: number;
  public msme_scheme_eligible!: boolean;
  public msme_scheme_amount!: number;
  public msme_scheme_rate!: number;
  public readonly created_at!: Date;
  public readonly updated_at!: Date;
}

LoanEligibility.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    score_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: FinancialHealthScore,
        key: 'id',
      },
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: User,
        key: 'id',
      },
    },
    personal_loan_eligible: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    personal_loan_amount: {
      type: DataTypes.DECIMAL(15, 2),
      allowNull: true,
    },
    personal_loan_rate: {
      type: DataTypes.DECIMAL(5, 2),
      allowNull: true,
    },
    business_loan_eligible: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    business_loan_amount: {
      type: DataTypes.DECIMAL(15, 2),
      allowNull: true,
    },
    business_loan_rate: {
      type: DataTypes.DECIMAL(5, 2),
      allowNull: true,
    },
    working_capital_eligible: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    working_capital_amount: {
      type: DataTypes.DECIMAL(15, 2),
      allowNull: true,
    },
    working_capital_rate: {
      type: DataTypes.DECIMAL(5, 2),
      allowNull: true,
    },
    home_loan_eligible: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    home_loan_amount: {
      type: DataTypes.DECIMAL(15, 2),
      allowNull: true,
    },
    home_loan_rate: {
      type: DataTypes.DECIMAL(5, 2),
      allowNull: true,
    },
    auto_loan_eligible: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    auto_loan_amount: {
      type: DataTypes.DECIMAL(15, 2),
      allowNull: true,
    },
    auto_loan_rate: {
      type: DataTypes.DECIMAL(5, 2),
      allowNull: true,
    },
    msme_scheme_eligible: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    msme_scheme_amount: {
      type: DataTypes.DECIMAL(15, 2),
      allowNull: true,
    },
    msme_scheme_rate: {
      type: DataTypes.DECIMAL(5, 2),
      allowNull: true,
    },
  },
  {
    sequelize,
    tableName: 'loan_eligibility',
    timestamps: true,
    underscored: true,
  }
);

LoanEligibility.belongsTo(User, { foreignKey: 'user_id', onDelete: 'CASCADE' });
LoanEligibility.belongsTo(FinancialHealthScore, { foreignKey: 'score_id', onDelete: 'CASCADE' });

export default LoanEligibility;
