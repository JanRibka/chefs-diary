"use client";

import { memo } from 'react';
import { IoSettings } from 'react-icons/io5';

import { DropdownItem } from '@heroui/react';

import { userMenuItemsStyles } from './styles/userMenuItemsStyles';

/**
 * UserMenuItems - Main menu navigation items
 */
export const UserMenuItems = memo(() => {
  // Get styles from tailwind-variants
  const styles = userMenuItemsStyles();

  return (
    <>
      <DropdownItem
        key="recipes"
        startContent={
          <div className={styles.recipesIcon()}>
            <span className={styles.recipesIconEmoji()}>👨‍🍳</span>
          </div>
        }
        className={styles.recipesItem()}
      >
        <div className={styles.recipesContent()}>
          <p className={styles.recipesTitle()}>Moje recepty</p>
          <p className={styles.recipesDescription()}>Spravovat vaše recepty</p>
        </div>
      </DropdownItem>

      <DropdownItem
        key="favorites"
        startContent={
          <div className={styles.favoritesIcon()}>
            <span className={styles.favoritesIconEmoji()}>❤️</span>
          </div>
        }
        className={styles.favoritesItem()}
      >
        <div className={styles.favoritesContent()}>
          <p className={styles.favoritesTitle()}>Oblíbené</p>
          <p className={styles.favoritesDescription()}>Uložené recepty</p>
        </div>
      </DropdownItem>

      <DropdownItem
        key="settings"
        startContent={
          <div className={styles.settingsIcon()}>
            <IoSettings className={styles.settingsIconSvg()} />
          </div>
        }
        className={styles.settingsItem()}
      >
        <div className={styles.settingsContent()}>
          <p className={styles.settingsTitle()}>Nastavení</p>
          <p className={styles.settingsDescription()}>
            Upravit profil a předvolby
          </p>
        </div>
      </DropdownItem>
    </>
  );
});

UserMenuItems.displayName = "UserMenuItems";
