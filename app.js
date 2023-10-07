require("dotenv").config();

const express = require("express");
const bodyParser = require("body-parser");
const PORT = process.env.PORT || "8080";
const path = require("path");
const sequelize = require("./util/database/database");

//Database models
const usersModel = require("./model/users");
const userTypeModel = require("./model/userType");
const publicationsModel = require("./model/publications");
const skillsModel = require("./model/skills");
const proyectsModel = require("./model/proyects");
const groupsModel = require("./model/groups");
const commentsModel = require("./model/comments");
const publicationsOptionsModel = require("./model/publicationsOptions");
const reactionsTypesModel = require("./model/reactionsTypes");

const app = express();

app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT,PATCH,DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

//Relations in the DB
usersModel.belongsTo(userTypeModel, { constraint: true, OnDelete: "CASCADE" });
userTypeModel.hasMany(usersModel);

skillsModel.belongsTo(usersModel, { constraint: true, OnDelete: "CASCADE" });
usersModel.hasMany(skillsModel);

proyectsModel.belongsTo(usersModel, { constraint: true, OnDelete: "CASCADE" });
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

sequelize
  .sync({ force: true })
  .then((result) => {
    app.listen(PORT, () => {
      console.log("running in port: " + PORT + " xd");
    });
  })
  .catch((err) => {
    console.log(err);
  });
