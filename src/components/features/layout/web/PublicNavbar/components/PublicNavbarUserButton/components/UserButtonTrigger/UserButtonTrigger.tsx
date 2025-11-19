"use client";

import { memo } from "react";

import { Button, PopoverTrigger } from "@heroui/react";

import { useButtonTriggerState } from "./hooks/useButtonTriggerState";
import { loginButtonTriggerStyles } from "./styles/userButtonTriggerStyles";
import { UserButtonTriggerProps } from "./types/UserButtonTriggerProps";

/**
 * UserButtonTrigger - Popover trigger button
 */
export const UserButtonTrigger = memo(
  ({
    loginTriggerRef,
    loginFlyoutOpen,
    setLoginFlyoutOpen,
    resolvedTheme,
  }: UserButtonTriggerProps) => {
    // Get styles from tailwind-variants with theme variant
    const styles = loginButtonTriggerStyles({
      resolvedTheme: resolvedTheme as "light" | "dark",
    });

    // PERFORMANCE: Extract button trigger logic to custom hook
    const { handlePress } = useButtonTriggerState(
      loginFlyoutOpen,
      setLoginFlyoutOpen
    );

    return (
      <PopoverTrigger asChild>
        <Button
          ref={loginTriggerRef}
          variant="bordered"
          size="lg"
          aria-haspopup="dialog"
          aria-expanded={loginFlyoutOpen}
          aria-label={
            loginFlyoutOpen
              ? "Zavřít uživatelské menu"
              : "Otevřít uživatelské menu"
          }
          aria-describedby="user-button-description"
          role="button"
          tabIndex={0}
          data-testid="login-button-trigger"
          onPress={handlePress}
          className={styles.button()}
        >
          {/* Hidden description for screen readers */}
          <span id="user-button-description" className="sr-only">
            Kliknutím otevřete nebo zavřete uživatelské menu. Použijte klávesu
            Enter nebo mezerník pro aktivaci.
          </span>
          {/* Neon glow layers */}
          <div className={styles.glowLayer1()} />
          <div className={styles.glowLayer2()} />
        </Button>
      </PopoverTrigger>
    );
  }
);

UserButtonTrigger.displayName = "UserButtonTrigger";
