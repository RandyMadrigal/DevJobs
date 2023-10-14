const usersModel = require("../model/users");
const { validationResult } = require("express-validator");
const bcrypt = require("bcrypt");

exports.createUser = async (req, res, next) => {
  const err = validationResult(req); //valida los campos vacios
  if (!err.isEmpty()) {
    return res.status(422).json({
      message: "Missing required fields - validation failed",
      errors: err.array(),
    });
  }

  const {
    UserName,
    UserNickName,
    UserLastName,
    UserAddress,
    UserImg,
    UserEmail,
    UserPhone,
    UserPassword,
    ConfirmPassword,
    userTypeId,
  } = req.body;

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
      UserEmail: UserImg,
      UserPhone: UserPhone,
      UserPassword: hashUserPassword,
      userTypeId: userTypeId,
    });

    console.log(result);
    return res.status(200).json({
      message: "User created successfully",
      user: result,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal server error" });
  }
};
