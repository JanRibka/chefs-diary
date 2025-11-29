/**
 * LoginState - Login popover state and handlers
 */
export interface LoginState {
  loginFlyoutOpen: boolean;
  setLoginFlyoutOpen: (open: boolean) => void;
  loginFlyoutOpenedByHover: boolean;
  setLoginFlyoutOpenedByHover: (opened: boolean) => void;
  loginTriggerRef: React.RefObject<HTMLButtonElement | null>;
  flyoutFirstInputRef: React.RefObject<HTMLInputElement | null>;
  hoverOpenTimerRef: React.RefObject<number | null>;
  loginEmail: string;
  setLoginEmail: (email: string) => void;
  loginPassword: string;
  setLoginPassword: (password: string) => void;
  loginLoading: boolean;
  loginError: string | null;
  handleLoginSubmit: (e: React.FormEvent) => void;
  handleGoogleLogin: () => void;
}
