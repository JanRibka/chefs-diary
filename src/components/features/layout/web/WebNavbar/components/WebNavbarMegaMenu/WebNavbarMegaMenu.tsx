"use client";

import { memo } from "react";
import type { WebNavbarMegaMenuProps } from "./types/WebNavbarMegaMenuProps";
import { WebNavbarMegaMenuBackdrop } from "./components/WebNavbarMegaMenuBackdrop";
import { WebNavbarMegaMenuFooter } from "./components/WebNavbarMegaMenuFooter/WebNavbarMegaMenuFooter";
import { WebNavbarMegaMenuGrid } from "./components/WebNavbarMegaMenuGrid";
import { WebNavbarMegaMenuHeader } from "./components/WebNavbarMegaMenuHeader/WebNavbarMegaMenuHeader";

/**
 * WebNavbarMegaMenu - Modern glassmorphic mega menu orchestrator
 * Premium card-based design with gradients and category icons
 *
 * Pure orchestrator following Architecture Guidelines:
 * - No constants (moved to constants folder)
 * - No complex UI rendering (moved to subcomponents)
 * - Only coordinates subcomponents and handles conditional rendering
 *
 * @example
 * <WebNavbarMegaMenu
 *   items={navItems}
 *   isOpen={isOpen}
 *   onClose={handleClose}
 *   onMouseEnter={handleMouseEnter}
 *   onMouseLeave={handleMouseLeave}
 * />
 */
export const WebNavbarMegaMenu = memo(
  ({
    items,
    isOpen,
    onClose,
    onMouseEnter,
    onMouseLeave,
  }: WebNavbarMegaMenuProps) => {
    // Early return for closed state or empty items
    if (!isOpen || items.length === 0) return null;

    return (
      <>
        {/* Backdrop overlay with blur effect */}
        <WebNavbarMegaMenuBackdrop onClose={onClose} />

        {/* Menu container - above backdrop */}
        <div
          className="fixed inset-x-0 top-[72px] z-50 flex justify-center pointer-events-none"
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
        >
          <div className="w-full max-w-6xl mx-auto px-4 pointer-events-auto">
            <div className="bg-white/95 dark:bg-slate-900/95 rounded-3xl shadow-2xl border border-white/20 dark:border-slate-700/50 overflow-hidden backdrop-blur-2xl">
              {/* Header section */}
              <WebNavbarMegaMenuHeader />

              {/* Categories grid */}
              <WebNavbarMegaMenuGrid items={items} onClose={onClose} />

              {/* Footer section */}
              <WebNavbarMegaMenuFooter onClose={onClose} />
            </div>
          </div>
        </div>
      </>
    );
  }
);

WebNavbarMegaMenu.displayName = "WebNavbarMegaMenu";
