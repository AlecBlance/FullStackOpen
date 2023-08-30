import { useEffect, useState } from "react";
import Entries from "./components/Entries";
import { Entry } from "./types";
import diariesService from "./services/diaries";
import EntryForm from "./components/EntryForm";

const App = () => {
  const [diaries, setDiaries] = useState<Entry[]>([]);

  useEffect(() => {
    diariesService.getDiaries().then((data) => setDiaries(data));
  }, []);

  return (
    <div>
      <EntryForm diaries={diaries} setDiaries={setDiaries} />
      <Entries diaries={diaries} />
    </div>
  );
};
export default App;
