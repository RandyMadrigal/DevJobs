import { Router } from "express";
import * as publicationController from "../controllers/publications.controller.js";
import { createPublicationValidation } from "../middleware/routesValidation.middleware.js";

const router = Router();

router.post("/Publication", publicationController.Publication);

router.get("/getPublications", publicationController.getPublications);

router.post(
  "/createPublication",
  createPublicationValidation,
  publicationController.createPublication
);

router.put("/editPublication", publicationController.editPublication);

router.delete("/deletePublication", publicationController.deletePublication);

export default router;
