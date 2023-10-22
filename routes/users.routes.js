import { Router } from "express";
import {
  createUserValidation,
  activeUserValidation,
} from "../middleware/routesValidation.middleware.js";
import * as usersController from "../controllers/users.controller.js";

const router = Router();

router.post("/createUser", createUserValidation, usersController.createUser);
router.put("/activeUser", activeUserValidation, usersController.activeUser);

export default router;
