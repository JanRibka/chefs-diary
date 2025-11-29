"use client";

import { memo } from "react";
import { IoClose, IoMenu } from "react-icons/io5";

import { Button } from "@heroui/react";

import { mobileToggleStyles } from "./styles/mobileToggleStyles";

interface WebNavbarMobileToggleProps {
  mobileOpen: boolean;
  onToggle: () => void;
}

/**
 * WebNavbarMobileToggle - Mobile menu toggle button
 *
 * @param mobileOpen - Whether mobile menu is open
 * @param onToggle - Callback to toggle mobile menu
 *
 * @example
 * <WebNavbarMobileToggle
 *   mobileOpen={false}
 *   onToggle={() => setMobileOpen(!mobileOpen)}
 * />
 */
export const WebNavbarMobileToggle = memo(
  ({ mobileOpen, onToggle }: WebNavbarMobileToggleProps) => {
    // Get styles from tailwind-variants with mobileOpen variant
    const styles = mobileToggleStyles({ mobileOpen });

    return (
      <div className={styles.container()}>
        <Button
          isIconOnly
          variant="light"
          size="lg"
          onPress={onToggle}
          className={styles.button()}
          aria-label="Menu"
        >
          <div className={styles.innerGradient()} />
          <div className={styles.iconContainer()}>
            {mobileOpen ? (
              <IoClose className={styles.closeIcon()} />
            ) : (
              <IoMenu className={styles.menuIcon()} />
            )}
          </div>
          <div className={styles.energyWave()} />
        </Button>
        {/* Animated indicator dots */}
        <div className={styles.indicatorContainer()}>
          <div className={styles.indicatorDot()} />
          <div
            className={styles.indicatorDot()}
            style={{ animationDelay: "0.1s" }}
          />
          <div
            className={styles.indicatorDot()}
            style={{ animationDelay: "0.2s" }}
          />
        </div>
      </div>
    );
  }
);

WebNavbarMobileToggle.displayName = "WebNavbarMobileToggle";
