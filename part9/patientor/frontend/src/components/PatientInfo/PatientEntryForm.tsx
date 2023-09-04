import patientsService from "../../services/patients";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import { useState } from "react";
import { Patient } from "../../types";
import { EntryWithoutId } from "../../types";
import { AxiosError } from "axios";

const PatientEntryForm = ({
  id,
  setPatient,
  setNotification,
}: {
  id: string;
  setPatient: React.Dispatch<React.SetStateAction<Patient | null>>;
  setNotification: React.Dispatch<React.SetStateAction<string>>;
}) => {
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

  const clear = () => {
    setDescription("");
    setDate("");
    setSpecialist("");
    setDiagnosisCodes("");
    setHealthCheckRating("");
    setEmployerName("");
    setdischargeDate("");
    setCriteria("");
  };

  const handleEntry = async (e: React.SyntheticEvent) => {
    e.preventDefault();

    const commonProperties = {
      description,
      date,
      specialist,
      diagnosisCodes: diagnosisCodes
        ? diagnosisCodes.split(",").map((v) => v.trim())
        : [],
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

    try {
      setPatient(await patientsService.createEntry(id, entry));
      clear();
    } catch (error: unknown) {
      if (error instanceof AxiosError)
        setNotification(error.response?.data.error);
    }
  };

  return (
    <div>
      <Button
        variant="contained"
        style={{ marginRight: "10px" }}
        onClick={() => {
          setIsHospitalVisible(true);
          setOccupationalHealthcare(false);
          setHealthCheck(false);
          setIsFormPresent(true);
          clear();
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
          clear();
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
          clear();
        }}
      >
        New Occupational Healthcare
      </Button>
      <form
        onSubmit={handleEntry}
        style={{
          display: isFormPresent ? "block" : "none",
          border: "2px dotted black",
          padding: "20px",
          marginTop: "10px",
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
            slotProps={{ textField: { fullWidth: true, variant: "standard" } }}
            value={date}
            onChange={(e) => setDate(e ?? "2022-04-17")}
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
                slotProps={{
                  textField: { fullWidth: true, variant: "standard" },
                }}
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
    </div>
  );
};
export default PatientEntryForm;
