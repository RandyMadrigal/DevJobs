import { Sequelize, DataTypes } from "sequelize";
import { sequelize } from "../util/database/database.js";

export const users = sequelize.define(
  "Users",
  {
    Id: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4,
    },

    UserName: {
      type: Sequelize.STRING(120),
      allowNull: false,
    },

    UserNickName: {
      type: Sequelize.STRING(120),
      allowNull: false,
    },

    UserLastName: {
      type: Sequelize.STRING(120),
      allowNull: false,
    },

    UserAddress: {
      type: Sequelize.STRING(520),
      allowNull: false,
    },

    UserImg: {
      type: Sequelize.STRING,
      allowNull: true,
    },

    UserEmail: {
      type: Sequelize.STRING(120),
      allowNull: false,
    },

    UserPhone: {
      type: Sequelize.STRING(120),
      allowNull: false,
    },

    UserPassword: {
      type: Sequelize.STRING(520),
      allowNull: false,
    },

    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    token: {
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
