const UserTypeModel = require("../model/userType");
const config = require("../util/config");

exports.typeUser = async () => {
  try {
    const userTypes = await UserTypeModel.findAll();

    if (userTypes.length === 0) {
      const createdUsers = await UserTypeModel.bulkCreate(config.USERTYPES);
      console.log(`Successfully inserted ${createdUsers.length} users types`);
    }
  } catch (err) {
    console.error(err);
  }
};
