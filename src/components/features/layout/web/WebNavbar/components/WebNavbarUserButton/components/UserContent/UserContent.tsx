import { memo } from "react";

import { User } from "@heroui/react";

import { UserContentProps } from "./types/UserContentProps";

/**
 * UserContent - User avatar and info
 */
export const UserContent = memo(({ user }: UserContentProps) => {
  return (
    <div>
      <User
        avatarProps={{ radius: "lg", src: user?.image || "" }}
        description={user?.name || "Uživatel"}
        name={user?.name || "Uživatel"}
      />
    </div>
  );
});

UserContent.displayName = "UserContent";
