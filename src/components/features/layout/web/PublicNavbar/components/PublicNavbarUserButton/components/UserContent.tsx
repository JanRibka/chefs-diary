"use client";

import { memo } from "react";

import { UserSession } from "@/components/features/layout/web/PublicNavbar/types/UserSession";
import { User } from "@heroui/react";

interface UserContentProps {
  user: UserSession | undefined;
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
