const Sequelize = require("sequelize");

const sequelize = require("../util/database/database");

const proyects = sequelize.define(
  "proyects",
  {
    Id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
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
      allowNull: false,
    },
  },

  {
    timestamps: true,
    createdAt: true,
    updatedAt: false, // don't add updateAt attribute
  }
);

module.exports = proyects;
