"use client";

import { useEffect, useState } from "react";

/**
 * useScrollState - Hook for managing scroll-related state
 * Handles scroll position detection for showing/hiding scroll-to-top button
 *
 * @returns Object containing scroll state and actions
 */
export const useScrollState = () => {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 100);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return {
    showScrollTop,
    scrollToTop,
  };
};
