"use client";

import { signIn } from "next-auth/react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

/**
 * useNavbarLogin - hook for login popover state and form management
 * Handles login form state, popover control, hover interactions, and form submission
 *
 * @returns object with login state and handlers
 *
 * @example
 * const loginState = useNavbarLogin();
 * <LoginButton {...loginState} />
 */
export const useNavbarLogin = () => {
  const [loginFlyoutOpen, setLoginFlyoutOpen] = useState(false);
  const [loginFlyoutOpenedByHover, setLoginFlyoutOpenedByHover] =
    useState(false);
  const loginTriggerRef = useRef<HTMLButtonElement | null>(null);
  const flyoutFirstInputRef = useRef<HTMLInputElement | null>(null);
  const hoverOpenTimerRef = useRef<number | null>(null);

  // Login form state
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [loginLoading, setLoginLoading] = useState(false);
  const [loginError, setLoginError] = useState<string | null>(null);

  // PERFORMANCE: Focus first input when popover opens and handle Escape key
  useEffect(() => {
    if (!loginFlyoutOpen) return;
    setTimeout(() => flyoutFirstInputRef.current?.focus(), 50);
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setLoginFlyoutOpen(false);
        loginTriggerRef.current?.focus();
      }
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [loginFlyoutOpen]);

  // PERFORMANCE: Reset login form when popover opens
  useEffect(() => {
    if (loginFlyoutOpen) {
      setLoginError(null);
      setLoginEmail("");
      setLoginPassword("");
      setLoginLoading(false);
    }
  }, [loginFlyoutOpen]);

  // PERFORMANCE: useCallback for stable function reference (prevence re-renderů)
  const handleLoginSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      setLoginLoading(true);
      setLoginError(null);
      try {
        const res = (await signIn("credentials", {
          redirect: false,
          email: loginEmail,
          password: loginPassword,
          callbackUrl: window.location.href,
        })) as
          | {
              error?: string;
              ok?: boolean;
              status?: number;
            }
          | undefined
          | void;

        if (res && typeof res === "object" && "error" in res && res.error) {
          setLoginError(res.error || "Neznámá chyba při přihlášení");
          setLoginLoading(false);
          return;
        }

        // Success: close popover
        setLoginLoading(false);
        setLoginFlyoutOpen(false);
      } catch (err: unknown) {
        if (err instanceof Error) setLoginError(err.message);
        else if (typeof err === "string") setLoginError(err);
        else setLoginError("Chyba při přihlášení");
        setLoginLoading(false);
      }
    },
    [loginEmail, loginPassword]
  );

  // PERFORMANCE: useCallback for stable function reference (prevence re-renderů)
  const handleGoogleLogin = useCallback(async () => {
    setLoginLoading(true);
    setLoginError(null);
    try {
      await signIn("google", {
        callbackUrl: window.location.href,
      });
    } catch (err: unknown) {
      if (err instanceof Error) setLoginError(err.message);
      else if (typeof err === "string") setLoginError(err);
      else setLoginError("Chyba při přesměrování na Google");
      setLoginLoading(false);
    }
  }, []);

  // PERFORMANCE: stabilní object reference (prevence re-renderů)
  return useMemo(
    () => ({
      loginFlyoutOpen,
      setLoginFlyoutOpen,
      loginFlyoutOpenedByHover,
      setLoginFlyoutOpenedByHover,
      loginTriggerRef,
      flyoutFirstInputRef,
      hoverOpenTimerRef,
      loginEmail,
      setLoginEmail,
      loginPassword,
      setLoginPassword,
      loginLoading,
      loginError,
      handleLoginSubmit,
      handleGoogleLogin,
    }),
    [
      loginFlyoutOpen,
      loginFlyoutOpenedByHover,
      loginEmail,
      loginPassword,
      loginLoading,
      loginError,
      handleLoginSubmit,
      handleGoogleLogin,
    ]
  );
};
