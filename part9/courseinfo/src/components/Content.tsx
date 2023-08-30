import { CoursePart } from "../types";
import Part from "./Part";

const Content = ({ parts }: { parts: CoursePart[] }) => {
  return parts.map((part, key) => (
    <div key={key}>
      <strong>
        {part.name} {part.exerciseCount}
      </strong>
      <Part part={part} />
    </div>
  ));
};
export default Content;
