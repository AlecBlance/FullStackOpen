"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const types_1 = require("./types");
const isString = (text) => {
    return typeof text === "string" || text instanceof String;
};
const isDate = (date) => {
    return Boolean(Date.parse(date));
};
const isGender = (gender) => {
    return Object.values(types_1.Gender)
        .map((v) => v.toString())
        .includes(gender);
};
const parseInput = (input) => {
    if (!isString(input) || !input)
        throw new Error("Incorrect or missing input");
    return input;
};
const parseDateOfBirth = (date) => {
    if (!isString(date) || !isDate(date))
        throw new Error("Incorrect or missing date");
    return date;
};
const parseGender = (gender) => {
    if (!isString(gender) || !isGender(gender))
        throw new Error("Incorrect or missing gender");
    return gender;
};
const parsePatientData = (object) => {
    if (!object || typeof object !== "object") {
        throw new Error("Incorrect or missing data");
    }
    if (!("name" in object &&
        "dateOfBirth" in object &&
        "ssn" in object &&
        "gender" in object &&
        "occupation" in object))
        throw new Error("Incorrect data: a field missing");
    const newPatient = {
        name: parseInput(object.name),
        dateOfBirth: parseDateOfBirth(object.dateOfBirth),
        ssn: parseInput(object.ssn),
        gender: parseGender(object.gender),
        occupation: parseInput(object.occupation),
    };
    return newPatient;
};
exports.default = parsePatientData;
