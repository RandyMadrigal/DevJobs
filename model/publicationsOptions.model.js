import { Sequelize, DataTypes } from "sequelize";
import { sequelize } from "../util/database/database.js";

export const publicationsOptions = sequelize.define(
  "publicationsOptions",
  {
    Id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },

    publicationOptionName: {
      type: Sequelize.STRING(120),
      allowNull: false,
    },
  },

  {
    timestamps: true,
    createdAt: true,
    updatedAt: false, // don't add updateAt attribute
  }
);