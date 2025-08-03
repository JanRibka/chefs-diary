import { useRef } from "react";

export const useInsertIngredientGroupModalContent = () => {
  const refIngredientName = useRef<HTMLInputElement>(null);

  const clearForm = () => {
    if (refIngredientName.current) {
      refIngredientName.current.value = "";
    }
  };

  return {
    refIngredientName,
    clearForm,
  };
};
