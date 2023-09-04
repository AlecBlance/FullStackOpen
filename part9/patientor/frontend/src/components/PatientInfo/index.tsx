import React, { useEffect, useState } from "react";
import patientsService from "../../services/patients";
import { Diagnosis, Patient, Entry } from "../../types";
import TransgenderIcon from "@mui/icons-material/Transgender";
import FemaleIcon from "@mui/icons-material/Female";
import MaleIcon from "@mui/icons-material/Male";
import HospitalEntry from "../Entry/HospitalEntry";
import OccupationalHealthcareEntry from "../Entry/OccupationalHealthcareEntry";
import HealthCheckEntry from "../Entry/HealthCheckEntry";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import { EntryWithoutId } from "../../types";

const PatientInfo = ({
  id,
  diagnoses,
}: {
  id: string | undefined;
  diagnoses: Diagnosis[];
}) => {
  const [patient, setPatient] = useState<Patient | null>(null);
  const [isHospitalVisible, setIsHospitalVisible] = useState<boolean>(false);
  const [isHealthCheck, setHealthCheck] = useState<boolean>(false);
  const [isOccupationalHealthcare, setOccupationalHealthcare] =
    useState<boolean>(false);
  const [isFormPresent, setIsFormPresent] = useState<boolean>(false);

  const [description, setDescription] = useState<string>("");
  const [date, setDate] = useState<string>("");
  const [specialist, setSpecialist] = useState<string>("");
  const [diagnosisCodes, setDiagnosisCodes] = useState<string>("");
  const [healthCheckRating, setHealthCheckRating] = useState<string>("");
  const [employerName, setEmployerName] = useState<string>("");
  const [dischargeDate, setdischargeDate] = useState<string>("");
  const [criteria, setCriteria] = useState<string>("");

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

  const handleEntry = async (e: React.SyntheticEvent) => {
    e.preventDefault();

    const commonProperties = {
      description,
      date,
      specialist,
      diagnosisCodes: diagnosisCodes.split(",").map((v) => v.trim()),
    };

    let entry: EntryWithoutId | null = null;

    if (isHealthCheck) {
      entry = {
        ...commonProperties,
        healthCheckRating: parseInt(healthCheckRating),
        type: "HealthCheck",
      };
    } else if (isHospitalVisible) {
      entry = {
        ...commonProperties,
        discharge: { date: dischargeDate, criteria },
        type: "Hospital",
      };
    } else if (isOccupationalHealthcare) {
      entry = {
        ...commonProperties,
        employerName,
        type: "OccupationalHealthcare",
      };
    }

    if (!entry) return;

    setPatient(await patientsService.createEntry(patient.id, entry));
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
      <Button
        variant="contained"
        style={{ marginRight: "10px" }}
        onClick={() => {
          setIsHospitalVisible(true);
          setOccupationalHealthcare(false);
          setHealthCheck(false);
          setIsFormPresent(true);
        }}
      >
        New Hospital
      </Button>
      <Button
        variant="contained"
        style={{ marginRight: "10px" }}
        onClick={() => {
          setIsHospitalVisible(false);
          setOccupationalHealthcare(false);
          setHealthCheck(true);
          setIsFormPresent(true);
        }}
      >
        New HealthCheck
      </Button>
      <Button
        variant="contained"
        onClick={() => {
          setIsHospitalVisible(false);
          setOccupationalHealthcare(true);
          setHealthCheck(false);
          setIsFormPresent(true);
        }}
      >
        New Occupational Healthcare
      </Button>
      <form
        onSubmit={handleEntry}
        style={{
          display: isFormPresent ? "block" : "none",
          margin: "10px",
        }}
      >
        <TextField
          id="standard-helperText"
          label="Description"
          variant="standard"
          style={{ width: "100%", marginBottom: "10px" }}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            label="Date"
            slotProps={{ textField: { fullWidth: true } }}
            value={date}
            onChange={(e) => setDate(e ?? "")}
          />
        </LocalizationProvider>
        <TextField
          id="standard-helperText"
          label="Specialist"
          variant="standard"
          style={{ width: "100%", marginBottom: "10px" }}
          value={specialist}
          onChange={(e) => setSpecialist(e.target.value)}
        />
        <TextField
          id="standard-helperText"
          label="Diagnosis Codes"
          variant="standard"
          style={{ width: "100%", marginBottom: "10px" }}
          value={diagnosisCodes}
          onChange={(e) => setDiagnosisCodes(e.target.value)}
        />
        {isHealthCheck && (
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">
              Health Check Rating
            </InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              label="Health Check Rating"
              value={healthCheckRating}
              onChange={(e) => setHealthCheckRating(e.target.value)}
            >
              <MenuItem value={0}>Healthy</MenuItem>
              <MenuItem value={1}>Low Risk</MenuItem>
              <MenuItem value={2}>High Risk</MenuItem>
              <MenuItem value={3}>Critical Risk</MenuItem>
            </Select>
          </FormControl>
        )}
        {isHospitalVisible && (
          <>
            <p>Discharge:</p>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label="Date"
                slotProps={{ textField: { fullWidth: true } }}
                value={dischargeDate}
                onChange={(e) => setdischargeDate(e ?? "")}
              />
            </LocalizationProvider>
            <TextField
              id="standard-helperText"
              label="Criteria"
              variant="standard"
              style={{ width: "100%", marginBottom: "10px" }}
              value={criteria}
              onChange={(e) => setCriteria(e.target.value)}
            />
          </>
        )}
        {isOccupationalHealthcare && (
          <TextField
            id="standard-helperText"
            label="Employer Name"
            variant="standard"
            style={{ width: "100%", marginBottom: "10px" }}
            value={employerName}
            onChange={(e) => setEmployerName(e.target.value)}
          />
        )}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: "10px",
          }}
        >
          <Button
            variant="contained"
            color="error"
            onClick={() => {
              setIsFormPresent(false);
            }}
          >
            Cancel
          </Button>
          <Button variant="contained" type="submit">
            Add
          </Button>
        </div>
      </form>
      <h2>entries</h2>
      {patient.entries.map((entry) => (
        <EntryDetails entry={entry} />
      ))}
    </div>
  );
};
export default PatientInfo;
