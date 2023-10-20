import { users as usersModel } from "./users.model.js";
import { userType as userTypeModel } from "./userType.model.js";
import { publications as publicationsModel } from "./publications.model.js";
import { skills as skillsModel } from "./skills.model.js";
import { proyects as proyectsModel } from "./proyects.model.js";
import { groups as groupsModel } from "./groups.model.js";
import { comments as commentsModel } from "./comments.model.js";
import { publicationsOptions as publicationsOptionsModel } from "./publicationsOptions.model.js";
import { reactionsTypes as reactionsTypesModel } from "./reactionsTypes.model.js";

export const db_relationalas = () => {
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
};
