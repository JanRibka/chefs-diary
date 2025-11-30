import { memo } from "react";

import { useSSRSafeTheme } from "@/lib/context/SSRSafeThemeContext";
import { useHoverBehavior } from "../WebNavbarLoginButton/hooks/useHoverBehavior";
import { UserPopoverWrapper } from "./components/UserPopoverWrapper/UserPopoverWrapper";
import { userButtonStyles } from "./styles/userButtonStyles";
import { WebNavbarUserButtonProps } from "./types/WebNavbarUserButtonProps";

export const WebNavbarUserButton = memo(
  ({
    user,
    loginFlyoutOpen,
    setLoginFlyoutOpen,
    loginFlyoutOpenedByHover,
    setLoginFlyoutOpenedByHover,
    loginTriggerRef,
    hoverOpenTimerRef,
    hoverCloseTimerRef,
  }: WebNavbarUserButtonProps) => {
    const theme = useSSRSafeTheme();

    // PERFORMANCE: Extract hover behavior to custom hook
    const { handleMouseEnter, handleMouseLeave } = useHoverBehavior(
      hoverOpenTimerRef,
      hoverCloseTimerRef,
      setLoginFlyoutOpen,
      setLoginFlyoutOpenedByHover,
      loginFlyoutOpenedByHover
    );

    // Get styles from tailwind-variants with theme variant
    const styles = userButtonStyles({
      resolvedTheme: theme,
      isOpen: loginFlyoutOpen,
    });

    return (
      <div
        className={styles.container()}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <UserPopoverWrapper
          user={user}
          loginFlyoutOpen={loginFlyoutOpen}
          setLoginFlyoutOpen={setLoginFlyoutOpen}
          setLoginFlyoutOpenedByHover={setLoginFlyoutOpenedByHover}
          loginTriggerRef={loginTriggerRef}
        />

        {/* Subtle glow */}
        <div className={styles.glowEffect()} />
      </div>
    );
  }
);

WebNavbarUserButton.displayName = "WebNavbarUserButton";
