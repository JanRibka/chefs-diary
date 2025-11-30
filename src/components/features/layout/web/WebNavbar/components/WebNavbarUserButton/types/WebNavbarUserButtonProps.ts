import SessionUserType from "@/lib/types/common/SessionUserType";

/**
 * WebNavbarLoginButtonProps - Props interface for WebNavbarLoginButton component
 */
export interface WebNavbarUserButtonProps {
  user: SessionUserType | null;
  loginFlyoutOpen: boolean;
  setLoginFlyoutOpen: (open: boolean) => void;
  loginFlyoutOpenedByHover: boolean;
  setLoginFlyoutOpenedByHover: (opened: boolean) => void;
  loginTriggerRef: React.RefObject<HTMLButtonElement | null>;
  hoverOpenTimerRef: React.RefObject<number | null>;
  hoverCloseTimerRef: React.RefObject<number | null>;
}
