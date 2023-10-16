require("dotenv").config();

const express = require("express");
const bodyParser = require("body-parser");
const PORT = process.env.PORT || "8080";
const path = require("path");
const sequelize = require("./util/database/database");
const multer = require("multer");
const { v4: uuidv4 } = require("uuid"); //add uuid to a upload file

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

//routes
const userRouter = require("./routes/users");

//Middleware
const CreateUserType = require("./middleware/CreateTypeUser");

const app = express();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "images");
  },
  filename: function (req, file, cb) {
    cb(null, uuidv4() + "-" + file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/jpeg"
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

app.use(bodyParser.json()); //application/json

app.use(multer({ storage: storage, fileFilter: fileFilter }).single("image"));
app.use("/images", express.static(path.join(__dirname, "images"))); //Servir imagenes de manera estatica.

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "OPTIONS, GET, POST, PUT, PATCH, DELETE"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

app.use("/users", userRouter.router);

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

async function startServer() {
  try {
    await sequelize.sync({ force: true });
    await CreateUserType.typeUser();

    app.listen(PORT, () => {
      console.log("Running on port: " + PORT + " xd");
    });
  } catch (err) {
    console.error(err);
  }
}

startServer();
