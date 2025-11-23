import { UserSession } from "../../../../../types/UserSession";

/**
 * UserPopoverWrapperProps - Props interface for UserPopoverWrapper component
 */
export interface UserPopoverWrapperProps {
  user: UserSession | undefined;
  loginFlyoutOpen: boolean;
  setLoginFlyoutOpen: (open: boolean) => void;
  setLoginFlyoutOpenedByHover: (opened: boolean) => void;
  loginTriggerRef: React.RefObject<HTMLButtonElement | null>;
  resolvedTheme: string | undefined;
}
