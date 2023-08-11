import { useState } from "react";

export const useField = (type) => {
  const initialValue = "";
  const [value, setValue] = useState(initialValue);

  const onChange = (event) => setValue(event.target.value);

  const clear = () => setValue(initialValue);

  return [
    {
      type,
      onChange,
      value,
    },
    clear,
  ];
};
