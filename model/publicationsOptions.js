const Sequelize = require("sequelize");

const sequelize = require("../util/database/database");

const publicationsOptions = sequelize.define(
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

module.exports = publicationsOptions;
