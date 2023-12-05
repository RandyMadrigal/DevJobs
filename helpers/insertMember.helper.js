import config from "../config/config.json" assert { type: "json" };
import { groups as groupModel } from "../model/groups.model.js";
import { members as memberModel } from "../model/members.model.js";

export const insertMember = async (UserId) => {
  try {
    const group = config.MAIN_GROUP;

    const groupId = await groupModel.findOne({
      where: { Title: group.title },
      attributes: ["Id"],
    });

    await memberModel.create({
      UserId: UserId,
      groupId: groupId.Id,
    });
    console.log("inserted in the main group");
  } catch (err) {
    console.log(err);
  }
};
