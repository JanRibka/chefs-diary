"use client";

import { memo, useCallback } from "react";

import Logo from "@/components/shared/logo/Logo";

import { WebNavbarDesktopNav } from "./components/WebNavbarDesktopNav/WebNavbarDesktopNav";
import { WebNavbarLoginButton } from "./components/WebNavbarLoginButton/WebNavbarLoginButton";
import { WebNavbarMobileMenu } from "./components/WebNavbarMobileMenu/WebNavbarMobileMenu";
import { WebNavbarMobileToggle } from "./components/WebNavbarMobileToggle/WebNavbarMobileToggle";
import { WebNavbarSearchButton } from "./components/WebNavbarSearchButton/WebNavbarSearchButton";
import { WebNavbarSearchModal } from "./components/WebNavbarSearchModal/WebNavbarSearchModal";
import { WebNavbarThemeToggle } from "./components/WebNavbarThemeToggle/WebNavbarThemeToggle";
import { WebNavbarUserButton } from "./components/WebNavbarUserButton/WebNavbarUserButton";

import { useNavbarLogin } from "./hooks/useNavbarLogin";
import { useNavbarMobile } from "./hooks/useNavbarMobile";
import { useNavbarScroll } from "./hooks/useNavbarScroll";
import { useNavbarSearch } from "./hooks/useNavbarSearch";
import { useNavbarTheme } from "./hooks/useNavbarTheme";
import { navbarStyles } from "./styles/navbarStyles";
import { useUserContext } from "@/lib/context/UserContext";

/**
 * WebNavbar - Main web navigation component (Pure Orchestrator)
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
 * <WebNavbar />
 */
export const WebNavbar = memo(() => {
  // 1. Custom hooks - business logic only
  const themeState = useNavbarTheme();
  const scrollState = useNavbarScroll();
  const mobileState = useNavbarMobile();
  const searchState = useNavbarSearch();
  const loginState = useNavbarLogin();
  const userContext = useUserContext();

  // 2. PERFORMANCE: tailwind-variants - styles based on scrolled state
  const styles = navbarStyles({ scrolled: scrollState.scrolled });

  // 3. PERFORMANCE: useCallback - stable function reference (prevence re-renderů)
  const handleMobileClose = useCallback(() => {
    mobileState.setMobileOpen(false);
  }, [mobileState]);

  // 4. UI orchestration - struktura a koordinace subkomponent
  return (
    <header>
      <nav className={styles.nav()}>
        <div className={styles.container()}>
          {/* Left section - Logo */}
          <div className="flex items-center">
            <Logo />
          </div>

          {/* Center section - Desktop Navigation */}
          <WebNavbarDesktopNav />

          {/* Right section - Actions */}
          <div className="flex items-center gap-2">
            <WebNavbarSearchButton onOpen={searchState.onOpen} />

            <WebNavbarThemeToggle
              mounted={themeState.mounted}
              resolvedTheme={themeState.resolvedTheme}
              setTheme={themeState.setTheme}
            />

            {userContext.user ? (
              <WebNavbarUserButton
                user={userContext.user}
                loginFlyoutOpen={loginState.loginFlyoutOpen}
                setLoginFlyoutOpen={loginState.setLoginFlyoutOpen}
                loginFlyoutOpenedByHover={loginState.loginFlyoutOpenedByHover}
                setLoginFlyoutOpenedByHover={
                  loginState.setLoginFlyoutOpenedByHover
                }
                loginTriggerRef={loginState.loginTriggerRef}
                hoverOpenTimerRef={loginState.hoverOpenTimerRef}
                hoverCloseTimerRef={loginState.hoverCloseTimerRef}
                resolvedTheme={themeState.resolvedTheme}
              />
            ) : (
              <WebNavbarLoginButton
                loginFlyoutOpen={loginState.loginFlyoutOpen}
                setLoginFlyoutOpen={loginState.setLoginFlyoutOpen}
                loginFlyoutOpenedByHover={loginState.loginFlyoutOpenedByHover}
                setLoginFlyoutOpenedByHover={
                  loginState.setLoginFlyoutOpenedByHover
                }
                loginTriggerRef={loginState.loginTriggerRef}
                hoverOpenTimerRef={loginState.hoverOpenTimerRef}
                hoverCloseTimerRef={loginState.hoverCloseTimerRef}
                resolvedTheme={themeState.resolvedTheme}
              />
            )}

            <WebNavbarMobileToggle
              mobileOpen={mobileState.mobileOpen}
              onToggle={() =>
                mobileState.setMobileOpen(!mobileState.mobileOpen)
              }
            />
          </div>
        </div>

        {/* Mobile Menu */}
        <WebNavbarMobileMenu
          mobileOpen={mobileState.mobileOpen}
          user={userContext.user}
          onClose={handleMobileClose}
        />
      </nav>

      {/* Search Modal */}
      <WebNavbarSearchModal
        isOpen={searchState.isOpen}
        onClose={searchState.onClose}
      />
    </header>
  );
});

// PERFORMANCE: displayName for React DevTools
WebNavbar.displayName = "WebNavbar";

export default WebNavbar;
