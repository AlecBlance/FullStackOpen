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
  const date = useField("date", "text");
  const visibility = useField("visibility", "radio");
  const weather = useField("weather", "radio");
  const comment = useField("comment", "text");

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
          visibility{" "}
          <label>
            great
            <input {...visibility} value="great" />
          </label>
          <label>
            good
            <input {...visibility} value="good" />
          </label>
          <label>
            ok
            <input {...visibility} value="ok" />
          </label>
          <label>
            poor
            <input {...visibility} value="poor" />
          </label>
        </div>
        <div>
          weather{" "}
          <label>
            sunny
            <input {...weather} value="sunny" />
          </label>
          <label>
            rainy
            <input {...weather} value="rainy" />
          </label>
          <label>
            cloudy
            <input {...weather} value="cloudy" />
          </label>
          <label>
            stormy
            <input {...weather} value="stormy" />
          </label>
          <label>
            windy
            <input {...weather} value="windy" />
          </label>
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
