import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";

const Currency = sequelize.define(
  'Currency',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    currencyName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    currencyCode: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    exchangeRate: {
      type: DataTypes.DECIMAL(10, 4),
      allowNull: false,
    },
  },
);

export default Currency;