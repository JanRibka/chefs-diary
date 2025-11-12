"use client";

import { memo } from 'react';

import { NAV_ITEMS } from '../../constants/navItems';
import { MobileNavLinks } from './components/MobileNavLinks/MobileNavLinks';
import { MobileSearchSection } from './components/MobileSearchSection/MobileSearchSection';
import { mobileMenuStyles } from './styles/mobileMenuStyles';

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
          {!session && (
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

PublicNavbarMobileMenu.displayName = "PublicNavbarMobileMenu";
