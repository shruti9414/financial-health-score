import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database';
import User from './User';

class LoanApplication extends Model {
  public id!: number;
  public user_id!: number;
  public loan_type!: string;
  public loan_amount!: number;
  public tenure_months!: number;
  public status!: string;
  public application_data!: any;
  public submitted_at!: Date;
  public reviewed_at!: Date;
  public reviewed_by!: string;
  public review_comments!: string;
  public readonly created_at!: Date;
  public readonly updated_at!: Date;
}

LoanApplication.init(
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
    loan_type: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    loan_amount: {
      type: DataTypes.DECIMAL(15, 2),
      allowNull: false,
    },
    tenure_months: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    status: {
      type: DataTypes.STRING(50),
      defaultValue: 'PENDING',
    },
    application_data: {
      type: DataTypes.JSON,
      allowNull: true,
    },
    submitted_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    reviewed_at: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    reviewed_by: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    review_comments: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  },
  {
    sequelize,
    tableName: 'loan_applications',
    timestamps: true,
    underscored: true,
  }
);

LoanApplication.belongsTo(User, { foreignKey: 'user_id', onDelete: 'CASCADE' });

export default LoanApplication;
