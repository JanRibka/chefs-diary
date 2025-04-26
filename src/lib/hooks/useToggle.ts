import useLocalStorage from "./useLocalStorage";

const useToggle = (
  key: string,
  initValue: boolean
): [value: boolean, toggle: (value: boolean) => void] => {
  const [value, setValue] = useLocalStorage<boolean>(key, initValue);

  const toggle = (value: boolean) => {
    setValue((prev: boolean) => {
      return typeof value === "boolean" ? value : !prev;
    });
  };

  return [value, toggle];
};

export default useToggle;
