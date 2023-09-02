import { useEffect, useState } from "react";
import patientsService from "../../services/patients";
import { Patient } from "../../types";
import TransgenderIcon from "@mui/icons-material/Transgender";
import FemaleIcon from "@mui/icons-material/Female";
import MaleIcon from "@mui/icons-material/Male";

const PatientInfo = ({ id }: { id: string | undefined }) => {
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
    </div>
  );
};
export default PatientInfo;
