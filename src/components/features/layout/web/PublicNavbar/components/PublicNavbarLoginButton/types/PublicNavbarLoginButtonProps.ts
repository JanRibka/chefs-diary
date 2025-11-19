/**
 * PublicNavbarLoginButtonProps - Props interface for PublicNavbarLoginButton component
 */
export interface PublicNavbarLoginButtonProps {
  loginFlyoutOpen: boolean;
  setLoginFlyoutOpen: (open: boolean) => void;
  loginFlyoutOpenedByHover: boolean;
  setLoginFlyoutOpenedByHover: (opened: boolean) => void;
  loginTriggerRef: React.RefObject<HTMLButtonElement | null>;
  hoverOpenTimerRef: React.RefObject<number | null>;
  hoverCloseTimerRef: React.RefObject<number | null>;
  resolvedTheme: string | undefined;
}
