const Sequelize = require("sequelize");
const path = require("path"); //para poder accesar a la ruta donde sqlite guarda los archicos (se debe crear una carpeta y un archivo)

//MySql
const sequelize = new Sequelize("devjobs", "root", "123456", {
  host: "localhost",
  dialect: "mysql",
  port: 3306,
  logging: false,
});

module.exports = sequelize;
