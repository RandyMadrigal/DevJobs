import dotenv from "dotenv";
import express from "express";
import bodyParser from "body-parser";
import path from "path";
import { sequelize } from "./util/database/database.js";
import multer from "multer";
import { v4 as uuidv4 } from "uuid";
import userRouter from "./routes/users.routes.js";
import loginRouter from "./routes/login.routes.js";
import skillsRouter from "./routes/skills.routes.js";
import proyectsRouter from "./routes/proyects.routes.js";

import { typeUser as createUserType } from "./middleware/createTypeUser.middleware.js";
import { adminUser as createAdminUser } from "./middleware/createAdminUser.middleware.js";
import { db_relationalas } from "./model/db_relationals.model.js";
import { loginValidator } from "./middleware/loginValidator.middleware.js";
import cors from "cors";
import morgan from "morgan";

dotenv.config();

const PORT = process.env.PORT || "8080";

const app = express();

app.use(morgan("dev"));
app.use(cors());
app.use(bodyParser.json());

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "images"),
  filename: (req, file, cb) => cb(null, uuidv4() + "-" + file.originalname),
});

// TODO: crteate helper function to check if file is an image
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

app.use(multer({ storage: storage, fileFilter: fileFilter }).single("image"));
app.use("/images", express.static(path.join(path.dirname(""), "images")));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "OPTIONS, GET, POST, PUT, PATCH, DELETE"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

app.use("/api/login", loginRouter);
app.use("/api/users", userRouter);
app.use("/api/skills", skillsRouter);
app.use("/api/proyects", proyectsRouter);

db_relationalas();

async function startServer() {
  try {
    await sequelize.sync({ force: false });
    await createUserType();
    await createAdminUser();

    app.listen(PORT, () => {
      console.log("Running on port: " + PORT);
    });
  } catch (err) {
    console.error(err);
  }
}

startServer();
