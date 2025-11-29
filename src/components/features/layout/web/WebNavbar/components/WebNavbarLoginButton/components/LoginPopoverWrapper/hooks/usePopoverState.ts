import { useCallback } from "react";

/**
 * usePopoverState - Hook for managing login popover state
 *
 * Handles popover open/close logic and hover state coordination.
 *
 * @param setLoginFlyoutOpen - Function to set login flyout open state
 * @param setLoginFlyoutOpenedByHover - Function to set hover opened state
 * @returns Object with popover state handlers
 */
export const usePopoverState = (
  setLoginFlyoutOpen: (open: boolean) => void,
  setLoginFlyoutOpenedByHover: (opened: boolean) => void
) => {
  // PERFORMANCE: useCallback - stable function reference (prevence re-renderů child komponent)
  const handleOpenChange = useCallback(
    (isOpen: boolean) => {
      setLoginFlyoutOpen(isOpen);
      if (isOpen) {
        setLoginFlyoutOpenedByHover(false);
      }
    },
    [setLoginFlyoutOpen, setLoginFlyoutOpenedByHover]
  );

  return {
    handleOpenChange,
  };
};
