"use client";

import { memo } from "react";
import { HiMoon, HiSun } from "react-icons/hi";

import Button from "@/components/shared/button/Button";

interface PublicNavbarThemeToggleProps {
  mounted: boolean;
  resolvedTheme: string | undefined;
  setTheme: (theme: string) => void;
}

/**
 * PublicNavbarThemeToggle - Theme toggle button with animations
 *
 * @param mounted - Whether component is mounted (for SSR)
 * @param resolvedTheme - Current theme ("light" or "dark")
 * @param setTheme - Function to change theme
 *
 * @example
 * <PublicNavbarThemeToggle
 *   mounted={true}
 *   resolvedTheme="dark"
 *   setTheme={setTheme}
 * />
 */
export const PublicNavbarThemeToggle = memo(
  ({ mounted, resolvedTheme, setTheme }: PublicNavbarThemeToggleProps) => {
    return (
      <div className="relative group cursor-pointer">
        <Button
          isIconOnly
          variant="light"
          size="lg"
          onPress={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
          className="relative overflow-hidden rounded-2xl transition-all duration-300 hover:bg-gradient-to-r hover:from-yellow-100 hover:to-orange-100 dark:hover:from-blue-900/30 dark:hover:to-purple-900/30 group-hover:scale-110 group-hover:shadow-lg"
          aria-label="Přepnout režim"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 dark:from-blue-500/20 dark:to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl" />
          <div className="relative z-10 transition-all duration-500 group-hover:rotate-180">
            {/* Render neutral placeholder on server to avoid hydration mismatch */}
            {!mounted ? (
              <span className="w-6 h-6 inline-block" aria-hidden />
            ) : resolvedTheme === "light" ? (
              <HiMoon className="w-6 h-6 text-slate-600 dark:text-slate-400 transition-colors duration-300" />
            ) : (
              <HiSun className="w-6 h-6 text-primary group-hover:text-yellow-500 transition-colors duration-300" />
            )}
          </div>
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent opacity-0 group-hover:opacity-100 transform -translate-x-full group-hover:translate-x-full transition-transform duration-500" />
        </Button>
        {/* Glow effect - pointer-events-none aby neblokoval kliknutí */}
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-yellow-500/40 to-orange-500/40 dark:from-blue-500/40 dark:to-purple-500/40 opacity-0 group-hover:opacity-60 transition-opacity duration-300 blur-xl scale-150 pointer-events-none" />
      </div>
    );
  }
);

// PERFORMANCE: displayName for React DevTools
PublicNavbarThemeToggle.displayName = "PublicNavbarThemeToggle";
