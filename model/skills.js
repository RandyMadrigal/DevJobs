const Sequelize = require("sequelize");

const sequelize = require("../util/database/database");

const skills = sequelize.define(
  "skills",
  {
    Id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
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

module.exports = skills;
