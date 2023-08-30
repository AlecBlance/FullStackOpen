import axios from "axios";
import { Entry, NewEntry } from "../types";

const baseUrl: string = "http://localhost:3000/api/diaries";

const getDiaries = async (): Promise<Entry[]> => {
  const result = await axios.get<Entry[]>(baseUrl);
  return result.data;
};

const addDiary = async (data: NewEntry): Promise<Entry> => {
  const result = await axios.post<Entry>(baseUrl, data);
  return result.data;
};

export default { getDiaries, addDiary };
