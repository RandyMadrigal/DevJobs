import { Users as usersModel } from "./users.js";
import { userType as userTypeModel } from "./userType.js";
import { publications as publicationsModel } from "./publications.js";
import { skills as skillsModel } from "./skills.js";
import { proyects as proyectsModel } from "./proyects.js";
import { groups as groupsModel } from "./groups.js";
import { comments as commentsModel } from "./comments.js";
import { publicationsOptions as publicationsOptionsModel } from "./publicationsOptions.js";
import { reactionsTypes as reactionsTypesModel } from "./reactionsTypes.js";

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