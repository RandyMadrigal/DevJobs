import { Router } from "express";
import * as proyectController from "../controllers/proyects.controller.js";

const router = Router();

router.post("/Proyect", proyectController.Proyect);

router.get("/getProyects", proyectController.getProyects);

router.post("/createProyect", proyectController.createProyect);

router.put("/editProyect", proyectController.editProyect);

router.delete("/deleteProyect", proyectController.deleteProyect);

export default router;
