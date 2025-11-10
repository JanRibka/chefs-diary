"use client";

import { memo } from "react";

import { LoginPopoverWrapper } from "./components/LoginPopoverWrapper";

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
    return (
      <div
        className="relative group"
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
        <div
          className={`absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-60 transition-opacity duration-300 blur-xl scale-110 ${
            resolvedTheme === "dark" ? "bg-purple-500/20" : "bg-primary/20"
          }`}
        />
      </div>
    );
  }
);

PublicNavbarLoginButton.displayName = "PublicNavbarLoginButton";
