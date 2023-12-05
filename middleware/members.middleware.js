import { users as userModel } from "../model/users.model.js";
import { groups as groupModel } from "../model/groups.model.js";
import { members as memberModel } from "../model/members.model.js";
import config from "../config/config.json" assert { type: "json" };

export const members = async () => {
  try {
    const user = config.USERADMIN;
    const group = config.MAIN_GROUP;

    const adminUserId = await userModel.findOne({
      where: { UserName: user.UserName },
      attributes: ["Id"],
    });
    const mainGroupId = await groupModel.findOne({
      where: { Title: group.title },
      attributes: ["Id"],
    });

    await memberModel.findOrCreate({
      where: { userId: adminUserId.Id, groupId: mainGroupId.Id },
    });
  } catch (err) {
    console.log(err);
  }
};
