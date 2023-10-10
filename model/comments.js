const { Sequelize, DataTypes } = require("sequelize");

const sequelize = require("../util/database/database");

const comments = sequelize.define(
  "comments",
  {
    Id: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4,
    },

    description: {
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

module.exports = comments;
