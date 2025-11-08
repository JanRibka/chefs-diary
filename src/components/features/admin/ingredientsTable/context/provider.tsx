"use client";

import { ReactNode, useEffect, useMemo, useReducer } from "react";

import { ADMIN_INGREDIENTS_GRID_NAME } from "@/lib/constants/gridNames";
import useIsFirstRender from "@/lib/hooks/useIsFirstRender";
import {
  loadTableSettings,
  saveTableSettings,
} from "@/lib/utils/tableSettings";
import { SortDescriptor } from "@heroui/react";

import { DEFAULT_SETTINGS } from "./constants";
import { IngredientsTableContext } from "./context";
import { ingredientsTableReducer } from "./reducer";

interface IngredientsTableContextProviderProps {
  children: ReactNode;
}

export function IngredientsTableContextProvider({
  children,
}: IngredientsTableContextProviderProps) {
  const firstRender = useIsFirstRender();

  // Initialize state with useReducer
  const [state, dispatch] = useReducer(ingredientsTableReducer, {
    page: DEFAULT_SETTINGS.page,
    pageSize: DEFAULT_SETTINGS.pageSize,
    sortDescriptor: DEFAULT_SETTINGS.sortDescriptor as SortDescriptor,
  });

  // Load settings on mount
  useEffect(() => {
    const settings = loadTableSettings(
      ADMIN_INGREDIENTS_GRID_NAME,
      DEFAULT_SETTINGS
    );

    dispatch({ type: "LOAD_SETTINGS", payload: settings });
  }, []);

  // Save settings when state changes (except on first render)
  useEffect(() => {
    if (firstRender) return;

    saveTableSettings(ADMIN_INGREDIENTS_GRID_NAME, {
      page: state.page,
      pageSize: state.pageSize,
      sortDescriptor: state.sortDescriptor,
    });
  }, [firstRender, state.page, state.pageSize, state.sortDescriptor]);

  // Memoized action creators
  const actions = useMemo(
    () => ({
      setPage: (value: number) => {
        dispatch({ type: "SET_PAGE", payload: value });
      },
      setPageSize: (value: number) => {
        dispatch({ type: "SET_PAGE_SIZE", payload: value });
      },
      setSortDescriptor: (value: SortDescriptor) => {
        dispatch({ type: "SET_SORT_DESCRIPTOR", payload: value });
      },
    }),
    []
  );

  // Memoized context value
  const contextValue = useMemo(
    () => ({
      state,
      actions,
    }),
    [state, actions]
  );

  return (
    <IngredientsTableContext.Provider value={contextValue}>
      {children}
    </IngredientsTableContext.Provider>
  );
}
