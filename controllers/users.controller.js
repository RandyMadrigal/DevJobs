import { Users as usersModel } from "../model/users.model.js";
import { userType as userTypeModel } from "../model/userType.model.js";
import { validationResult } from "express-validator";
import bcrypt from "bcrypt";
import { sendEmail as transporter } from "../services/EmailService.js";

export const createUser = async (req, res, next) => {
  const err = validationResult(req);
  if (!err.isEmpty()) {
    return res.status(422).json({
      message: "Missing required fields - validation failed",
      errors: err.array(),
    });
  }

  if (!req.file) {
    console.log("bad request - no image");
    //verificar si se envia un archivo en el req
    return res.status(400).json({ message: "Bad request - no image" });
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

  const UserImg = req.file.path.replace("\\", "/");

  //validacion de correo en uso
  try {
    const existingEmail = await usersModel.findOne({ where: { UserEmail } });
    if (existingEmail) {
      return res
        .status(400)
        .json({ message: "Bad request - Email is already in use" });
    }

    //validacion de nickName en uso
    const existingNickName = await usersModel.findOne({
      where: { UserNickName },
    });
    if (existingNickName) {
      return res
        .status(400)
        .json({ message: "Bad request - UserNickName is already in use" });
    }

    //valida si las contraseñas no coinciden
    if (UserPassword !== ConfirmPassword) {
      return res.status(400).json({ message: "Passwords do not match" });
    }

    //validacion del tipo de usuario
    const userType = await userTypeModel.findByPk(userTypeId);
    if (!userType) {
      return res.status(404).json({
        message: "The specified user type does not exist in the database",
      });
    }

    if (userTypeId == 1 || userTypeId === "ADMIN") {
      return res.status(400).json({ message: "The user can't be level ADMIN" });
    }

    //hash password
    const hashUserPassword = await bcrypt.hash(UserPassword, 12);

    const result = await usersModel.create({
      UserName: UserName,
      UserNickName: UserNickName,
      UserLastName: UserLastName,
      UserAddress: UserAddress,
      UserImg: UserImg,
      UserEmail: UserEmail,
      UserPhone: UserPhone,
      UserPassword: hashUserPassword,
      userTypeId: userTypeId,
    });

    console.log(result);

    const sendEmail = await transporter(
      //Enviar correo
      UserEmail,
      process.env.CORREO,
      UserNickName,
      result.Id
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
        message:
          "El Usurario con el ID suministrado no se encuentra en la Base de datos",
      });
    }

    if (findUser.isActive == true) {
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
    console.log("Error al activar el usuario");
    return res.status(500).json({ message: "Internal Server Error" });
  }
};