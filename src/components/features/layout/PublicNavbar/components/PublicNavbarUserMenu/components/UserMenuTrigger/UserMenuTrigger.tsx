"use client";

import { memo } from 'react';
import { IoSettings } from 'react-icons/io5';

import { Avatar } from '@heroui/react';

import { userMenuTriggerStyles } from './styles/userMenuTriggerStyles';

import type { UserSession } from "../../../../types/UserSession";

interface UserMenuTriggerProps {
  user: UserSession | undefined;
}

/**
 * UserMenuTrigger - Dropdown trigger with user avatar and info
 */
export const UserMenuTrigger = memo(({ user }: UserMenuTriggerProps) => {
  // Get styles from tailwind-variants
  const styles = userMenuTriggerStyles();

  return (
    <div className={styles.container()}>
      <div className={styles.avatarContainer()}>
        <Avatar
          src={user?.image}
          alt={user?.name || "Uživatel"}
          size="md"
          className={styles.avatar()}
        />
        {/* Online indicator */}
        <div className={styles.onlineIndicator()} />
        {/* Glow effect */}
        <div className={styles.glowEffect()} />
      </div>
      <div className={styles.userInfo()}>
        <p className={styles.userName()}>{user?.name}</p>
        <p className={styles.userLevel()}>Kuchař úrovně ⭐⭐⭐</p>
      </div>
      <div className={styles.settingsIconContainer()}>
        <IoSettings className={styles.settingsIcon()} />
      </div>
    </div>
  );
});

UserMenuTrigger.displayName = "UserMenuTrigger";
