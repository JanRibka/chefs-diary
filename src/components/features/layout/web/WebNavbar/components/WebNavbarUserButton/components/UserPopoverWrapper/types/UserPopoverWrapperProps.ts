import SessionUserType from "@/lib/types/common/SessionUserType";

/**
 * UserPopoverWrapperProps - Props interface for UserPopoverWrapper component
 */
export interface UserPopoverWrapperProps {
  user: SessionUserType | null;
  loginFlyoutOpen: boolean;
  setLoginFlyoutOpen: (open: boolean) => void;
  setLoginFlyoutOpenedByHover: (opened: boolean) => void;
  loginTriggerRef: React.RefObject<HTMLButtonElement | null>;
}
