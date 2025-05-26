"use client";

import { createContext, ReactNode, useContext, useState } from "react";

import SessionUserType from "@/lib/types/common/SessionUserType";

type UserContext = {
  user: SessionUserType | null;
  setUser: (user: SessionUserType | null) => void;
};

export const UserContext = createContext<UserContext | null>(null);

type Props = {
  children: ReactNode;
};

export function UserContextProvider({ children }: Props) {
  const [user, setUser] = useState<SessionUserType | null>(null);

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
