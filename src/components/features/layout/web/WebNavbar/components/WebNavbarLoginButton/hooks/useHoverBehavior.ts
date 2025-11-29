import { useCallback, useState } from "react";

import { HOVER_TIMING } from "../constants/hoverTiming";

/**
 * useHoverBehavior - Hook for managing hover open/close behavior with focus management
 *
 * @param hoverOpenTimerRef - Reference to hover open timer
 * @param hoverCloseTimerRef - Reference to hover close timer
 * @param setLoginFlyoutOpen - Function to set login flyout open state
 * @param setLoginFlyoutOpenedByHover - Function to set hover opened state
 * @param loginFlyoutOpenedByHover - Current hover opened state
 * @returns Object with hover and focus handlers
 */
export const useHoverBehavior = (
  hoverOpenTimerRef: React.RefObject<number | null>,
  hoverCloseTimerRef: React.RefObject<number | null>,
  setLoginFlyoutOpen: (open: boolean) => void,
  setLoginFlyoutOpenedByHover: (opened: boolean) => void,
  loginFlyoutOpenedByHover: boolean
) => {
  // Track focus state to prevent closing when user is interacting with form
  const [hasFocus, setHasFocus] = useState(false);

  // PERFORMANCE: useCallback - stable function reference (prevence re-renderů child komponent)
  const handleMouseEnter = useCallback(() => {
    // Cancel any pending close timer
    if (hoverCloseTimerRef.current) {
      clearTimeout(hoverCloseTimerRef.current);
      hoverCloseTimerRef.current = null;
    }

    hoverOpenTimerRef.current = window.setTimeout(() => {
      setLoginFlyoutOpen(true);
      setLoginFlyoutOpenedByHover(true);
    }, HOVER_TIMING.OPEN_DELAY);
  }, [
    hoverCloseTimerRef,
    hoverOpenTimerRef,
    setLoginFlyoutOpen,
    setLoginFlyoutOpenedByHover,
  ]);

  // PERFORMANCE: useCallback - stable function reference (prevence re-renderů child komponent)
  const handleMouseLeave = useCallback(() => {
    if (hoverOpenTimerRef.current) {
      clearTimeout(hoverOpenTimerRef.current);
      hoverOpenTimerRef.current = null;
    }
    if (loginFlyoutOpenedByHover && !hasFocus) {
      // Delay closing by configured delay to prevent accidental closes
      hoverCloseTimerRef.current = window.setTimeout(() => {
        setLoginFlyoutOpen(false);
        setLoginFlyoutOpenedByHover(false);
      }, HOVER_TIMING.CLOSE_DELAY);
    }
  }, [
    hoverOpenTimerRef,
    hoverCloseTimerRef,
    loginFlyoutOpenedByHover,
    setLoginFlyoutOpen,
    setLoginFlyoutOpenedByHover,
    hasFocus,
  ]);

  // PERFORMANCE: useCallback - stable function reference
  const handleFocusIn = useCallback(() => {
    setHasFocus(true);
    // Cancel any pending close timer when gaining focus
    if (hoverCloseTimerRef.current) {
      clearTimeout(hoverCloseTimerRef.current);
      hoverCloseTimerRef.current = null;
    }
  }, [hoverCloseTimerRef]);

  // PERFORMANCE: useCallback - stable function reference
  const handleFocusOut = useCallback(() => {
    setHasFocus(false);
    // Close after losing focus, but with a small delay to allow focus to move within the form
    setTimeout(() => {
      if (!hasFocus && loginFlyoutOpenedByHover) {
        setLoginFlyoutOpen(false);
        setLoginFlyoutOpenedByHover(false);
      }
    }, 100);
  }, [
    hasFocus,
    loginFlyoutOpenedByHover,
    setLoginFlyoutOpen,
    setLoginFlyoutOpenedByHover,
  ]);

  return {
    handleMouseEnter,
    handleMouseLeave,
    handleFocusIn,
    handleFocusOut,
  };
};
