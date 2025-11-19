import { useCallback } from "react";

import { HOVER_TIMING } from "../constants/hoverTiming";

/**
 * useHoverBehavior - Hook for managing hover open/close behavior
 *
 * @param hoverOpenTimerRef - Reference to hover open timer
 * @param hoverCloseTimerRef - Reference to hover close timer
 * @param setLoginFlyoutOpen - Function to set login flyout open state
 * @param setLoginFlyoutOpenedByHover - Function to set hover opened state
 * @param loginFlyoutOpenedByHover - Current hover opened state
 * @returns Object with hover handlers
 */
export const useHoverBehavior = (
  hoverOpenTimerRef: React.RefObject<number | null>,
  hoverCloseTimerRef: React.RefObject<number | null>,
  setLoginFlyoutOpen: (open: boolean) => void,
  setLoginFlyoutOpenedByHover: (opened: boolean) => void,
  loginFlyoutOpenedByHover: boolean
) => {
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
    if (loginFlyoutOpenedByHover) {
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
  ]);

  return {
    handleMouseEnter,
    handleMouseLeave,
  };
};
