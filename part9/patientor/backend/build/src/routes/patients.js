"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const patients_1 = __importDefault(require("../services/patients"));
const utils_1 = __importDefault(require("../utils"));
const patientsRouter = (0, express_1.Router)();
patientsRouter.get("/", (_req, res) => {
    res.json(patients_1.default.getPatients());
});
patientsRouter.post("/", (req, res) => {
    try {
        console.log(req.body);
        const newPatient = (0, utils_1.default)(req.body);
        res.json(patients_1.default.createPatients(newPatient));
    }
    catch (error) {
        let errorMessage = "Something went wrong.";
        if (error instanceof Error) {
            errorMessage += " Error: " + error.message;
        }
        res.status(400).send(errorMessage);
    }
});
exports.default = patientsRouter;
