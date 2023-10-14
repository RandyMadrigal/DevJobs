const UserTypeModel = require("../model/userType");
const config = require("../util/config");

exports.typeUser = () => {
  UserTypeModel.findAll()
    .then((userType) => {
      if (userType.length === 0) {
        return UserTypeModel.bulkCreate(config.USERTYPES)
          .then((createdUsers) => {
            console.log(
              `Successfully inserted ${createdUsers.length} users types`
            );
          })
          .catch((err) => {
            console.error(err);
          });
      }
    })
    .catch((err) => {
      console.error(err);
    });
};
