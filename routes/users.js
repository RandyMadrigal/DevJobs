const express = require("express");
const { body, check } = require("express-validator");

const router = express.Router();

const userController = require("../controllers/users");

router.post(
  "/createUser",
  [
    body("UserName").trim().notEmpty().isLength({ min: 5, max: 120 }),
    body("UserNickName").trim().notEmpty().isLength({ min: 5, max: 120 }),
    body("UserLastName").trim().notEmpty().isLength({ min: 5, max: 120 }),
    body("UserAddress").notEmpty().isLength({ min: 5, max: 120 }),
    body("UserEmail")
      .trim()
      .notEmpty()
      .isEmail()
      .withMessage("Not a valid Email")
      .isLength({ min: 5, max: 120 }),
    body("UserPhone")
      .trim()
      .notEmpty()
      .withMessage("dont use space, max length 10")
      .isLength({ min: 10, max: 15 }),
    body("UserPassword").trim().notEmpty().isLength({ min: 5, max: 120 }),
    body("ConfirmPassword").trim().notEmpty().isLength({ min: 5, max: 120 }),
  ],
  userController.createUser,

  router.put("/activeUser/:Id", userController.activeUser)
);

exports.router = router;