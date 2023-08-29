import Content from "./components/Content";
import Header from "./components/Header";
import Total from "./components/Total";
import { CourseParts } from "./types";

const App = () => {
  const courseName: string = "Half Stack application development";
  const courseParts: CourseParts[] = [
    {
      name: "Fundamentals",
      exerciseCount: 10,
    },
    {
      name: "Using props to pass data",
      exerciseCount: 7,
    },
    {
      name: "Deeper type usage",
      exerciseCount: 14,
    },
  ];

  return (
    <div>
      <Header name={courseName} />
      <Content parts={courseParts} />
      <Total parts={courseParts} />
    </div>
  );
};

export default App;
