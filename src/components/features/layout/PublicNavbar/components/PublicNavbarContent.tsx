"use client";

import { memo, useCallback } from 'react';

import Logo from '@/components/shared/logo/Logo';

import { useNavbarAuth } from '../hooks/useNavbarAuth';
import { useNavbarLogin } from '../hooks/useNavbarLogin';
import { useNavbarMobile } from '../hooks/useNavbarMobile';
import { useNavbarScroll } from '../hooks/useNavbarScroll';
import { useNavbarSearch } from '../hooks/useNavbarSearch';
import { useNavbarTheme } from '../hooks/useNavbarTheme';
import { navbarStyles } from '../styles/navbarStyles';
import { PublicNavbarDesktopNav } from './PublicNavbarDesktopNav';
import { PublicNavbarLoginButton } from './PublicNavbarLoginButton/PublicNavbarLoginButton';
import { PublicNavbarMobileMenu } from './PublicNavbarMobileMenu/PublicNavbarMobileMenu';
import { PublicNavbarMobileToggle } from './PublicNavbarMobileToggle';
import { PublicNavbarSearchButton } from './PublicNavbarSearchButton';
import { PublicNavbarSearchModal } from './PublicNavbarSearchModal';
import { PublicNavbarThemeToggle } from './PublicNavbarThemeToggle';
import { PublicNavbarUserMenu } from './PublicNavbarUserMenu/PublicNavbarUserMenu';

/**
 * PublicNavbarContent - Main navbar UI orchestrator (Pure Orchestration Pattern)
 * Combines hooks for business logic with UI orchestration
 *
 * Pure Orchestration Pattern:
 * - Custom hooks only (no useState/useEffect)
 * - No constants (moved to subcomponents - Data Colocation)
 * - UI structure with simple conditional rendering
 * - tailwind-variants for dynamic styles
 * - useCallback for stable callbacks
 * - React.memo for performance
 *
 * @example
 * <PublicNavbarContent />
 */
export const PublicNavbarContent = memo(() => {
  // 1. Custom hooks - business logic only
  const themeState = useNavbarTheme();
  const authState = useNavbarAuth();
  const scrollState = useNavbarScroll();
  const mobileState = useNavbarMobile();
  const searchState = useNavbarSearch();
  const loginState = useNavbarLogin();

  // 2. PERFORMANCE: tailwind-variants - styles based on scrolled state
  const styles = navbarStyles({ scrolled: scrollState.scrolled });

  // 3. PERFORMANCE: useCallback - stable function reference (prevence re-renderů)
  const handleMobileClose = useCallback(() => {
    mobileState.setMobileOpen(false);
  }, [mobileState]);

  // 4. UI orchestration - struktura a koordinace subkomponent
  // Konstanty (NAV_ITEMS, SEARCH_TAGS) jsou uvnitř subkomponent
  return (
    <>
      <nav className={styles.nav()}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={styles.container()}>
            {/* Left section - Logo */}
            <div className="flex items-center">
              <Logo />
            </div>

            {/* Center section - Desktop Navigation */}
            <PublicNavbarDesktopNav />

            {/* Right section - Actions */}
            <div className="flex items-center gap-2">
              <PublicNavbarSearchButton onOpen={searchState.onOpen} />

              {themeState.mounted && (
                <PublicNavbarThemeToggle
                  mounted={themeState.mounted}
                  resolvedTheme={themeState.resolvedTheme}
                  setTheme={themeState.setTheme}
                />
              )}

              {authState.session ? (
                <PublicNavbarUserMenu user={authState.user} />
              ) : (
                <PublicNavbarLoginButton
                  loginFlyoutOpen={loginState.loginFlyoutOpen}
                  setLoginFlyoutOpen={loginState.setLoginFlyoutOpen}
                  loginFlyoutOpenedByHover={loginState.loginFlyoutOpenedByHover}
                  setLoginFlyoutOpenedByHover={
                    loginState.setLoginFlyoutOpenedByHover
                  }
                  loginTriggerRef={loginState.loginTriggerRef}
                  flyoutFirstInputRef={loginState.flyoutFirstInputRef}
                  hoverOpenTimerRef={loginState.hoverOpenTimerRef}
                  loginEmail={loginState.loginEmail}
                  setLoginEmail={loginState.setLoginEmail}
                  loginPassword={loginState.loginPassword}
                  setLoginPassword={loginState.setLoginPassword}
                  loginLoading={loginState.loginLoading}
                  loginError={loginState.loginError}
                  handleLoginSubmit={loginState.handleLoginSubmit}
                  handleGoogleLogin={loginState.handleGoogleLogin}
                  resolvedTheme={themeState.resolvedTheme}
                />
              )}

              <PublicNavbarMobileToggle
                mobileOpen={mobileState.mobileOpen}
                onToggle={() =>
                  mobileState.setMobileOpen(!mobileState.mobileOpen)
                }
              />
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <PublicNavbarMobileMenu
          mobileOpen={mobileState.mobileOpen}
          session={authState.session}
          onClose={handleMobileClose}
        />
      </nav>

      {/* Search Modal */}
      <PublicNavbarSearchModal
        isOpen={searchState.isOpen}
        onClose={searchState.onClose}
      />
    </>
  );
});

PublicNavbarContent.displayName = "PublicNavbarContent";
