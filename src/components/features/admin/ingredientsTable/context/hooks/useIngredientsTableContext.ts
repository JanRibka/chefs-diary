import { useContext } from "react";

import { IngredientsTableContext } from "../context";

export function useIngredientsTableContext() {
  const context = useContext(IngredientsTableContext);

  if (!context) {
    throw new Error(
      "useIngredientsTableContext must be used within an IngredientsTableContextProvider"
    );
  }

  return context;
}
