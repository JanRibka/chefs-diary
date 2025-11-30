"use client";

import { memo } from "react";

import { Popover, PopoverContent } from "@heroui/react";

import { LoginButtonTrigger } from "../LoginButtonTrigger/LoginButtonTrigger";
import { LoginFormContent } from "../LoginFormContent";
import { usePopoverState } from "./hooks/usePopoverState";
import { loginPopoverWrapperStyles } from "./styles/loginPopoverWrapperStyles";

import type { LoginPopoverWrapperProps } from "./types/LoginPopoverWrapperProps";

/**
 * LoginPopoverWrapper - Popover container with trigger and content
 */
export const LoginPopoverWrapper = memo(
  ({
    loginFlyoutOpen,
    setLoginFlyoutOpen,
    setLoginFlyoutOpenedByHover,
    loginTriggerRef,
    handleFocusIn,
    handleFocusOut,
  }: LoginPopoverWrapperProps) => {
    // Get styles from tailwind-variants
    const styles = loginPopoverWrapperStyles();

    // PERFORMANCE: Extract popover state logic to custom hook
    const { handleOpenChange } = usePopoverState(
      setLoginFlyoutOpen,
      setLoginFlyoutOpenedByHover
    );

    return (
      <Popover
        isOpen={loginFlyoutOpen}
        onOpenChange={handleOpenChange}
        placement="bottom"
        classNames={{
          base: styles.popoverBase(),
          content: styles.popoverContent(),
        }}
      >
        <LoginButtonTrigger
          loginTriggerRef={loginTriggerRef}
          loginFlyoutOpen={loginFlyoutOpen}
          setLoginFlyoutOpen={setLoginFlyoutOpen}
        />

        <PopoverContent className={styles.content()}>
          <div onFocus={handleFocusIn} onBlur={handleFocusOut}>
            <LoginFormContent />
          </div>
        </PopoverContent>
      </Popover>
    );
  }
);

LoginPopoverWrapper.displayName = "LoginPopoverWrapper";
