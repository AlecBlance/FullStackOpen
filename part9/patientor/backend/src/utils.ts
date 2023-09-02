import { NewPatient, Gender } from "./types";

const isString = (text: unknown): text is string => {
  return typeof text === "string" || text instanceof String;
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const isGender = (gender: string): gender is Gender => {
  return Object.values(Gender)
    .map((v) => v.toString())
    .includes(gender);
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

const parseGender = (gender: unknown): string => {
  if (!isString(gender) || !isGender(gender))
    throw new Error("Incorrect or missing gender");
  return gender;
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
    gender: parseGender(object.gender),
    occupation: parseInput(object.occupation),
    entries: [],
  };
  return newPatient;
};

export default parsePatientData;
