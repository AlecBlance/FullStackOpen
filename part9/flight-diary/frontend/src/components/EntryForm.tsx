import React from "react";
import diariesService from "../services/diaries";
import { useField } from "../hooks";
import { Entry } from "../types";
import { AxiosError } from "axios";

const EntryForm = ({
  setDiaries,
  diaries,
  setNotification,
}: {
  setDiaries: React.Dispatch<React.SetStateAction<Entry[]>>;
  diaries: Entry[];
  setNotification: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const date = useField("text");
  const visibility = useField("text");
  const weather = useField("text");
  const comment = useField("text");

  const handleEntry = async (e: React.SyntheticEvent): Promise<void> => {
    e.preventDefault();
    try {
      const addedEntry: Entry = await diariesService.addDiary({
        date: date.value,
        visibility: visibility.value,
        weather: weather.value,
        comment: comment.value,
      });
      setDiaries(diaries.concat(addedEntry));
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        setNotification(error.response?.data);
      }
    }
  };

  return (
    <div>
      <form onSubmit={handleEntry}>
        <div>
          date <input {...date} />
        </div>
        <div>
          visibility <input {...visibility} />
        </div>
        <div>
          weather <input {...weather} />
        </div>
        <div>
          comment <input {...comment} />
        </div>
        <button>add</button>
      </form>
    </div>
  );
};
export default EntryForm;
