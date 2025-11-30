"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { useTheme as useNextTheme } from "next-themes";

type Theme = "light" | "dark";

interface SSRSafeThemeContextType {
  theme: Theme;
  mounted: boolean;
}

const SSRSafeThemeContext = createContext<SSRSafeThemeContextType | undefined>(
  undefined
);

/**
 * SSRSafeThemeProvider - Provides SSR-safe theme to all child components
 *
 * Prevents hydration errors by ensuring server and client render the same
 * initial theme ("light"), then syncing with actual theme on client mount.
 */
export function SSRSafeThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>("light");
  const [mounted, setMounted] = useState(false);
  const { resolvedTheme } = useNextTheme();

  useEffect(() => {
    // Mark as mounted
    setMounted(true);

    // Sync with actual theme from next-themes
    setTheme((resolvedTheme as Theme) || "light");
  }, [resolvedTheme]);

  return (
    <SSRSafeThemeContext.Provider value={{ theme, mounted }}>
      {children}
    </SSRSafeThemeContext.Provider>
  );
}

/**
 * useSSRSafeTheme - Hook to get SSR-safe theme
 *
 * Returns "light" on server and during first client render,
 * then syncs with actual theme after hydration.
 *
 * @returns {Theme} Current theme ("light" | "dark")
 *
 * @example
 * ```tsx
 * const theme = useSSRSafeTheme();
 * const className = theme === "dark" ? "bg-purple-500" : "bg-blue-500";
 * ```
 */
export function useSSRSafeTheme(): Theme {
  const context = useContext(SSRSafeThemeContext);

  if (context === undefined) {
    throw new Error("useSSRSafeTheme must be used within SSRSafeThemeProvider");
  }

  return context.theme;
}

/**
 * useThemeMounted - Hook to check if theme has been synced on client
 *
 * @returns {boolean} True if mounted and theme is synced
 */
export function useThemeMounted(): boolean {
  const context = useContext(SSRSafeThemeContext);

  if (context === undefined) {
    throw new Error("useThemeMounted must be used within SSRSafeThemeProvider");
  }

  return context.mounted;
}
