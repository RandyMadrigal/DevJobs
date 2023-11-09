import { Router } from "express";
import * as groupController from "../controllers/groups.controller.js";
import { createGroupValidation } from "../middleware/routesValidation.middleware.js";

const router = Router();

router.get("/getGroups", groupController.getGroups);

router.post("/group", groupController.group);

router.post("/createGroup", createGroupValidation, groupController.createGroup);

router.put("/editGroup", groupController.editGroup);

router.delete("/deleteGroup", groupController.deleteGroup);

export default router;
