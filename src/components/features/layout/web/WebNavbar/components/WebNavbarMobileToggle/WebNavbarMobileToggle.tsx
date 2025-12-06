"use client";

import { memo } from "react";
import { Button } from "@heroui/react";

import { mobileToggleStyles } from "./styles/mobileToggleStyles";
import { AnimatedHamburger } from "./components/AnimatedHamburger";
import { mergeStyles } from "@/lib/utils/styles";

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
    // Get styles from tailwind-variants
    const styles = mobileToggleStyles();

    return (
      <div className={styles.container()}>
        <Button
          isIconOnly
          variant="light"
          onPress={onToggle}
          className={styles.button()}
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
        >
          <div className={styles.innerGradient()} />
          <div
            className={mergeStyles(
              styles.iconContainer(),
              "flex items-center justify-center"
            )}
          >
            <AnimatedHamburger isOpen={mobileOpen} />
          </div>
          <div className={styles.energyWave()} />
        </Button>
      </div>
    );
  }
);

WebNavbarMobileToggle.displayName = "WebNavbarMobileToggle";
