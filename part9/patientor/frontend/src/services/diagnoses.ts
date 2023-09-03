import axios from "axios";
import { Diagnosis } from "../types";

const baseUrl = "http://localhost:3001/api/diagnoses";

const getAllDiagnoses = async (): Promise<Diagnosis[]> => {
  const { data } = await axios.get<Diagnosis[]>(baseUrl);
  return data;
};

// eslint-disable-next-line import/no-anonymous-default-export
export default { getAllDiagnoses };
