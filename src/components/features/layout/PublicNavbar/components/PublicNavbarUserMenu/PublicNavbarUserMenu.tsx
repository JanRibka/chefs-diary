"use client";

import { memo } from 'react';

import { Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from '@heroui/react';

import { UserMenuHeader } from './components/UserMenuHeader/UserMenuHeader';
import { UserMenuItems } from './components/UserMenuItems/UserMenuItems';
import { UserMenuSignOut } from './components/UserMenuSignOut/UserMenuSignOut';
import { UserMenuTrigger } from './components/UserMenuTrigger/UserMenuTrigger';
import { userMenuStyles } from './styles/userMenuStyles';

import type { UserSession } from "../../types/UserSession";

interface PublicNavbarUserMenuProps {
  user: UserSession | undefined;
}

/**
 * PublicNavbarUserMenu - User dropdown menu orchestrator
 *
 * Coordinates user menu components: trigger, header, items, and sign out.
 *
 * @param {UserSession | undefined} user - Current user session data
 */
export const PublicNavbarUserMenu = memo(
  ({ user }: PublicNavbarUserMenuProps) => {
    // Get styles from tailwind-variants
    const styles = userMenuStyles();

    return (
      <Dropdown placement="bottom-end" className={styles.dropdown()}>
        <DropdownTrigger>
          <UserMenuTrigger user={user} />
        </DropdownTrigger>
        <DropdownMenu
          aria-label="User menu"
          className={styles.dropdownMenu()}
          itemClasses={{
            base: styles.dropdownItemBase(),
          }}
        >
          <UserMenuHeader user={user} />

          <DropdownItem
            key="divider-1"
            className={styles.dividerItem()}
            textValue="Divider"
          >
            <div className={styles.divider()} />
          </DropdownItem>

          <UserMenuItems />

          <DropdownItem
            key="divider-2"
            className={styles.dividerItem()}
            textValue="Divider"
          >
            <div className={styles.divider()} />
          </DropdownItem>

          <UserMenuSignOut />
        </DropdownMenu>
      </Dropdown>
    );
  }
);

PublicNavbarUserMenu.displayName = "PublicNavbarUserMenu";
