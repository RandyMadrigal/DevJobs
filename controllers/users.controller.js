import { users as usersModel } from "../model/users.model.js";
import { userType as userTypeModel } from "../model/userType.model.js";
import { validationResult } from "express-validator";
import bcrypt from "bcrypt";
import { sendEmail as transporter } from "../services/emailService.js";

export const createUser = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty() || !req.file) {
      return res.status(422).json({ message: "Validation failed" });
    }

    const {
      UserName,
      UserNickName,
      UserLastName,
      UserAddress,
      UserEmail,
      UserPhone,
      UserPassword,
      ConfirmPassword,
      userTypeId,
    } = req.body;

    const [existingEmail, existingNickName] = await Promise.all([
      usersModel.findOne({ where: { UserEmail } }),
      usersModel.findOne({ where: { UserNickName } }),
    ]);

    if (existingEmail || existingNickName || UserPassword !== ConfirmPassword) {
      return res.status(400).json({ message: "Invalid user data" });
    }

    const userType = await userTypeModel.findByPk(userTypeId);
    if (!userType || userTypeId === 1 || userTypeId === "ADMIN") {
      return res.status(400).json({ message: "Invalid user type" });
    }

    const hashUserPassword = await bcrypt.hash(UserPassword, 12);

    const UserImg = req.file.path.replace("\\", "/");

    const result = await usersModel.create({
      UserName,
      UserNickName,
      UserLastName,
      UserAddress,
      UserImg,
      UserEmail,
      UserPhone,
      UserPassword: hashUserPassword,
      userTypeId,
    });

    const sendEmail = await transporter(
      UserEmail,
      `Welcome to DevJobs Community ${UserNickName}`,
      `<h3> Welcome ${UserNickName}<h3> <p>Para activar tu cuenta sigue el siguiente enlace: <a href="http://localhost:8088/Api/users/activeUser/${result.Id}" target="_blank"> ACTIVAR CUENTA </a> <p></p>`
    );

    return res.status(200).json({
      message: "User created successfully",
      EmailResult: sendEmail,
      user: result,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const activeUser = async (req, res, next) => {
  const Id = req.params.Id;

  try {
    const findUser = await usersModel.findByPk(Id);

    if (!findUser) {
      return res.status(404).json({
        message: "User is not found in the database",
      });
    }

    if (findUser.isActive) {
      return res.status(409).json({
        message: "The user is already active",
      });
    }

    const updateUser = await usersModel.update(
      { isActive: true },
      { where: { Id: findUser.Id } }
    );

    return res.status(200).json({
      message: "User Updated successfully",
      updateUser: updateUser.dataValues,
    });
  } catch (error) {
    console.log("Error while activating the user");
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
