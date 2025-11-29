"use client";

import { memo } from "react";

import { NAV_ITEMS } from "../../constants/navItems";
import { MobileNavLinks } from "./components/MobileNavLinks/MobileNavLinks";
import { MobileSearchSection } from "./components/MobileSearchSection/MobileSearchSection";
import { mobileMenuStyles } from "./styles/mobileMenuStyles";
import SessionUserType from "@/lib/types/common/SessionUserType";

interface WebNavbarMobileMenuProps {
  mobileOpen: boolean;
  user: SessionUserType | null;
  onClose: () => void;
}

/**
 * WebNavbarMobileMenu - Mobile navigation menu orchestrator
 * DATA COLOCATION: NAV_ITEMS constant is here because it's only used here
 *
 * Coordinates mobile search, navigation links, and animations.
 */
export const WebNavbarMobileMenu = memo(
  ({ mobileOpen, user, onClose }: WebNavbarMobileMenuProps) => {
    // Get styles from tailwind-variants with mobileOpen variant
    const styles = mobileMenuStyles({ mobileOpen });

    return (
      <div className={styles.container()}>
        {/* Animated background elements */}
        <div className={styles.backgroundGradient()} />
        <div className={styles.animatedBackground()} />

        <div className={styles.content()}>
          <MobileSearchSection />
          <MobileNavLinks items={NAV_ITEMS} onClose={onClose} />

          {/* Mobile Auth Section - placeholder */}
          {!user && (
            <div className={styles.authSection()}>
              {/* Login button would go here if needed */}
            </div>
          )}
        </div>

        {/* Bottom wave decoration */}
        <div className={styles.bottomWave()} />
      </div>
    );
  }
);

WebNavbarMobileMenu.displayName = "WebNavbarMobileMenu";
