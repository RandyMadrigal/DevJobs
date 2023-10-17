import { Router } from "express";
import * as LoginController from "../controllers/login.controller.js";

const router = Router();

router.post('/login', LoginController.Login);
router.post('/signup', LoginController.Signup);

export default router;