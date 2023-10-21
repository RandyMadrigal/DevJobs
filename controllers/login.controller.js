import { users as usersModel } from "../model/users.model.js";
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
  });

  if (!user) {
    res.status(400).json({ message: "Wrong email or password" });
    return;
  }

  const passwordMatch = await bcrypt.compare(UserPassword, user.UserPassword);

  if (passwordMatch) {
    const token = jwt.sign({ user, exp: 86600 }, secret);
    res.cookie("token", token, { httpOnly: true });
    res.status(200).json({ token: token });
  } else {
    res.status(400).json({ message: "Wrong email or password" });
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
      const sendEmail = await transporter(
        UserEmail,
        `forgot your password? No problem! ${user.UserNickName}`,
        `<p>To change your password enter the following code: ${user.Id}</p>`
      );
      return res.status(200).json({
        message: "code sent to email",
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
  const { code, UserPassword, ConfirmPassword } = req.body;

  try {
    if (UserPassword !== ConfirmPassword) {
      return res.status(400).json({ message: "Invalid user data" });
    }

    const user = usersModel.findOne({ where: { Id: code } });
    if (user) {
      const hashUserPassword = await bcrypt.hash(UserPassword, 12);

      const updateUser = await usersModel.update(
        { UserPassword: hashUserPassword },
        { where: { Id: code } }
      );

      return res.status(200).json({
        message: "User Updated successfully",
        updateUser: updateUser.dataValues,
      });
    } else {
      return res.status(404).json({
        message: "User is not found in the database",
      });
    }
  } catch (err) {
    console.log("error changing password" + err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
