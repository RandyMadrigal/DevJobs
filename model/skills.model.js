import { Sequelize, DataTypes } from "sequelize";
import { sequelize } from "../util/database/database.js";

export const skills = sequelize.define(
  "skills",
  {
    Id: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4,
    },

    skillName: {
      type: Sequelize.STRING(120),
      allowNull: false,
    },

    skillShortName: {
      type: Sequelize.STRING(10),
      allowNull: false,
    },

    skillIcon: {
      type: Sequelize.STRING(500),
      allowNull: false,
    },

    skillParent: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
  },

  {
    timestamps: true,
    createdAt: true,
    updatedAt: false, // don't add updateAt attribute
  }
);