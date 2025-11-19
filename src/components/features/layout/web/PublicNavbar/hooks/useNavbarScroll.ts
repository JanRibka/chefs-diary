"use client";

import { useEffect, useMemo, useState } from "react";

/**
 * useNavbarScroll - hook for scroll effects
 * Tracks scroll position and provides scrolled state
 *
 * @returns object with { scrolled }
 *
 * @example
 * const { scrolled } = useNavbarScroll();
 * <nav className={scrolled ? 'bg-white/95' : 'bg-white/80'} />
 */
export const useNavbarScroll = () => {
  const [scrolled, setScrolled] = useState(false);

  // PERFORMANCE: Enhanced scroll effect with cleanup for prevence memory leaks
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setScrolled(scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // PERFORMANCE: stabilní object reference (prevence re-renderů)
  return useMemo(() => ({ scrolled }), [scrolled]);
};
