import {
  NewPatient,
  Gender,
  Diagnosis,
  BaseEntry,
  HealthCheckRating,
  EntryWithoutId,
  Discharge,
} from "./types";

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

export const parsePatientData = (object: unknown): NewPatient => {
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

const parseDiagnosisCodes = (object: unknown): Array<Diagnosis["code"]> => {
  if (!object || typeof object !== "object" || !("diagnosisCodes" in object)) {
    // we will just trust the data to be in correct form
    return [] as Array<Diagnosis["code"]>;
  }

  return object.diagnosisCodes as Array<Diagnosis["code"]>;
};

const isHealthCheckRating = (
  healthCheckRating: number
): healthCheckRating is HealthCheckRating => {
  return Object.values(HealthCheckRating)
    .map((v) => v.toString())
    .includes(healthCheckRating.toString());
};

const parseHealthCheckRating = (healthCheckRating: unknown): number => {
  if (
    typeof healthCheckRating !== "number" ||
    !isHealthCheckRating(healthCheckRating)
  )
    throw new Error("Incorrect or missing health check rating");
  return healthCheckRating;
};

const isType = (type: unknown): boolean => {
  return (
    isString(type) &&
    ["HealthCheck", "Hospital", "OccupationalHealthcare"].includes(type)
  );
};

const parseDischarge = (discharge: unknown): Discharge => {
  if (
    !discharge ||
    discharge !== Object ||
    !("date" in discharge) ||
    !("criteria" in discharge)
  ) {
    throw new Error("Incorrect or missing data");
  }
  return discharge as Discharge;
};

export const parseEntryData = (object: unknown): EntryWithoutId => {
  if (!object || typeof object !== "object") {
    throw new Error("Incorrect or missing data");
  }

  if (
    !(
      "description" in object &&
      "date" in object &&
      "specialist" in object &&
      "type" in object &&
      "diagnosisCodes" in object
    )
  )
    throw new Error("Incorrect data: a base field missing");

  const newEntryBase: Omit<BaseEntry, "id"> = {
    description: parseInput(object.description),
    date: parseDateOfBirth(object.date),
    specialist: parseInput(object.specialist),
    diagnosisCodes: parseDiagnosisCodes(object),
  };

  if (!isType(object.type)) throw new Error("Incorrect or missing type");

  if (object.type === "HealthCheck") {
    if (!("healthCheckRating" in object))
      throw new Error("Incorrect data: healthCheckRating missing");
    return {
      ...newEntryBase,
      healthCheckRating: parseHealthCheckRating(object.healthCheckRating),
      type: "HealthCheck",
    };
  } else if (object.type === "Hospital") {
    if (!("discharge" in object))
      throw new Error("Incorrect data: discharge missing");
    return {
      ...newEntryBase,
      discharge: parseDischarge(object.discharge),
      type: "Hospital",
    };
  } else {
    if (!("employerName" in object))
      throw new Error("Incorrect data: employerName missing");
    return {
      ...newEntryBase,
      employerName: parseInput(object.employerName),
      type: "OccupationalHealthcare",
    };
  }
};
