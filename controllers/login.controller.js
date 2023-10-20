import { users as usersModel } from "../model/users.model.js";
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
