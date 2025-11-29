"use client";

import { IoSearch } from 'react-icons/io5';

import { Input } from '@heroui/react';

import { mobileSearchSectionStyles } from './styles/mobileSearchSectionStyles';

/**
 * MobileSearchSection - Mobile search input
 */
export const MobileSearchSection = () => {
  // Get styles from tailwind-variants
  const styles = mobileSearchSectionStyles();

  return (
    <div className={styles.container()}>
      <div className={styles.inputContainer()}>
        <Input
          placeholder="Hledat recepty, ingredience..."
          startContent={<IoSearch className={styles.searchIcon()} />}
          classNames={{
            input: styles.input(),
            inputWrapper: styles.inputWrapper(),
          }}
        />
        <div className={styles.glowEffect()} />
      </div>
    </div>
  );
};
