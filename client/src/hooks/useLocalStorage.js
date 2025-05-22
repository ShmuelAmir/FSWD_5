import { useEffect, useState } from "react";

export function useLocalStorage(key, defaultValue = "") {
  const [value, setValue] = useState(() => {
    const exsiting = localStorage.getItem(key);
    if (exsiting) {
      return JSON.parse(exsiting);
    }
    return defaultValue;
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
}
