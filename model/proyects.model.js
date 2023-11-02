import { Sequelize, DataTypes } from "sequelize";
import { sequelize } from "../util/database/database.js";

export const proyects = sequelize.define(
  "proyects",
  {
    Id: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4,
    },

    proyectName: {
      type: Sequelize.STRING(120),
      allowNull: false,
    },

    proyectDesc: {
      type: Sequelize.STRING(700),
      allowNull: false,
    },

    proyectUrl: {
      type: Sequelize.STRING(700),
      allowNull: false,
    },

    proyectRepository: {
      type: Sequelize.STRING(700),
      allowNull: false,
    },

    proyectImages: {
      type: Sequelize.STRING(700),
      allowNull: true,
    },
  },

  {
    timestamps: true,
    createdAt: true,
    updatedAt: false, // don't add updateAt attribute
  }
);
