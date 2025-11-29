import { useCallback } from "react";

/**
 * useButtonTriggerState - Hook for managing login button trigger state
 *
 * Handles button press logic for opening/closing login popover.
 *
 * @param loginFlyoutOpen - Current login flyout open state
 * @param setLoginFlyoutOpen - Function to set login flyout open state
 * @returns Object with button trigger handlers
 */
export const useButtonTriggerState = (
  loginFlyoutOpen: boolean,
  setLoginFlyoutOpen: (open: boolean) => void
) => {
  // PERFORMANCE: useCallback - stable function reference (prevence re-renderů child komponent)
  const handlePress = useCallback(() => {
    setLoginFlyoutOpen(!loginFlyoutOpen);
  }, [setLoginFlyoutOpen, loginFlyoutOpen]);

  return {
    handlePress,
  };
};
