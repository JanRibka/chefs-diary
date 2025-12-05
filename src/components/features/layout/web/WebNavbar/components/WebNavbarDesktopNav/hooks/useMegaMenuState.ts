import { useCallback, useRef, useState } from "react";

/**
 * useMegaMenuState - Mega menu state management hook
 * Manages active mega menu state and mouse interaction handlers with timeout
 *
 * @returns Mega menu state and event handlers
 *
 * @example
 * const megaMenuState = useMegaMenuState();
 * <DesktopNavContent megaMenuState={megaMenuState} />
 */
export const useMegaMenuState = () => {
  const [activeMegaMenu, setActiveMegaMenu] = useState<string | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // PERFORMANCE: useCallback for stable function reference
  const handleMouseEnter = useCallback((key: string, hasMegaMenu = false) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    if (hasMegaMenu) {
      setActiveMegaMenu(key);
    } else {
      // Immediately close mega menu when hovering over non-mega-menu items
      setActiveMegaMenu(null);
    }
  }, []);

  // PERFORMANCE: useCallback for stable function reference
  const handleMouseLeave = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = setTimeout(() => {
      setActiveMegaMenu(null);
    }, 200); // 200ms delay to allow moving to mega menu
  }, []);

  // PERFORMANCE: useCallback for stable function reference
  const handleCloseMegaMenu = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    setActiveMegaMenu(null);
  }, []);

  // Return object with state and handlers
  return {
    activeMegaMenu,
    handleMouseEnter,
    handleMouseLeave,
    handleCloseMegaMenu,
  };
};
