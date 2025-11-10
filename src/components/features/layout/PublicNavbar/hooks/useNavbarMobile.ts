"use client";

import { useEffect, useMemo, useState } from "react";

/**
 * useNavbarMobile - hook for mobile menu state management
 * Handles mobile menu open/close and click outside detection
 *
 * @returns object with { mobileOpen, setMobileOpen }
 *
 * @example
 * const { mobileOpen, setMobileOpen } = useNavbarMobile();
 * <button onClick={() => setMobileOpen(!mobileOpen)}>Toggle</button>
 */
export const useNavbarMobile = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  // PERFORMANCE: Close mobile menu when clicking outside or on link
  useEffect(() => {
    // PERFORMANCE: cleanup handler for prevence memory leaks
    const handleClickOutside = () => setMobileOpen(false);
    if (mobileOpen) {
      document.addEventListener("click", handleClickOutside);
      return () => document.removeEventListener("click", handleClickOutside);
    }
  }, [mobileOpen]);

  // PERFORMANCE: stabilní object reference (prevence re-renderů)
  return useMemo(() => ({ mobileOpen, setMobileOpen }), [mobileOpen]);
};
