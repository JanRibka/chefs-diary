/**
 * UserButtonTriggerProps - Props interface for UserButtonTrigger component
 */
export interface UserButtonTriggerProps {
  loginTriggerRef: React.RefObject<HTMLButtonElement | null>;
  loginFlyoutOpen: boolean;
  setLoginFlyoutOpen: (open: boolean) => void;
  resolvedTheme: string | undefined;
}
