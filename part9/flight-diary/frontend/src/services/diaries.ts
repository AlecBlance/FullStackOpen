import axios from "axios";
import { Entry } from "../types";

const baseUrl: string = "http://localhost:3000/api/diaries";

const getDiaries = async (): Promise<Entry[]> => {
  const result = await axios.get<Entry[]>(baseUrl);
  return result.data;
};

export default { getDiaries };
