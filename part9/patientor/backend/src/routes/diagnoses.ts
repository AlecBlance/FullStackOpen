import { Router } from "express";
import diagnosesService from "../services/diagnoses";

const diagnosesRouter = Router();

diagnosesRouter.get("/", (_req, res) => {
  res.json(diagnosesService.getDiagnoses());
});

export default diagnosesRouter;
