"use client";

import { memo } from "react";

import { User } from "@heroui/react";

import type SessionUserType from "@/lib/types/common/SessionUserType";

interface UserContentProps {
  user: SessionUserType | null;
}

/**
 * UserContent - User avatar and info
 */
export const UserContent = memo(({ user }: UserContentProps) => {
  return (
    <div className="flex">
      <User
        avatarProps={{ radius: "lg", src: user?.image || "" }}
        description={user?.name || "Uživatel"}
        name={user?.name || "Email"}
      />
    </div>
  );
});

UserContent.displayName = "UserContent";
