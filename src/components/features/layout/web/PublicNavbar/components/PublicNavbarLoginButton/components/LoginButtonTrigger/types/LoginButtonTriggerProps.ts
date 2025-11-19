/**
 * LoginButtonTriggerProps - Props interface for LoginButtonTrigger component
 */
export interface LoginButtonTriggerProps {
  loginTriggerRef: React.RefObject<HTMLButtonElement | null>;
  loginFlyoutOpen: boolean;
  setLoginFlyoutOpen: (open: boolean) => void;
  resolvedTheme: string | undefined;
}
