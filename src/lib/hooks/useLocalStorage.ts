import { Dispatch, SetStateAction, useEffect, useState } from "react";

import useIsFirstRender from "./useIsFirstRender";

const getLocalValue = (key: string, initValue: unknown) => {
  // SSR Next.js
  if (typeof window === "undefined") return initValue;

  // If a value is already stored
  const localValue = localStorage.getItem(key)
    ? JSON.parse(localStorage.getItem(key) as string)
    : undefined;

  if (localValue) return localValue;

  // Return result of a function
  if (initValue instanceof Function) return initValue();

  return initValue;
};

const useLocalStorage = <T>(
  key: string,
  initValue: T
): [value: T, setValue: Dispatch<SetStateAction<T>>] => {
  // const [value, setValue] = useState<T>(() => getLocalValue(key, initValue));
  const [value, setValue] = useState<T>(initValue);
  const isFirstRender = useIsFirstRender();

  useEffect(() => {
    setValue(getLocalValue(key, initValue));
  }, [key, initValue]);

  useEffect(() => {
    if (isFirstRender) return;

    localStorage.setItem(key, JSON.stringify(value));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key, value]);

  return [value, setValue];
};

export default useLocalStorage;
