"use client";

import { memo } from "react";

import { Providers } from "@/config/heroUI/providers";

import { ScrollToTopButton } from "../WebFooter/components/ScrollToTopButton";
import WebFooter from "../WebFooter/WebFooter";
import WebNavbar from "../WebNavbar/WebNavbar";
import { WebLayoutBackground } from "./components/WebLayoutBackground";
import { WebLayoutContent } from "./components/WebLayoutContent";
import { useWebLayoutProviders } from "./hooks/useWebLayoutProviders";

import type { WebLayoutProps } from "./types/WebLayoutProps";
/**
 * WebLayout - Main layout component for public pages
 * Provides animated background, navigation, content area, and footer
 * with session management and theme support
 *
 * @param children - Content to be rendered within the layout
 *
 * @example
 * <WebLayout>
 *   <YourPageContent />
 * </WebLayout>
 */
export const WebLayout = memo(({ children }: WebLayoutProps) => {
  // Business logic hooks
  const { themeProps } = useWebLayoutProviders();

  return (
    <Providers themeProps={themeProps}>
      <div className="min-h-screen relative overflow-x-hidden">
        {/* Animated background */}
        <WebLayoutBackground />

        {/* Main layout structure */}
        <div className="relative z-10 flex flex-col min-h-screen">
          {/* Navigation with glass morphism effect */}
          <WebNavbar />

          {/* Main content area with animations */}
          <WebLayoutContent>{children}</WebLayoutContent>

          {/* Footer with enhanced styling */}
          <div className="relative z-20 backdrop-blur-sm bg-white/60 dark:bg-slate-900/60 border-t border-white/20 dark:border-slate-800/50">
            <WebFooter />
          </div>
        </div>

        {/* Scroll to Top Button - globally positioned */}
        <ScrollToTopButton />
      </div>
    </Providers>
  );
});

WebLayout.displayName = "WebLayout";
