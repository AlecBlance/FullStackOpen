import { Router } from "express";
import patientsService from "../services/patients";
import { NewPatient } from "../types";
import parsePatientData from "../utils";

const patientsRouter = Router();

patientsRouter.get("/", (_req, res) => {
  res.json(patientsService.getPatients());
});

patientsRouter.get("/:id", (req, res) => {
  const patient = patientsService.getPatient(req.params.id);
  if (!patient) res.status(400);
  res.json(patient);
});

patientsRouter.post("/", (req, res) => {
  try {
    console.log(req.body);
    const newPatient: NewPatient = parsePatientData(req.body);
    res.json(patientsService.createPatients(newPatient));
  } catch (error: unknown) {
    let errorMessage = "Something went wrong.";
    if (error instanceof Error) {
      errorMessage += " Error: " + error.message;
    }
    res.status(400).send(errorMessage);
  }
});

export default patientsRouter;
