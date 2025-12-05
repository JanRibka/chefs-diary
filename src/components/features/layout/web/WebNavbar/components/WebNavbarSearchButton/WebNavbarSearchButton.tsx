"use client";

import { memo } from "react";
import { IoSearch } from "react-icons/io5";

import { Button } from "@heroui/react";

import { searchButtonStyles } from "./styles/searchButtonStyles";

interface WebNavbarSearchButtonProps {
  onOpen: () => void;
}

/**
 * WebNavbarSearchButton - Search button with enhanced hover effects
 *
 * @param onOpen - Callback to open search modal
 *
 * @example
 * <WebNavbarSearchButton onOpen={() => setSearchOpen(true)} />
 */
export const WebNavbarSearchButton = memo(
  ({ onOpen }: WebNavbarSearchButtonProps) => {
    // Get styles from tailwind-variants
    const styles = searchButtonStyles();

    return (
      <div className={styles.container()}>
        <Button
          isIconOnly
          variant="light"
          size="lg"
          onPress={onOpen}
          className={styles.button()}
          aria-label="Hledat"
        >
          <div className={styles.innerGradient()} />
          <div className={styles.iconContainer()}>
            <IoSearch className={styles.searchIcon()} />
          </div>
          <div className={styles.energyWave()} />
        </Button>
        <div className={styles.glowEffect()} />
      </div>
    );
  }
);

WebNavbarSearchButton.displayName = "WebNavbarSearchButton";
