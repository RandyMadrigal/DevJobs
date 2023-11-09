import { Router } from "express";
import * as LoginController from "../controllers/login.controller.js";
import { loginRouteValidation } from "../middleware/routesValidation.middleware.js";

const router = Router();

router.post("/login", loginRouteValidation, LoginController.Login);
router.post("/logout", LoginController.logout);
router.post("/forgot-password", LoginController.forgotPassword);
router.put("/reset-password", LoginController.resetPassword);
export default router;
