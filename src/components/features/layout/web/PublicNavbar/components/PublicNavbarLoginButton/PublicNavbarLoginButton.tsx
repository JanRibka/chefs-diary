"use client";

import { memo } from "react";

import { LoginPopoverWrapper } from "./components/LoginPopoverWrapper/LoginPopoverWrapper";
import { useHoverBehavior } from "./hooks/useHoverBehavior";
import { loginButtonStyles } from "./styles/loginButtonStyles";

import type { PublicNavbarLoginButtonProps } from "./types/PublicNavbarLoginButtonProps";

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
    hoverOpenTimerRef,
    hoverCloseTimerRef,
    resolvedTheme,
  }: PublicNavbarLoginButtonProps) => {
    // PERFORMANCE: Extract hover behavior to custom hook
    const { handleMouseEnter, handleMouseLeave } = useHoverBehavior(
      hoverOpenTimerRef,
      hoverCloseTimerRef,
      setLoginFlyoutOpen,
      setLoginFlyoutOpenedByHover,
      loginFlyoutOpenedByHover
    );

    // Get styles from tailwind-variants with theme variant
    const styles = loginButtonStyles({
      resolvedTheme: resolvedTheme as "light" | "dark",
      isOpen: loginFlyoutOpen,
    });

    return (
      <div
        className={styles.container()}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <LoginPopoverWrapper
          loginFlyoutOpen={loginFlyoutOpen}
          setLoginFlyoutOpen={setLoginFlyoutOpen}
          setLoginFlyoutOpenedByHover={setLoginFlyoutOpenedByHover}
          loginTriggerRef={loginTriggerRef}
          resolvedTheme={resolvedTheme}
        />

        {/* Subtle glow */}
        <div className={styles.glowEffect()} />
      </div>
    );
  }
);

PublicNavbarLoginButton.displayName = "PublicNavbarLoginButton";
