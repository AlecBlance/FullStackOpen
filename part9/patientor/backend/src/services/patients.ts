import { Patient, NewPatient } from "../types";
import patientData from "../../data/patients";
import { v1 as uuid } from "uuid";

const patients: Patient[] = patientData;

const getPatients = (): Omit<Patient, "ssn">[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));
};

const createPatients = (data: NewPatient): Patient => {
  const newPatient: Patient = {
    id: uuid(),
    ...data,
  };

  patients.push(newPatient);

  return newPatient;
};

export default { getPatients, createPatients };
