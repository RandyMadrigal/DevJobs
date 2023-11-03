import { Router } from "express";
import * as publicationController from "../controllers/publications.controller.js";

const router = Router();

router.post("/Publication", publicationController.Publication);

router.get("/getPublications", publicationController.getPublications);

router.post("/createPublication", publicationController.createPublication);

router.put("/editPublication", publicationController.editPublication);

router.delete("/deletePublication", publicationController.deletePublication);

export default router;
