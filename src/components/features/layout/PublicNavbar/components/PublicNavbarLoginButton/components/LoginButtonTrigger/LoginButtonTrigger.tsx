"use client";

import { memo } from 'react';

import { Button, PopoverTrigger } from '@heroui/react';

import { LoginButtonContent } from '../LoginButtonContent';
import { loginButtonTriggerStyles } from './styles/loginButtonTriggerStyles';

interface LoginButtonTriggerProps {
  loginTriggerRef: React.RefObject<HTMLButtonElement | null>;
  loginFlyoutOpen: boolean;
  setLoginFlyoutOpen: (open: boolean) => void;
  resolvedTheme: string | undefined;
}

/**
 * LoginButtonTrigger - Popover trigger button
 */
export const LoginButtonTrigger = memo(
  ({
    loginTriggerRef,
    loginFlyoutOpen,
    setLoginFlyoutOpen,
    resolvedTheme,
  }: LoginButtonTriggerProps) => {
    // Get styles from tailwind-variants with theme variant
    const styles = loginButtonTriggerStyles({
      resolvedTheme: resolvedTheme as "light" | "dark",
    });

    return (
      <PopoverTrigger asChild>
        <Button
          ref={loginTriggerRef}
          variant="bordered"
          size="lg"
          aria-haspopup="dialog"
          aria-expanded={loginFlyoutOpen}
          onPress={() => setLoginFlyoutOpen(!loginFlyoutOpen)}
          className={styles.button()}
        >
          {/* Neon glow layers */}
          <div className={styles.glowLayer1()} />
          <div className={styles.glowLayer2()} />

          <LoginButtonContent resolvedTheme={resolvedTheme} />
        </Button>
      </PopoverTrigger>
    );
  }
);

LoginButtonTrigger.displayName = "LoginButtonTrigger";
