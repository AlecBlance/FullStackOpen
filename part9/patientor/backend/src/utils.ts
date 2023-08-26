import { NewPatient } from "./types";

const isString = (text: unknown): text is string => {
  return typeof text === "string" || text instanceof String;
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const parseInput = (input: unknown): string => {
  if (!isString(input) || !input) throw new Error("Incorrect or missing input");
  return input;
};

const parseDateOfBirth = (date: unknown): string => {
  if (!isString(date) || !isDate(date))
    throw new Error("Incorrect or missing date");
  return date;
};

const parsePatientData = (object: unknown): NewPatient => {
  if (!object || typeof object !== "object") {
    throw new Error("Incorrect or missing data");
  }

  if (
    !(
      "name" in object &&
      "dateOfBirth" in object &&
      "ssn" in object &&
      "gender" in object &&
      "occupation" in object
    )
  )
    throw new Error("Incorrect data: a field missing");

  const newPatient: NewPatient = {
    name: parseInput(object.name),
    dateOfBirth: parseDateOfBirth(object.dateOfBirth),
    ssn: parseInput(object.ssn),
    gender: parseInput(object.gender),
    occupation: parseInput(object.occupation),
  };
  return newPatient;
};

export default parsePatientData;
