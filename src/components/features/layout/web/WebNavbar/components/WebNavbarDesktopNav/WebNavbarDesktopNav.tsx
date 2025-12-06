"use client";

import { memo } from "react";

import webMenuItems from "@/lib/config/webMenuItems";
import { DesktopNavItem } from "./components/DesktopNavItem";
import { useMegaMenuState } from "./hooks/useMegaMenuState";

/**
 * WebNavbarDesktopNav - Desktop navigation component
 * Uses Data Colocation: hooks called where they're used
 *
 * @example
 * <WebNavbarDesktopNav />
 */
export const WebNavbarDesktopNav = memo(() => {
  // DATA COLOCATION: only shared state hooks here
  const megaMenuState = useMegaMenuState();

  return (
    <nav className="hidden lg:flex items-center justify-center flex-1">
      <ul className="flex items-center gap-4 lg:gap-6 xl:gap-8">
        {webMenuItems.map((item) => (
          <DesktopNavItem
            key={item.key}
            item={item}
            activeMegaMenu={megaMenuState.activeMegaMenu}
            onMouseEnter={megaMenuState.handleMouseEnter}
            onMouseLeave={megaMenuState.handleMouseLeave}
            onCloseMegaMenu={megaMenuState.handleCloseMegaMenu}
          />
        ))}
      </ul>
    </nav>
  );
});

// PERFORMANCE: displayName for React DevTools
WebNavbarDesktopNav.displayName = "WebNavbarDesktopNav";
