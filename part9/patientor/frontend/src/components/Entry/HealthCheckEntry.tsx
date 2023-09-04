import { Diagnosis, HealthCheckEntry as HealthCheck } from "../../types";
import MedicalServicesIcon from "@mui/icons-material/MedicalServices";
import FavoriteIcon from "@mui/icons-material/Favorite";

const HealthCheckEntry = ({
  entry,
  diagnoses,
}: {
  entry: HealthCheck;
  diagnoses: Diagnosis[];
}) => {
  return (
    <div
      key={entry.id}
      style={{
        border: "1px solid black",
        borderRadius: "10px",
        padding: "10px",
      }}
    >
      <p style={{ margin: 0 }}>
        {entry.date}
        <MedicalServicesIcon />
      </p>
      <div>
        <i>{entry.description}</i>
      </div>

      {entry.healthCheckRating ? (
        <FavoriteIcon style={{ color: "yellow" }} />
      ) : (
        <FavoriteIcon style={{ color: "green" }} />
      )}
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
export default HealthCheckEntry;
