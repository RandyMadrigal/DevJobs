import { Router } from "express";
import * as proyectController from "../controllers/proyects.controller.js";
import { createProyectValidation } from "../middleware/routesValidation.middleware.js";

const router = Router();

router.post("/Proyect", proyectController.Proyect);

router.get("/getProyects", proyectController.getProyects);

router.post(
  "/createProyect",
  createProyectValidation,
  proyectController.createProyect
);

router.put("/editProyect", proyectController.editProyect);

router.delete("/deleteProyect", proyectController.deleteProyect);

export default router;
