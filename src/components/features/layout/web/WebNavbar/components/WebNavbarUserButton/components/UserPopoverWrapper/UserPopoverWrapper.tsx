"use client";

import { memo } from "react";

import { Popover, PopoverContent } from "@heroui/react";

import { UserButtonTrigger } from "../UserButtonTrigger/UserButtonTrigger";
import { UserMenu } from "../UserMenu";
import { usePopoverState } from "./hooks/usePopoverState";
import { userPopoverWrapperStyles } from "./styles/userPopoverWrapperStyles";
import { UserPopoverWrapperProps } from "./types/UserPopoverWrapperProps";

/**
 * UserPopoverWrapper - Popover container with trigger and user menu
 */
export const UserPopoverWrapper = memo(
  ({
    user,
    loginFlyoutOpen,
    setLoginFlyoutOpen,
    setLoginFlyoutOpenedByHover,
    loginTriggerRef,
  }: UserPopoverWrapperProps) => {
    // Get styles from tailwind-variants
    const styles = userPopoverWrapperStyles();

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
        <UserButtonTrigger
          user={user}
          loginTriggerRef={loginTriggerRef}
          loginFlyoutOpen={loginFlyoutOpen}
          setLoginFlyoutOpen={setLoginFlyoutOpen}
        />

        <PopoverContent
          className={`${styles.content()} bg-transparent border-none shadow-none`}
        >
          <UserMenu />
        </PopoverContent>
      </Popover>
    );
  }
);

UserPopoverWrapper.displayName = "UserPopoverWrapper";
