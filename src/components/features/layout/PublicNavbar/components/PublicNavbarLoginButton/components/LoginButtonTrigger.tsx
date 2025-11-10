"use client";

import { memo } from "react";

import { Button, PopoverTrigger } from "@heroui/react";

import { LoginButtonContent } from "./LoginButtonContent";

interface LoginButtonTriggerProps {
  loginTriggerRef: React.RefObject<HTMLButtonElement | null>;
  loginFlyoutOpen: boolean;
  setLoginFlyoutOpen: (open: boolean) => void;
  resolvedTheme: string | undefined;
}

/**
 * LoginButtonTrigger - Popover trigger button
 */
export const LoginButtonTrigger = memo(
  ({
    loginTriggerRef,
    loginFlyoutOpen,
    setLoginFlyoutOpen,
    resolvedTheme,
  }: LoginButtonTriggerProps) => {
    return (
      <PopoverTrigger asChild>
        <Button
          ref={loginTriggerRef}
          variant="bordered"
          size="lg"
          aria-haspopup="dialog"
          aria-expanded={loginFlyoutOpen}
          onPress={() => setLoginFlyoutOpen(!loginFlyoutOpen)}
          className={`hidden sm:flex font-black px-6 py-4 rounded-3xl border-4 transition-all duration-300 hover:scale-110 overflow-hidden relative group cursor-pointer ${
            loginFlyoutOpen ? "scale-110" : ""
          } ${
            resolvedTheme === "dark"
              ? "border-purple-500 hover:border-purple-400 bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 hover:from-purple-500 hover:via-indigo-500 hover:to-blue-500 text-white shadow-2xl shadow-purple-500/60 hover:shadow-purple-400/80"
              : "border-primary hover:border-primary-light bg-gradient-to-r from-primary via-primary-dark to-primary-light hover:from-primary-light hover:via-primary hover:to-primary-dark text-white shadow-2xl shadow-primary/60 hover:shadow-primary/80"
          }`}
        >
          {/* Neon glow layers */}
          <div
            className={`absolute inset-0 rounded-3xl blur-lg opacity-60 group-hover:opacity-85 transition-opacity duration-300 ${
              resolvedTheme === "dark"
                ? "bg-gradient-to-r from-purple-400 via-indigo-400 to-blue-400"
                : "bg-gradient-to-r from-primary/40 via-primary/50 to-primary/60"
            }`}
          />
          <div
            className={`absolute inset-0 rounded-3xl blur-xl opacity-40 group-hover:opacity-60 transition-opacity duration-300 ${
              resolvedTheme === "dark"
                ? "bg-gradient-to-r from-purple-300 via-indigo-300 to-blue-300"
                : "bg-gradient-to-r from-primary/30 via-primary/40 to-primary/50"
            }`}
          />

          <LoginButtonContent resolvedTheme={resolvedTheme} />
        </Button>
      </PopoverTrigger>
    );
  }
);

LoginButtonTrigger.displayName = "LoginButtonTrigger";
