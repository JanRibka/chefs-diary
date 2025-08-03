import { useRef } from "react";

export const useInsertUnitGroupModalContent = () => {
  const refUnitName = useRef<HTMLInputElement>(null);

  const clearForm = () => {
    if (refUnitName.current) {
      refUnitName.current.value = "";
    }
  };

  return {
    refUnitName,
    clearForm,
  };
};
