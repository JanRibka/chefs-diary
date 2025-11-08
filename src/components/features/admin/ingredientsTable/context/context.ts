import { createContext } from "react";

import { IngredientsTableContextValue } from "./types";

export const IngredientsTableContext =
  createContext<IngredientsTableContextValue | null>(null);
