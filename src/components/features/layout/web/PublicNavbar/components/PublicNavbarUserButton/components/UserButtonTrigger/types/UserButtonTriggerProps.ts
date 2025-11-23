import { UserSession } from "../../../../../types/UserSession";

/**
 * UserButtonTriggerProps - Props interface for UserButtonTrigger component
 */
export interface UserButtonTriggerProps {
  user: UserSession | undefined;
  loginTriggerRef: React.RefObject<HTMLButtonElement | null>;
  loginFlyoutOpen: boolean;
  setLoginFlyoutOpen: (open: boolean) => void;
  resolvedTheme: string | undefined;
}
