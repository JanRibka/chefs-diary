"use client";

import { memo } from "react";

import { useSSRSafeTheme } from "@/lib/context/SSRSafeThemeContext";
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
  }: WebNavbarLoginButtonProps) => {
    // SSR-safe theme from context
    const theme = useSSRSafeTheme();

    // PERFORMANCE: Extract hover behavior to custom hook (only focus handlers used)
    const { handleFocusIn, handleFocusOut } = useHoverBehavior(
      hoverOpenTimerRef,
      hoverCloseTimerRef,
      setLoginFlyoutOpen,
      setLoginFlyoutOpenedByHover,
      loginFlyoutOpenedByHover
    );

    // Get styles from tailwind-variants with theme variant
    const styles = loginButtonStyles({
      resolvedTheme: theme,
      isOpen: loginFlyoutOpen,
    });

    return (
      <div
        className={styles.container()}
        onFocus={handleFocusIn}
        onBlur={handleFocusOut}
      >
        <LoginPopoverWrapper
          loginFlyoutOpen={loginFlyoutOpen}
          setLoginFlyoutOpen={setLoginFlyoutOpen}
          setLoginFlyoutOpenedByHover={setLoginFlyoutOpenedByHover}
          loginTriggerRef={loginTriggerRef}
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
