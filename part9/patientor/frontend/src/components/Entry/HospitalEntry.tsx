import { Diagnosis, HospitalEntry as Entry } from "../../types";
import NextWeekIcon from "@mui/icons-material/NextWeek";

const HospitalEntry = ({
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
        <NextWeekIcon />
      </p>
      <div>
        <i>{entry.description}</i>
      </div>
      <p style={{ margin: 0 }}>diagnosed by {entry.specialist}</p>
      <p style={{ margin: 0 }}>
        discharged {entry.discharge.date} with criteria of{" "}
        {entry.discharge.criteria}
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
  );
};
export default HospitalEntry;
