import { useEffect, useState } from "react";
import Entries from "./components/Entries";
import { Entry } from "./types";
import diariesService from "./services/diaries";
import EntryForm from "./components/EntryForm";
import Notification from "./components/Notification";

const App = () => {
  const [diaries, setDiaries] = useState<Entry[]>([]);
  const [notification, setNotification] = useState<string>("");

  useEffect(() => {
    diariesService.getDiaries().then((data) => setDiaries(data));
  }, []);

  return (
    <div>
      <h1>Add new entry</h1>
      <Notification notification={notification} />
      <EntryForm
        diaries={diaries}
        setDiaries={setDiaries}
        setNotification={setNotification}
      />
      <Entries diaries={diaries} />
    </div>
  );
};
export default App;
