import { DataTypes, Model } from "sequelize";
import db from "../db/connection";

interface UserModel {
  id?: string;
  email: string;
  password: string;
}

export class UserSchema extends Model<UserModel> {}

UserSchema.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: { msg: "The email is already taken", name: "email" },
      validate: { notEmpty: { msg: "Please enter the email" } },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: { notEmpty: { msg: "Please enter the password" } },
    },
  },
  { sequelize: db, tableName: "users" }
);
