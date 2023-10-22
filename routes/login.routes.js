import { Router } from "express";
import * as LoginController from "../controllers/login.controller.js";

const router = Router();

router.post("/login", LoginController.Login);
router.post("/logout", LoginController.logout);
router.post("/forgot-password", LoginController.forgotPassword);
router.put("/reset-password", LoginController.resetPassword);
export default router;
