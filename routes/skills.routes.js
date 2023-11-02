import { Router } from "express";
import * as skillsController from "../controllers/skills.controller.js";
import { createSkillValidation } from "../middleware/routesValidation.middleware.js";

const router = Router();

router.get("/getSkill/:Id", skillsController.getSkill);

router.get("/getSkills", skillsController.getSkills);

router.post(
  "/createSkill",
  createSkillValidation,
  skillsController.createSkill
);

router.put("/editSkill", skillsController.editSkill);

router.delete("/deleteSkill", skillsController.deleteSkill);

export default router;
