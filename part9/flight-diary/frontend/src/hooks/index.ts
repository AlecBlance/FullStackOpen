import React, { useState } from "react";

export const useField = (name: string, type: string) => {
  const [value, setValue] = useState<string>("");

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  return {
    name,
    type,
    value,
    onChange,
  };
};
