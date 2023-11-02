import { body, query } from "express-validator";

export const createUserValidation = [
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
];

export const activeUserValidation = [
  query("token").notEmpty().withMessage("Token is required"),
];

export const createSkillValidation = [
  body("skillName").trim().notEmpty().isLength({ min: 5, max: 120 }),
  body("skillShortName").trim().notEmpty().isLength({ min: 5, max: 120 }),
];
