import { memo } from "react";

import { useHoverBehavior } from "../PublicNavbarLoginButton/hooks/useHoverBehavior";
import { UserPopoverWrapper } from "./components/UserPopoverWrapper/UserPopoverWrapper";
import { userButtonStyles } from "./styles/userButtonStyles";
import { PublicNavbarUserButtonProps } from "./types/PublicNavbarUserButtonProps";

export const PublicNavbarUserButton = memo(
  ({
    user,
    loginFlyoutOpen,
    setLoginFlyoutOpen,
    loginFlyoutOpenedByHover,
    setLoginFlyoutOpenedByHover,
    loginTriggerRef,
    hoverOpenTimerRef,
    hoverCloseTimerRef,
    resolvedTheme,
  }: PublicNavbarUserButtonProps) => {
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
      resolvedTheme: resolvedTheme as "light" | "dark",
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
          resolvedTheme={resolvedTheme}
        />

        {/* Subtle glow */}
        <div className={styles.glowEffect()} />
      </div>
    );
  }
);

PublicNavbarUserButton.displayName = "PublicNavbarUserButton";
