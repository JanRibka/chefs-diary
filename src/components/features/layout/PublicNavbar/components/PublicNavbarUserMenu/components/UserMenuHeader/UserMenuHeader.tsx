"use client";

import { memo } from 'react';
import { HiSparkles } from 'react-icons/hi2';

import { Avatar, DropdownItem } from '@heroui/react';

import { userMenuHeaderStyles } from './styles/userMenuHeaderStyles';

import type { UserSession } from "../../../../types/UserSession";

interface UserMenuHeaderProps {
  user: UserSession | undefined;
}

/**
 * UserMenuHeader - Profile header in dropdown menu
 */
export const UserMenuHeader = memo(({ user }: UserMenuHeaderProps) => {
  // Get styles from tailwind-variants
  const styles = userMenuHeaderStyles();

  return (
    <DropdownItem
      key="profile-header"
      className={styles.dropdownItem()}
      textValue="Profile Header"
    >
      <div className={styles.content()}>
        <div className={styles.avatarContainer()}>
          <Avatar
            src={user?.image}
            alt={user?.name || "Uživatel"}
            size="lg"
            className={styles.avatar()}
          />
          <div className={styles.badge()}>
            <HiSparkles className={styles.badgeIcon()} />
          </div>
        </div>
        <div className={styles.userInfo()}>
          <p className={styles.userName()}>{user?.name}</p>
          <p className={styles.userStatus()}>Aktivní kuchař</p>
          <div className={styles.levelContainer()}>
            <span className={styles.levelBadge()}>⭐ Level 3</span>
          </div>
        </div>
      </div>
    </DropdownItem>
  );
});

UserMenuHeader.displayName = "UserMenuHeader";
