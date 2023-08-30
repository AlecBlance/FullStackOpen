import { Entry } from "../types";

const Entries = ({ diaries }: { diaries: Entry[] }) => {
  return (
    <div>
      <h1>Diary entries</h1>
      {diaries.map((diary) => (
        <div>
          <strong>{diary.date}</strong>
          <p>visibility: {diary.visibility}</p>
          <p>weather: {diary.weather}</p>
        </div>
      ))}
    </div>
  );
};
export default Entries;
