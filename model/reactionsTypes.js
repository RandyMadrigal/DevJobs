const Sequelize = require("sequelize");

const sequelize = require("../util/database/database");

const reactionsTypes = sequelize.define(
  "reactionsTypes",
  {
    Id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },

    isLike: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
    },

    Like: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },

    isFun: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
    },

    Fun: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },

    isDontLike: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
    },

    DontLike: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },

    isConfuce: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
    },

    Confuce: {
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

module.exports = reactionsTypes;
