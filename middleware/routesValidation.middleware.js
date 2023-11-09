import { body, query } from "express-validator";

export const loginRouteValidation = [
  body("UserEmail")
    .trim()
    .notEmpty()
    .isEmail()
    .withMessage("not a valid Email")
    .isLength({ min: 5, max: 120 }),
  body("UserPassword").trim().notEmpty().isLength({ min: 5, max: 120 }),
];

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
  body("UserPhone").trim().notEmpty().isLength({ min: 5, max: 20 }),
  body("UserPassword").trim().notEmpty().isLength({ min: 5, max: 120 }),
  body("ConfirmPassword").trim().notEmpty().isLength({ min: 5, max: 120 }),
];

export const activeUserValidation = [
  query("token").notEmpty().withMessage("Token is required"),
];

export const createSkillValidation = [
  body("skillName").trim().notEmpty().isLength({ min: 2, max: 120 }),
  body("skillShortName").trim().notEmpty().isLength({ min: 2, max: 120 }),
  body("skillParent").trim().notEmpty(),
  body("UserId").trim().notEmpty().isLength({ min: 5, max: 120 }),
];

export const createPublicationValidation = [
  body("title").trim().notEmpty().isLength({ min: 2, max: 120 }),
  body("description").trim().notEmpty().isLength({ min: 5, max: 120 }),
  body("requirements").trim().notEmpty().isLength({ min: 5, max: 120 }),
  body("benefits").trim().notEmpty().isLength({ min: 5, max: 120 }),
  body("address").trim().notEmpty().isLength({ min: 5, max: 120 }),
  body("UserId").trim().notEmpty().isLength({ min: 5, max: 120 }),
  body("groupId").trim().notEmpty().isLength({ min: 5, max: 120 }),
];

export const createProyectValidation = [
  body("proyectName").trim().notEmpty().isLength({ min: 2, max: 120 }),
  body("proyectDesc").trim().notEmpty().isLength({ min: 5, max: 120 }),
  body("proyectUrl").trim().notEmpty().isLength({ min: 5, max: 120 }),
  body("proyectRepository").trim().notEmpty().isLength({ min: 5, max: 120 }),
  body("UserId").trim().notEmpty().isLength({ min: 5, max: 120 }),
];

export const createGroupValidation = [
  body("title").trim().notEmpty().isLength({ min: 2, max: 120 }),
  body("description").trim().notEmpty().isLength({ min: 2, max: 120 }),
];

export const createCommentValidation = [
  body("description").trim().notEmpty().isLength({ min: 0, max: 120 }),
  body("UserId").trim().notEmpty().isLength({ min: 2, max: 120 }),
  body("publicationId").trim().notEmpty().isLength({ min: 2, max: 120 }),
];
