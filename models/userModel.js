import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js"

const User = sequelize.define(
  'User',
  {
    id: {
        type : DataTypes.INTEGER,
        primaryKey : true,
        autoIncrement : true,

    },
    // Model attributes are defined here
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull : false,
    },

    email: {
      type: DataTypes.STRING,
      allowNull : false,
    },

    password: {
      type: DataTypes.STRING,
      allowNull : false,
    },

    role: {
      type: DataTypes.STRING,
      allowNull : false,
    },

  },
  
);

export default User;