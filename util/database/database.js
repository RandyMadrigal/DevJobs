import { Sequelize } from "sequelize";
import path from "path";

// TODO: crear un archivo .env y agregar las variables de entorno
export const sequelize = new Sequelize("devjobs", "root", "admin", {
  host: "localhost",
  dialect: "mysql",
  port: 3306,
  logging: false,
});