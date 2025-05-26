"use client";

import { ReactNode, useEffect } from "react";

import { useUserContext } from "@/context/UserContext";
import SessionUserType from "@/lib/types/common/SessionUserType";

type Props = {
  user: SessionUserType | null;
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
