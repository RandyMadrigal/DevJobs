import { userType as userTypeModel } from "../model/userType.model.js";
import config from "../config/config.json" assert { type: "json" };

export const typeUser = async () => {
  try {
    const USERTYPES = Object.entries(config.USERTYPES).map(([value]) => ({
      Nombre: value,
    }));

    const userTypes = await userTypeModel.findAll();

    console.log(USERTYPES);

    if (userTypes.length === 0) {
      const createdUsers = await userTypeModel.bulkCreate(USERTYPES);
      if (createdUsers) {
        console.log(`Successfully inserted ${createdUsers.length} users types`);
      } else {
        console.log("Error creating user types");
      }
    }
  } catch (err) {
    console.error(err);
  }
};
