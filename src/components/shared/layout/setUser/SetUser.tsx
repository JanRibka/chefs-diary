"use client";

import { AdapterUser } from "next-auth/adapters";
import { ReactNode, useEffect } from "react";

import { useUserContext } from "@/context/UserContext";

type Props = {
  user: AdapterUser | null;
  children: ReactNode;
};

export default function SetUser({ user, children }: Props) {
  const { setUser } = useUserContext();

  useEffect(() => {
    setUser(user);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  return children;
}
