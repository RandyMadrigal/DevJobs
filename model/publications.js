const Sequelize = require("sequelize");

const sequelize = require("../util/database/database");

const publications = sequelize.define(
  "publications",
  {
    Id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },

    title: {
      type: Sequelize.STRING(120),
      allowNull: false,
    },

    description: {
      type: Sequelize.STRING(120),
      allowNull: false,
    },

    requirements: {
      type: Sequelize.STRING(120),
      allowNull: false,
    },

    benefits: {
      type: Sequelize.STRING(120),
      allowNull: false,
    },

    address: {
      type: Sequelize.STRING(120),
      allowNull: false,
    },

    publicationsImg: {
      type: Sequelize.STRING,
      allowNull: false,
    },
  },

  {
    timestamps: true,
    createdAt: true,
    updatedAt: false, // don't add updateAt attribute
  }
);

module.exports = publications;
