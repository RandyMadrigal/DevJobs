import { Sequelize, DataTypes } from "sequelize";
import { sequelize } from "../util/database/database.js";

export const members = sequelize.define(
  "members",
  {},
  {
    timestamps: true,
    createdAt: true,
    updatedAt: false, // don't add updateAt attribute
  }
);
