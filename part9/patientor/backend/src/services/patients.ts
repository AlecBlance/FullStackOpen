import { Patient, NewPatient, NonSensitivePatient } from "../types";
import patientData from "../../data/patients";
import { v1 as uuid } from "uuid";

const patients: Patient[] = patientData;

const getPatients = (): NonSensitivePatient[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));
};

const getPatient = (id: string): Patient | undefined => {
  const patient = patients.find((patient) => patient.id === id);
  return patient;
};

const createPatients = (data: NewPatient): Patient => {
  const newPatient: Patient = {
    id: uuid(),
    ...data,
  };

  patients.push(newPatient);

  return newPatient;
};

export default { getPatients, createPatients, getPatient };
