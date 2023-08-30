import { useEffect, useState } from "react";
import Entries from "./components/Entries";
import { Entry } from "./types";
import diariesService from "./services/diaries";

const App = () => {
  const [diaries, setDiaries] = useState<Entry[]>([]);

  useEffect(() => {
    diariesService.getDiaries().then((data) => setDiaries(data));
  }, []);

  return <Entries diaries={diaries} />;
};
export default App;
