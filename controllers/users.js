const usersModel = require("../model/users");

exports.createUser = async (req, res, next) => {
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

  if (
    !UserName ||
    !UserNickName ||
    !UserLastName ||
    !UserAddress ||
    !UserImg ||
    !UserEmail ||
    !UserPhone ||
    !UserPassword ||
    !ConfirmPassword ||
    !userTypeId
  ) {
    return res.status(400).json({
      message: "Bad request - Missing required fields",
    });
  }

  try {
    const existingEmail = await usersModel.findOne({ where: { UserEmail } });
    if (existingEmail) {
      return res
        .status(400)
        .json({ message: "Bad request - Email is already in use" });
    }

    const existingNickName = await usersModel.findOne({
      where: { UserNickName },
    });
    if (existingNickName) {
      return res
        .status(400)
        .json({ message: "Bad request - UserNickName is already in use" });
    }

    if (UserPassword !== ConfirmPassword) {
      return res.status(400).json({ message: "Passwords do not match" });
    }

    if (userTypeId == 1 || userTypeId === "ADMIN") {
      return res.status(400).json({ message: "The user can't be level ADMIN" });
    }

    const result = await usersModel.create({
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
