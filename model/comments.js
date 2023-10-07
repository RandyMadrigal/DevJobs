const Sequelize = require("sequelize");

const sequelize = require("../util/database/database");

const comments = sequelize.define(
  "comments",
  {
    Id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
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
