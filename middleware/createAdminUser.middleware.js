import { users as userModel } from "../model/users.model.js";
import config from "../config/config.json" assert { type: "json" };
import bcrypt from "bcrypt";

export const adminUser = async () => {
  try {
    const ADMIN_USER = config.USERADMIN;
    const hashPassword = await bcrypt.hash(ADMIN_USER.UserPassword, 12);

    const [user, created] = await userModel.findOrCreate({
      where: { UserNickName: ADMIN_USER.UserNickName },
      defaults: {
        UserName: ADMIN_USER.UserName,
        UserNickName: ADMIN_USER.UserNickName,
        UserLastName: ADMIN_USER.UserLastName,
        UserAddress: ADMIN_USER.UserAddress,
        UserImg: ADMIN_USER.UserImg,
        UserEmail: ADMIN_USER.UserEmail,
        UserPhone: ADMIN_USER.UserPhone,
        UserPassword: hashPassword,
        isActive: ADMIN_USER.isActive,
        userTypeId: ADMIN_USER.userTypeId,
      },
    });

    if (created) {
      console.log(user.dataValues);
      console.log(`Successfully created`);
    } else {
      console.log("the system have an admin user");
    }
  } catch (err) {
    console.error(err);
  }
};
