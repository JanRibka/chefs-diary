"use client";

import { memo } from "react";

import { LoginPopoverWrapper } from "./components/LoginPopoverWrapper/LoginPopoverWrapper";
import { useHoverBehavior } from "./hooks/useHoverBehavior";
import { loginButtonStyles } from "./styles/loginButtonStyles";

import type { WebNavbarLoginButtonProps } from "./types/WebNavbarLoginButtonProps";

/**
 * WebNavbarLoginButton - Login button with hover/click popover orchestrator
 *
 * Coordinates hover behavior and popover wrapper component.
 */
export const WebNavbarLoginButton = memo(
  ({
    loginFlyoutOpen,
    setLoginFlyoutOpen,
    loginFlyoutOpenedByHover,
    setLoginFlyoutOpenedByHover,
    loginTriggerRef,
    hoverOpenTimerRef,
    hoverCloseTimerRef,
    resolvedTheme,
  }: WebNavbarLoginButtonProps) => {
    // PERFORMANCE: Extract hover behavior to custom hook
    const {
      handleMouseEnter,
      handleMouseLeave,
      handleFocusIn,
      handleFocusOut,
    } = useHoverBehavior(
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
        onFocus={handleFocusIn}
        onBlur={handleFocusOut}
      >
        <LoginPopoverWrapper
          loginFlyoutOpen={loginFlyoutOpen}
          setLoginFlyoutOpen={setLoginFlyoutOpen}
          setLoginFlyoutOpenedByHover={setLoginFlyoutOpenedByHover}
          loginTriggerRef={loginTriggerRef}
          resolvedTheme={resolvedTheme}
          handleFocusIn={handleFocusIn}
          handleFocusOut={handleFocusOut}
        />

        {/* Subtle glow */}
        <div className={styles.glowEffect()} />
      </div>
    );
  }
);

WebNavbarLoginButton.displayName = "WebNavbarLoginButton";
