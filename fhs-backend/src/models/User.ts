import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database';

class User extends Model {
  public id!: number;
  public email!: string;
  public phone!: string;
  public password_hash!: string;
  public business_name!: string;
  public business_type!: string;
  public industry!: string;
  public address!: string;
  public gst_number!: string;
  public pan_number!: string;
  public aadhaar_number!: string;
  public readonly created_at!: Date;
  public readonly updated_at!: Date;
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    email: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: true,
    },
    phone: {
      type: DataTypes.STRING(20),
      allowNull: true,
    },
    password_hash: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    business_name: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    business_type: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    industry: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    address: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    gst_number: {
      type: DataTypes.STRING(15),
      allowNull: true,
      unique: true,
    },
    pan_number: {
      type: DataTypes.STRING(20),
      allowNull: true,
    },
    aadhaar_number: {
      type: DataTypes.STRING(20),
      allowNull: true,
    },
  },
  {
    sequelize,
    tableName: 'users',
    timestamps: true,
    underscored: true,
  }
);

export default User;
