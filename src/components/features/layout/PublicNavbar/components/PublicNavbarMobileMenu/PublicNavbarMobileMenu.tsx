"use client";

import { memo } from "react";

import { NAV_ITEMS } from "../../constants/navItems";
import { MobileNavLinks } from "./components/MobileNavLinks";
import { MobileSearchSection } from "./components/MobileSearchSection";

interface PublicNavbarMobileMenuProps {
  mobileOpen: boolean;
  session: unknown;
  onClose: () => void;
}

/**
 * PublicNavbarMobileMenu - Mobile navigation menu orchestrator
 * DATA COLOCATION: NAV_ITEMS constant is here because it's only used here
 *
 * Coordinates mobile search, navigation links, and animations.
 */
export const PublicNavbarMobileMenu = memo(
  ({ mobileOpen, session, onClose }: PublicNavbarMobileMenuProps) => {
    return (
      <div
        className={`
        lg:hidden absolute top-full left-0 right-0 backdrop-blur-2xl bg-white/98 dark:bg-slate-900/98 border-b border-white/30 dark:border-slate-800/50 shadow-2xl overflow-hidden
        transition-all duration-500 ease-out transform-gpu
        ${
          mobileOpen
            ? "opacity-100 translate-y-0 scale-100"
            : "opacity-0 -translate-y-8 scale-95 pointer-events-none"
        }
      `}
      >
        {/* Animated background elements */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-primary/15 to-primary/20 dark:from-primary/20 dark:via-primary/15 dark:to-primary/10" />
        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-primary/30 to-primary/20 dark:from-primary/20 dark:to-primary/10 rounded-full blur-2xl animate-pulse" />

        <div className="relative z-10 px-6 py-8 space-y-6">
          <MobileSearchSection />
          <MobileNavLinks items={NAV_ITEMS} onClose={onClose} />

          {/* Mobile Auth Section - placeholder */}
          {!session && (
            <div className="space-y-4 pt-6 border-t border-gradient-to-r from-primary/30 to-primary/40 dark:from-primary/40 dark:to-primary/50">
              {/* Login button would go here if needed */}
            </div>
          )}
        </div>

        {/* Bottom wave decoration */}
        <div className="absolute bottom-0 left-0 right-0 h-2 bg-gradient-to-r from-primary via-primary-dark to-primary-light opacity-60" />
      </div>
    );
  }
);

PublicNavbarMobileMenu.displayName = "PublicNavbarMobileMenu";
