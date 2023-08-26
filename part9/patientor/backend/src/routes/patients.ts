import { Router } from "express";
import patientsService from "../services/patients";

const patientsRouter = Router();

patientsRouter.get("/", (_req, res) => {
  res.json(patientsService.getPatients());
});

export default patientsRouter;
