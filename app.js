require("dotenv").config();

const express = require("express");
const bodyParser = require("body-parser");
const PORT = process.env.PORT || "8080";
const path = require("path");
const sequelize = require("./util/database/database");

//routes

//db connection middleware
const sequelizeConnection = require("./middleware/connection");

const app = express();

app.use(bodyParser.json()); //application/json

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT,PATCH,DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");

  next();
});

//Relations in the DB
app.use(sequelizeConnection.getDbConnection);

sequelize
  .sync()
  .then((result) => {
    app.listen(PORT, () => {
      console.log("running in port: " + PORT + " xd");
    });
  })
  .catch((err) => {
    console.log(err);
  });
