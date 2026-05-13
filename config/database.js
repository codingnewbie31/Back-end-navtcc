import { Sequelize } from "sequelize";

// Create Sequelize instance
const sequelize = new Sequelize("navtech-db", "root", "", {
  host: "localhost",
  dialect: "mysql",
  logging: false,
});

const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");

    await sequelize.sync({ alter: false });
    console.log("Database synced - Tables updated");

    return true;
  } catch (error) {
    console.error("Unable to connect to the database:", error);
    return false;
  }
};

export { sequelize, connectDB };