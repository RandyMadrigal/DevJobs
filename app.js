import dotenv from "dotenv";
import express from "express";
import bodyParser from "body-parser";
import path from "path";
import { sequelize } from "./util/database/database.js";
import multer from "multer";
import { v4 as uuidv4 } from "uuid";
import { Users as usersModel } from "./model/users.js";
import { userType as userTypeModel } from "./model/userType.js";
import { publications as publicationsModel } from "./model/publications.js";
import { skills as skillsModel } from "./model/skills.js";
import { proyects as proyectsModel } from "./model/proyects.js";
import { groups as groupsModel } from "./model/groups.js";
import { comments as commentsModel } from "./model/comments.js";
import { publicationsOptions as publicationsOptionsModel } from "./model/publicationsOptions.js";
import { reactionsTypes as reactionsTypesModel } from "./model/reactionsTypes.js";
import userRouter from "./routes/users.js";
import { typeUser as CreateUserType } from "./middleware/CreateTypeUser.js";
import { body } from "express-validator";

dotenv.config();
const PORT = process.env.PORT || "8080";
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

app.use(bodyParser.json());
app.use(multer({ storage: storage, fileFilter: fileFilter }).single("image"));
app.use("/images", express.static(path.join(path.dirname(''), "images")));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "OPTIONS, GET, POST, PUT, PATCH, DELETE"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

app.get("/", (req, res) => {
  res.send("Hello World!");
});
app.use("/users", userRouter);

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
    await CreateUserType();

    app.listen(PORT, () => {
      console.log("Running on port: " + PORT);
    });
  } catch (err) {
    console.error(err);
  }
}

startServer();