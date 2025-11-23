/**
 * LoginPopoverWrapperProps - Props interface for LoginPopoverWrapper component
 */
export interface LoginPopoverWrapperProps {
  loginFlyoutOpen: boolean;
  setLoginFlyoutOpen: (open: boolean) => void;
  setLoginFlyoutOpenedByHover: (opened: boolean) => void;
  loginTriggerRef: React.RefObject<HTMLButtonElement | null>;
  resolvedTheme: string | undefined;
  handleFocusIn: () => void;
  handleFocusOut: () => void;
}
