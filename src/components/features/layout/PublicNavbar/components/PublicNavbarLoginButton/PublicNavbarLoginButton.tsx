"use client";

import { memo } from "react";

import { LoginPopoverWrapper } from "./components/LoginPopoverWrapper/LoginPopoverWrapper";
import { loginButtonStyles } from "./styles/loginButtonStyles";

interface PublicNavbarLoginButtonProps {
  loginFlyoutOpen: boolean;
  setLoginFlyoutOpen: (open: boolean) => void;
  loginFlyoutOpenedByHover: boolean;
  setLoginFlyoutOpenedByHover: (opened: boolean) => void;
  loginTriggerRef: React.RefObject<HTMLButtonElement | null>;
  flyoutFirstInputRef: React.RefObject<HTMLInputElement | null>;
  hoverOpenTimerRef: React.MutableRefObject<number | null>;
  loginEmail: string;
  setLoginEmail: (email: string) => void;
  loginPassword: string;
  setLoginPassword: (password: string) => void;
  loginLoading: boolean;
  loginError: string | null;
  handleLoginSubmit: (e: React.FormEvent) => void;
  handleGoogleLogin: () => void;
  resolvedTheme: string | undefined;
}

/**
 * PublicNavbarLoginButton - Login button with hover/click popover orchestrator
 *
 * Coordinates hover behavior and popover wrapper component.
 */
export const PublicNavbarLoginButton = memo(
  ({
    loginFlyoutOpen,
    setLoginFlyoutOpen,
    loginFlyoutOpenedByHover,
    setLoginFlyoutOpenedByHover,
    loginTriggerRef,
    flyoutFirstInputRef,
    hoverOpenTimerRef,
    loginEmail,
    setLoginEmail,
    loginPassword,
    setLoginPassword,
    loginLoading,
    loginError,
    handleLoginSubmit,
    handleGoogleLogin,
    resolvedTheme,
  }: PublicNavbarLoginButtonProps) => {
    // Get styles from tailwind-variants with theme variant
    const styles = loginButtonStyles({ resolvedTheme: resolvedTheme as "light" | "dark" });

    return (
      <div
        className={styles.container()}
        onMouseEnter={() => {
          hoverOpenTimerRef.current = window.setTimeout(() => {
            setLoginFlyoutOpen(true);
            setLoginFlyoutOpenedByHover(true);
          }, 150);
        }}
        onMouseLeave={() => {
          if (hoverOpenTimerRef.current) {
            clearTimeout(hoverOpenTimerRef.current);
            hoverOpenTimerRef.current = null;
          }
          if (loginFlyoutOpenedByHover) {
            setLoginFlyoutOpen(false);
            setLoginFlyoutOpenedByHover(false);
          }
        }}
      >
        <LoginPopoverWrapper
          loginFlyoutOpen={loginFlyoutOpen}
          setLoginFlyoutOpen={setLoginFlyoutOpen}
          setLoginFlyoutOpenedByHover={setLoginFlyoutOpenedByHover}
          loginTriggerRef={loginTriggerRef}
          flyoutFirstInputRef={flyoutFirstInputRef}
          loginEmail={loginEmail}
          setLoginEmail={setLoginEmail}
          loginPassword={loginPassword}
          setLoginPassword={setLoginPassword}
          loginLoading={loginLoading}
          loginError={loginError}
          handleLoginSubmit={handleLoginSubmit}
          handleGoogleLogin={handleGoogleLogin}
          resolvedTheme={resolvedTheme}
        />

        {/* Subtle glow */}
        <div className={styles.glowEffect()} />
      </div>
    );
  }
);

PublicNavbarLoginButton.displayName = "PublicNavbarLoginButton";
