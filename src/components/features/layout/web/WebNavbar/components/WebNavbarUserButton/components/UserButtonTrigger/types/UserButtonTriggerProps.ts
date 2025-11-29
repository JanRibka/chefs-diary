import SessionUserType from "@/lib/types/common/SessionUserType";

/**
 * UserButtonTriggerProps - Props interface for UserButtonTrigger component
 */
export interface UserButtonTriggerProps {
  user: SessionUserType | null;
  loginTriggerRef: React.RefObject<HTMLButtonElement | null>;
  loginFlyoutOpen: boolean;
  setLoginFlyoutOpen: (open: boolean) => void;
  resolvedTheme: string | undefined;
}
