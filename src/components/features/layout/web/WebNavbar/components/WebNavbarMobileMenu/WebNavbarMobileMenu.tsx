"use client";

import { memo } from "react";

import webMenuItems from "@/lib/config/webMenuItems";
import { MobileNavLinks } from "./components/MobileNavLinks/MobileNavLinks";
import { mobileMenuStyles } from "./styles/mobileMenuStyles";
import SessionUserType from "@/lib/types/common/SessionUserType";

interface WebNavbarMobileMenuProps {
  mobileOpen: boolean;
  user: SessionUserType | null;
  onClose: () => void;
}

/**
 * WebNavbarMobileMenu - Mobile navigation menu orchestrator
 * Uses webMenuItems configuration following admin pattern
 *
 * Coordinates mobile search, navigation links, and animations.
 */
export const WebNavbarMobileMenu = memo(
  ({ mobileOpen, user, onClose }: WebNavbarMobileMenuProps) => {
    // Get styles from tailwind-variants with mobileOpen variant
    const styles = mobileMenuStyles({ mobileOpen });

    return (
      <div
        className={styles.container({ mobileOpen })}
        aria-hidden={!mobileOpen}
      >
        <div className={styles.content()}>
          <MobileNavLinks items={webMenuItems} onClose={onClose} />

          {/* Mobile Auth Section - placeholder */}
          {!user && (
            <div className={styles.authSection()}>
              {/* Login button would go here if needed */}
            </div>
          )}
        </div>
      </div>
    );
  }
);

WebNavbarMobileMenu.displayName = "WebNavbarMobileMenu";
