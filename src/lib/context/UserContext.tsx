"use client";

import { createContext, ReactNode, useContext, useState } from "react";
import type SessionUserType from "../types/common/SessionUserType";

type UserContext = {
  user: SessionUserType | null;
  setUser: (user: SessionUserType | null) => void;
};

export const UserContext = createContext<UserContext | null>(null);

type Props = {
  children: ReactNode;
  initialUser?: SessionUserType | null;
};

export function UserContextProvider({ children, initialUser = null }: Props) {
  const [user, setUser] = useState<SessionUserType | null>(initialUser);

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
