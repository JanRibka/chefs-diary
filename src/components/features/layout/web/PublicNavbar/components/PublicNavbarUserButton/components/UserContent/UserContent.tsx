import { memo } from "react";

import { User } from "@heroui/react";

import { UserSession } from "../../../../types/UserSession";
import { userContentStyles } from "./styles/userContentStyles";

interface UserContentProps {
  user: UserSession | undefined;
}

/**
 * UserContent - User avatar and info
 */
export const UserContent = memo(({ user }: UserContentProps) => {
  // Get styles from tailwind-variants
  const styles = userContentStyles();

  return (
    <div className={styles.container()}>
      <User
        avatarProps={{ radius: "lg", src: "" }}
        description={"user.email"}
        name={"user.userName"}
      />
    </div>
  );
});

UserContent.displayName = "UserContent";
