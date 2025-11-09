"use client";

import { SessionProvider } from "next-auth/react";
import { memo } from "react";

import PublicNavbar from "@/components/features/layout/PublicNavbar";
import { Providers } from "@/config/heroUI/providers";

import { ScrollToTopButton } from "../PublicFooter/components/ScrollToTopButton";
import PublicFooter from "../PublicFooter/PublicFooter";
import { PublicLayoutBackground } from "./components/PublicLayoutBackground";
import { PublicLayoutContent } from "./components/PublicLayoutContent";
import { usePublicLayoutProviders } from "./hooks/usePublicLayoutProviders";

import type { PublicLayoutProps } from "./types/PublicLayoutProps";
/**
 * PublicLayout - Main layout component for public pages
 * Provides animated background, navigation, content area, and footer
 * with session management and theme support
 *
 * @param children - Content to be rendered within the layout
 *
 * @example
 * <PublicLayout>
 *   <YourPageContent />
 * </PublicLayout>
 */
export const PublicLayout = memo(({ children }: PublicLayoutProps) => {
  // Business logic hooks
  const { themeProps } = usePublicLayoutProviders();

  return (
    <Providers themeProps={themeProps}>
      {/* TODO: Asi už mám svůj, tentpo je vytvořená AI */}
      <SessionProvider>
        <div className="min-h-screen relative overflow-x-hidden">
          {/* Animated background */}
          <PublicLayoutBackground />

          {/* Main layout structure */}
          <div className="relative z-10 flex flex-col min-h-screen">
            {/* Navigation with glass morphism effect */}
            <PublicNavbar />

            {/* Main content area with animations */}
            <PublicLayoutContent>{children}</PublicLayoutContent>

            {/* Footer with enhanced styling */}
            <div className="relative z-20 backdrop-blur-sm bg-white/60 dark:bg-slate-900/60 border-t border-white/20 dark:border-slate-800/50">
              <PublicFooter />
            </div>
          </div>

          {/* Scroll to Top Button - globally positioned */}
          <ScrollToTopButton />
        </div>
      </SessionProvider>
    </Providers>
  );
});

PublicLayout.displayName = "PublicLayout";
