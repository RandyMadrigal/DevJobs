//Database models
const usersModel = require("../model/users");
const userTypeModel = require("../model/userType");
const publicationsModel = require("../model/publications");
const skillsModel = require("../model/skills");
const proyectsModel = require("../model/proyects");
const groupsModel = require("../model/groups");
const commentsModel = require("../model/comments");
const publicationsOptionsModel = require("../model/publicationsOptions");
const reactionsTypesModel = require("../model/reactionsTypes");

exports.getDbConnection = (req, res, next) => {
  //Relations in the DB
  usersModel.belongsTo(userTypeModel, {
    constraint: true,
    OnDelete: "CASCADE",
  });
  userTypeModel.hasMany(usersModel);

  skillsModel.belongsTo(usersModel, { constraint: true, OnDelete: "CASCADE" });
  usersModel.hasMany(skillsModel);

  proyectsModel.belongsTo(usersModel, {
    constraint: true,
    OnDelete: "CASCADE",
  });
  usersModel.hasMany(proyectsModel);

  publicationsModel.belongsTo(usersModel, {
    constraint: true,
    OnDelete: "CASCADE",
  });
  usersModel.hasMany(publicationsModel);

  commentsModel.belongsTo(publicationsModel, {
    constraint: true,
    OnDelete: "CASCADE",
  });
  publicationsModel.hasMany(commentsModel);

  commentsModel.belongsTo(usersModel, {
    constraint: true,
    OnDelete: "CASCADE",
  });
  usersModel.hasMany(commentsModel);

  reactionsTypesModel.belongsTo(commentsModel, {
    constraint: true,
    OnDelete: "CASCADE",
  });
  commentsModel.hasMany(reactionsTypesModel);

  reactionsTypesModel.belongsTo(publicationsModel, {
    constraint: true,
    OnDelete: "CASCADE",
  });
  publicationsModel.hasMany(reactionsTypesModel);

  groupsModel.belongsTo(usersModel, {
    constraint: true,
    OnDelete: "CASCADE",
  });
  usersModel.hasMany(groupsModel);

  groupsModel.belongsTo(publicationsModel, {
    constraint: true,
    OnDelete: "CASCADE",
  });
  publicationsModel.hasMany(groupsModel);

  next();
};
