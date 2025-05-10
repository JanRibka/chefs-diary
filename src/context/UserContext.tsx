"use client";

import { AdapterUser } from "next-auth/adapters";
import { createContext, ReactNode, useContext, useState } from "react";

type UserContext = {
  user: AdapterUser | null;
  setUser: (user: AdapterUser | null) => void;
};

export const UserContext = createContext<UserContext | null>(null);

type Props = {
  children: ReactNode;
};

export function UserContextProvider({ children }: Props) {
  const [user, setUser] = useState<AdapterUser | null>(null);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUserContext() {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUserContext must be used within a UserContextProvider");
  }

  return context;
}
