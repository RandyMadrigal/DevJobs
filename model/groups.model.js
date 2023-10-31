import { Sequelize, DataTypes } from "sequelize";
import { sequelize } from "../util/database/database.js";

export const groups = sequelize.define(
  "groups",
  {
    Id: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4,
    },

    title: {
      type: Sequelize.STRING,
      allowNull: false,
    },

    description: {
      type: Sequelize.STRING,
      allowNull: false,
    },

    groupImg: {
      type: Sequelize.STRING,
      allowNull: true,
    },
  },

  {
    timestamps: true,
    createdAt: true,
    updatedAt: false, // don't add updateAt attribute
  }
);
