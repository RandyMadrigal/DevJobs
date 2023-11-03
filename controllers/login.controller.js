import { users as usersModel } from "../model/users.model.js";
import { skills as skillModel } from "../model/skills.model.js";
import { publications as publicationModel } from "../model/publications.model.js";
import { proyects as proyectsModel } from "../model/proyects.model.js";

import { sendEmail as transporter } from "../services/emailService.js";

import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const secret = process.env.PRIVATE_KEY;

export const Login = async (req, res) => {
  const { UserEmail, UserPassword } = req.body;

  const user = await usersModel.findOne({
    where: {
      UserEmail: UserEmail,
      isActive: true,
    },
    include: [
      { model: skillModel },
      { model: publicationModel },
      { model: proyectsModel },
    ],
  });

  if (!user) {
    res
      .status(200)
      .json({ token: false, user: null, message: "Wrong email or password" });
    return;
  }

  const passwordMatch = await bcrypt.compare(UserPassword, user.UserPassword);

  if (passwordMatch) {
    const token = jwt.sign({ user, exp: 86600 }, secret);
    res.cookie("token", token, { httpOnly: true });

    res
      .status(200)
      .json({ token: token, user: user, message: "Login successful" });
  } else {
    res
      .status(200)
      .json({ token: false, user: null, message: "Wrong email or password" });
  }
};

export const logout = async (req, res) => {
  res.clearCookie("token");

  // TODO: redirect to login page when we have a frontend
  // res.redirect("/login");
  res.status(200).json({ message: "Logout successfully" });
};

export const forgotPassword = async (req, res, next) => {
  const { UserEmail } = req.body;
  try {
    const user = await usersModel.findOne({ where: { UserEmail: UserEmail } });

    if (user) {
      const token = jwt.sign({ UserEmail, expireIn: 600 }, secret);

      const saveToken = await usersModel.update(
        { token: token },
        { where: { UserEmail: UserEmail } }
      );

      const sendEmail = await transporter(
        //TODO: hacer en el frontend un ruta para el cambio de la contraseña
        UserEmail,
        `forgot your password? No problem! ${user.UserNickName}`,
        `
        <ul>
          <li> 
          Link: <a href="http://localhost:4200/session/changePassword">Cambiar contraseña</a>
          </li>
          <li>
          Token: ${token}
          </li>
        </ul>  
        `
      );

      return res.status(200).json({
        message: "Email send",
        token: token,
      });
    } else {
      return res.status(404).json({
        message: "User is not found in the database",
      });
    }
  } catch (err) {
    console.log("Error while activating the user" + err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const resetPassword = async (req, res, next) => {
  const { token, UserPassword, ConfirmPassword } = req.body;

  try {
    if (UserPassword !== ConfirmPassword) {
      return res.status(400).json({ message: "Invalid user data" });
    }

    const decoded = jwt.verify(token, secret);

    const user = await usersModel.findOne({
      where: { UserEmail: decoded.UserEmail },
    });

    if (user) {
      const hashUserPassword = await bcrypt.hash(UserPassword, 12);

      const updateUser = await usersModel.update(
        { UserPassword: hashUserPassword, token: null },
        { where: { Id: user.Id } }
      );

      return res.status(200).json({
        message: "password Updated successfully",
        updateUser: updateUser.dataValues,
      });
    } else {
      return res.status(404).json({
        message: "User is not found in the database",
      });
    }
  } catch (err) {
    console.log("error changing password " + err);

    if (err.name === "TokenExpiredError") {
      return res.status(401).json({ message: "Token Caducado" });
    } else {
      return res
        .status(500)
        .json({ message: "no valid token / Internal Server Error" });
    }
  }
};
