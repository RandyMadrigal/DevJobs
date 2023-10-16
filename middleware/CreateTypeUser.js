import {userType as userTypeModel} from "../model/userType.js";
import { USERTYPES } from "../util/config.js";

export const typeUser = async () => {
  try {
    const userTypes = await userTypeModel.findAll();

    if (userTypes.length === 0) {
      const createdUsers = await userTypeModel.bulkCreate(USERTYPES);
      console.log(`Successfully inserted ${createdUsers.length} users types`);
    }
  } catch (err) {
    console.error(err);
  }
};