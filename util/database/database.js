import { Sequelize } from "sequelize";
import path from "path";
import dotenv from "dotenv";

dotenv.config();

export const sequelize = new Sequelize(
  "devjobs",
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: "localhost",
    dialect: "mysql",
    port: 3306,
    logging: false,
  }
);
