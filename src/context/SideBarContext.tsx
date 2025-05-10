"use client";

import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

const localStorageName = "admin-sidebar-state";

type SideBarContext = {
  opened: boolean;
  setOpen: (value: boolean) => void;
};

export const SideBarContext = createContext<SideBarContext | null>(null);

type Props = {
  children: ReactNode;
};

export function SideBarContextProvider({ children }: Props) {
  const [opened, setOpenedState] = useState<boolean>(false);

  useEffect(() => {
    const stored = localStorage.getItem(localStorageName);

    if (stored !== null) {
      setOpenedState(JSON.parse(stored));
    }
  }, []);

  const setOpen = useCallback((value: boolean) => {
    setOpenedState(value);
    localStorage.setItem(localStorageName, JSON.stringify(value));
  }, []);

  return (
    <SideBarContext.Provider value={{ opened, setOpen }}>
      {children}
    </SideBarContext.Provider>
  );
}

export function useSideBarContext() {
  const context = useContext(SideBarContext);
  if (!context) {
    throw new Error(
      "useSideBarContext must be used within a SideBarContextProvider"
    );
  }

  return context;
}
