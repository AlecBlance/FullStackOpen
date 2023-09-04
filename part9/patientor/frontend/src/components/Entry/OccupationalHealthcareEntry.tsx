import { Diagnosis, OccupationalHealthcareEntry as Entry } from "../../types";
import WorkIcon from "@mui/icons-material/Work";

const OccupationalHealthcareEntry = ({
  entry,
  diagnoses,
}: {
  entry: Entry;
  diagnoses: Diagnosis[];
}) => {
  return (
    <div
      key={entry.id}
      style={{
        border: "1px solid black",
        borderRadius: "10px",
        padding: "10px",
        marginBottom: "10px",
      }}
    >
      <p style={{ margin: 0 }}>
        {entry.date}
        <WorkIcon />
        {entry.employerName}
      </p>
      <div>
        <i>{entry.description}</i>
      </div>
      <p style={{ margin: 0 }}>diagnosed by {entry.specialist}</p>
      <ul>
        {entry.diagnosisCodes?.map((code) => (
          <li key={code}>
            {code}{" "}
            {diagnoses.find((diagnosis) => diagnosis.code === code)?.name}
          </li>
        ))}
      </ul>
    </div>
  );
};
export default OccupationalHealthcareEntry;
