import React, { useEffect, useState } from "react";
import patientsService from "../../services/patients";
import { Diagnosis, Patient, Entry } from "../../types";
import TransgenderIcon from "@mui/icons-material/Transgender";
import FemaleIcon from "@mui/icons-material/Female";
import MaleIcon from "@mui/icons-material/Male";
import HospitalEntry from "../Entry/HospitalEntry";
import OccupationalHealthcareEntry from "../Entry/OccupationalHealthcareEntry";
import HealthCheckEntry from "../Entry/HealthCheckEntry";

const PatientInfo = ({
  id,
  diagnoses,
}: {
  id: string | undefined;
  diagnoses: Diagnosis[];
}) => {
  const [patient, setPatient] = useState<Patient | null>(null);

  useEffect(() => {
    if (id) {
      patientsService.find(id).then((data) => {
        setPatient(data);
      });
    }
  }, [id]);

  if (!id || !patient) return null;

  const assertNever = (value: never): never => {
    throw new Error(
      `Unhandled discriminated union member: ${JSON.stringify(value)}`
    );
  };

  const EntryDetails: React.FC<{ entry: Entry }> = ({ entry }) => {
    switch (entry.type) {
      case "Hospital":
        return <HospitalEntry entry={entry} diagnoses={diagnoses} />;
      case "OccupationalHealthcare":
        return (
          <OccupationalHealthcareEntry entry={entry} diagnoses={diagnoses} />
        );
      case "HealthCheck":
        return <HealthCheckEntry entry={entry} diagnoses={diagnoses} />;
      default:
        return assertNever(entry);
    }
  };

  return (
    <div>
      <h1>
        {patient.name}{" "}
        {patient.gender === "male" ? (
          <MaleIcon />
        ) : patient.gender === "female" ? (
          <FemaleIcon />
        ) : (
          <TransgenderIcon />
        )}
      </h1>
      <p>ssn: {patient.ssn}</p>
      <p>occupation: {patient.occupation}</p>
      <h2>entries</h2>
      {patient.entries.map((entry) => (
        <EntryDetails entry={entry} />
      ))}
    </div>
  );
};
export default PatientInfo;
