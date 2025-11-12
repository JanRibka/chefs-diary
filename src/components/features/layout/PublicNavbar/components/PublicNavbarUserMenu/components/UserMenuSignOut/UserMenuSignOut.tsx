"use client";

import { IoLogOut } from 'react-icons/io5';

import { DropdownItem } from '@heroui/react';

import { userMenuSignOutStyles } from './styles/userMenuSignOutStyles';

/**
 * UserMenuSignOut - Sign out menu item with form
 */
export const UserMenuSignOut = () => {
  // Get styles from tailwind-variants
  const styles = userMenuSignOutStyles();

  return (
    <DropdownItem
      key="signout"
      startContent={
        <div className={styles.iconContainer()}>
          <IoLogOut className={styles.icon()} />
        </div>
      }
      className={styles.dropdownItem()}
    >
      <form action="/api/auth/signout" method="post" className={styles.form()}>
        <button type="submit" className={styles.button()}>
          <div className={styles.content()}>
            <p className={styles.title()}>Odhlásit se</p>
            <p className={styles.description()}>Ukončit relaci</p>
          </div>
        </button>
      </form>
    </DropdownItem>
  );
};
