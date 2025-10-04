import { useContext } from "react";

import { IngredientsTableContext } from "../context";

export function useIngredientsTableContext() {
  const context = useContext(IngredientsTableContext);

  if (!context) {
    throw new Error(
      "useIngredientsTableContext must be used within a IngredientsTableContextProvider"
    );
  }

  return context;
}
