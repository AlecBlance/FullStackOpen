import { useEffect, useState } from "react";
import patientsService from "../../services/patients";
import { Diagnosis, Patient } from "../../types";
import TransgenderIcon from "@mui/icons-material/Transgender";
import FemaleIcon from "@mui/icons-material/Female";
import MaleIcon from "@mui/icons-material/Male";

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
        <div key={entry.id}>
          <p>
            {entry.date}
            <i>{entry.description}</i>
          </p>
          <ul>
            {entry.diagnosisCodes?.map((code) => (
              <li key={code}>
                {code}{" "}
                {diagnoses.find((diagnosis) => diagnosis.code === code)?.name}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};
export default PatientInfo;
