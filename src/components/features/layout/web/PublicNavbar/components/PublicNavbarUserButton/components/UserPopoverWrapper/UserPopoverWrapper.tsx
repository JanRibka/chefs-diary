import { Popover, PopoverContent } from "@heroui/react";

import { UserButtonTrigger } from "../UserButtonTrigger/UserButtonTrigger";
import { usePopoverState } from "./hooks/usePopoverState";
import { userPopoverWrapperStyles } from "./styles/userPopoverWrapperStyles";
import { UserPopoverWrapperProps } from "./types/UserPopoverWrapperProps";

export const UserPopoverWrapper = ({
  loginFlyoutOpen,
  setLoginFlyoutOpen,
  setLoginFlyoutOpenedByHover,
  loginTriggerRef,
  resolvedTheme,
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
        loginTriggerRef={loginTriggerRef}
        loginFlyoutOpen={loginFlyoutOpen}
        setLoginFlyoutOpen={setLoginFlyoutOpen}
        resolvedTheme={resolvedTheme}
      />

      <PopoverContent className={styles.content()}>
        <div>Content</div>
      </PopoverContent>
    </Popover>
  );
};
