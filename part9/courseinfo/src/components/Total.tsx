import { TotalProps } from "../types";

const Total = ({ parts }: TotalProps) => {
  return (
    <p>
      Number of exercises{" "}
      {parts.reduce((carry, part) => carry + part.exerciseCount, 0)}
    </p>
  );
};
export default Total;
