import { ContentProps } from "../types";

const Content = ({ parts }: ContentProps) => {
  return parts.map(({ name, exerciseCount }) => (
    <p>
      {name} {exerciseCount}
    </p>
  ));
};
export default Content;
