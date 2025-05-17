/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { createContext, ReactNode, useCallback, useContext, useEffect, useState } from 'react';

type AccordionContext = {
  listOpenedValue: string;
  setListOpenedValue: (value: string) => void;
};

export const AccordionContext = createContext<AccordionContext | null>(null);

type Props = {
  children: ReactNode;
  localStorageName: string;
};

export function AccordionContextProvider({
  children,
  localStorageName,
}: Props) {
  const [listOpenedValue, setListOpenedValueState] = useState<string>("");

  useEffect(() => {
    const stored = localStorage.getItem(localStorageName);

    if (stored !== null) {
      setListOpenedValueState(stored);
    }
  }, []);

  const setListOpenedValue = useCallback((value: string) => {
    setListOpenedValueState(value);
    localStorage.setItem(localStorageName, JSON.stringify(value));
  }, []);

  return (
    <AccordionContext.Provider value={{ listOpenedValue, setListOpenedValue }}>
      {children}
    </AccordionContext.Provider>
  );
}

export function useAccordionContext() {
  const context = useContext(AccordionContext);
  if (!context) {
    throw new Error(
      "useAccordionContext must be used within a AccordionProvider"
    );
  }

  return context;
}
