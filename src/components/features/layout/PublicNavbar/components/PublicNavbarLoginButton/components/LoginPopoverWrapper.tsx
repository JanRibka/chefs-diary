"use client";

import { memo } from "react";

import { Popover, PopoverContent } from "@heroui/react";

import { LoginButtonTrigger } from "./LoginButtonTrigger";
import { LoginFormContent } from "./LoginFormContent";

interface LoginPopoverWrapperProps {
  loginFlyoutOpen: boolean;
  setLoginFlyoutOpen: (open: boolean) => void;
  setLoginFlyoutOpenedByHover: (opened: boolean) => void;
  loginTriggerRef: React.RefObject<HTMLButtonElement | null>;
  flyoutFirstInputRef: React.RefObject<HTMLInputElement | null>;
  loginEmail: string;
  setLoginEmail: (email: string) => void;
  loginPassword: string;
  setLoginPassword: (password: string) => void;
  loginLoading: boolean;
  loginError: string | null;
  handleLoginSubmit: (e: React.FormEvent) => void;
  handleGoogleLogin: () => void;
  resolvedTheme: string | undefined;
}

/**
 * LoginPopoverWrapper - Popover container with trigger and content
 */
export const LoginPopoverWrapper = memo(
  ({
    loginFlyoutOpen,
    setLoginFlyoutOpen,
    setLoginFlyoutOpenedByHover,
    loginTriggerRef,
    flyoutFirstInputRef,
    loginEmail,
    setLoginEmail,
    loginPassword,
    setLoginPassword,
    loginLoading,
    loginError,
    handleLoginSubmit,
    handleGoogleLogin,
    resolvedTheme,
  }: LoginPopoverWrapperProps) => {
    return (
      <Popover
        isOpen={loginFlyoutOpen}
        onOpenChange={(isOpen) => {
          setLoginFlyoutOpen(isOpen);
          if (isOpen) {
            setLoginFlyoutOpenedByHover(false);
          }
        }}
        placement="bottom"
        classNames={{ base: "z-50", content: "z-50" }}
      >
        <LoginButtonTrigger
          loginTriggerRef={loginTriggerRef}
          loginFlyoutOpen={loginFlyoutOpen}
          setLoginFlyoutOpen={setLoginFlyoutOpen}
          resolvedTheme={resolvedTheme}
        />

        <PopoverContent className="w-80 p-0">
          <LoginFormContent
            flyoutFirstInputRef={flyoutFirstInputRef}
            loginEmail={loginEmail}
            setLoginEmail={setLoginEmail}
            loginPassword={loginPassword}
            setLoginPassword={setLoginPassword}
            loginLoading={loginLoading}
            loginError={loginError}
            handleLoginSubmit={handleLoginSubmit}
            handleGoogleLogin={handleGoogleLogin}
          />
        </PopoverContent>
      </Popover>
    );
  }
);

LoginPopoverWrapper.displayName = "LoginPopoverWrapper";
