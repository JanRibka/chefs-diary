"use client";

import { useTheme } from "next-themes";
import { useEffect, useMemo, useState } from "react";

/**
 * useNavbarTheme - hook for theme management
 * Handles theme switching and SSR/client hydration
 *
 * @returns object with { mounted, resolvedTheme, setTheme }
 *
 * @example
 * const { mounted, resolvedTheme, setTheme } = useNavbarTheme();
 * if (!mounted) return null; // Avoid SSR mismatch
 */
export const useNavbarTheme = () => {
  const { setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // PERFORMANCE: Mark when component is mounted client-side to avoid SSR/client mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  // PERFORMANCE: stabilní object reference (prevence re-renderů)
  return useMemo(
    () => ({ mounted, resolvedTheme, setTheme }),
    [mounted, resolvedTheme, setTheme]
  );
};
