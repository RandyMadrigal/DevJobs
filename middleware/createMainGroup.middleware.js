import { groups as groupModel } from "../model/groups.model.js";
import { users as userModel } from "../model/users.model.js";
import config from "../config/config.json" assert { type: "json" };

export const mainGroup = async () => {
  try {
    const Main_Group = config.MAIN_GROUP;

    const adminUser = await userModel.findOne({
      where: { userNickName: "ADMIN" },
    });

    const [group, created] = await groupModel.findOrCreate({
      where: { title: Main_Group.title },
      defaults: {
        title: Main_Group.title,
        description: Main_Group.description,
        groupImg: Main_Group.groupImg,
        UserId: adminUser.Id,
      },
    });

    if (created) {
      console.log(`Successfully created an MAIN GROUP`);
    } else {
      console.log("the system have an MAIN GROUP");
    }
  } catch (err) {
    console.error(err);
  }
};
