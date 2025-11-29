"use client";

import { memo, useCallback } from "react";
import { HiMoon, HiSun } from "react-icons/hi";

import Button from "@/components/shared/button/Button";

import { themeToggleStyles } from "./styles/themeToggleStyles";

interface WebNavbarThemeToggleProps {
  mounted: boolean;
  resolvedTheme: string | undefined;
  setTheme: (theme: string) => void;
}

/**
 * WebNavbarThemeToggle - Theme toggle button with animations
 *
 * @param mounted - Whether component is mounted (for SSR)
 * @param resolvedTheme - Current theme ("light" or "dark")
 * @param setTheme - Function to change theme
 *
 * @example
 * <WebNavbarThemeToggle
 *   mounted={true}
 *   resolvedTheme="dark"
 *   setTheme={setTheme}
 * />
 */
export const WebNavbarThemeToggle = memo(
  ({ mounted, resolvedTheme, setTheme }: WebNavbarThemeToggleProps) => {
    // PERFORMANCE: useCallback to prevent unnecessary re-renders
    const handleThemeToggle = useCallback(() => {
      setTheme(resolvedTheme === "dark" ? "light" : "dark");
    }, [resolvedTheme, setTheme]);

    // Get styles from tailwind-variants
    const styles = themeToggleStyles();

    return (
      <div className={styles.container()}>
        <Button
          isIconOnly
          variant="light"
          size="lg"
          onPress={handleThemeToggle}
          className={styles.button()}
          aria-label="Přepnout režim"
        >
          <div className={styles.innerGradient()} />
          <div className={styles.iconContainer()}>
            {/* Render neutral placeholder on server to avoid hydration mismatch */}
            {!mounted ? (
              <span className={styles.placeholder()} aria-hidden />
            ) : resolvedTheme === "light" ? (
              <HiMoon className={styles.moonIcon()} />
            ) : (
              <HiSun className={styles.sunIcon()} />
            )}
          </div>
          <div className={styles.energyWave()} />
        </Button>
        <div className={styles.glowEffect()} />
      </div>
    );
  }
);

// PERFORMANCE: displayName for React DevTools
WebNavbarThemeToggle.displayName = "WebNavbarThemeToggle";
