"use client";

import { useEffect, useMemo, useRef, useState } from "react";

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
  const hoverOpenTimerRef = useRef<number | null>(null);
  const hoverCloseTimerRef = useRef<number | null>(null);

  // PERFORMANCE: Focus first input when popover opens and handle Escape key
  useEffect(() => {
    if (!loginFlyoutOpen) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setLoginFlyoutOpen(false);
        loginTriggerRef.current?.focus();
      }
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [loginFlyoutOpen]);

  // PERFORMANCE: stabilní object reference (prevence re-renderů)
  return useMemo(
    () => ({
      loginFlyoutOpen,
      setLoginFlyoutOpen,
      loginFlyoutOpenedByHover,
      setLoginFlyoutOpenedByHover,
      loginTriggerRef,
      hoverOpenTimerRef,
      hoverCloseTimerRef,
    }),
    [loginFlyoutOpen, loginFlyoutOpenedByHover]
  );
};
