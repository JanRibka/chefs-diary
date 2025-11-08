"use client";

import { SessionProvider } from "next-auth/react";

import PublicFooter from "@/components/web/layout/PublicFooter";
import PublicNavbar from "@/components/web/layout/PublicNavbar";
import { Providers } from "@/config/heroUI/providers";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Providers themeProps={{ attribute: "class", defaultTheme: "light" }}>
      <SessionProvider>
        <div className="min-h-screen relative overflow-x-hidden">
          {/* Modern animated background */}
          <div className="fixed inset-0 -z-10">
            {/* Base gradient background */}
            <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-white to-orange-50/30 dark:from-slate-950 dark:via-slate-900 dark:to-orange-950/20" />

            {/* Animated gradient orbs */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-orange-200/20 to-red-200/20 dark:from-orange-900/10 dark:to-red-900/10 rounded-full blur-3xl animate-pulse" />
            <div
              className="absolute bottom-0 left-0 w-80 h-80 bg-gradient-to-tr from-pink-200/20 to-purple-200/20 dark:from-pink-900/10 dark:to-purple-900/10 rounded-full blur-3xl animate-pulse"
              style={{ animationDelay: "2s" }}
            />
            <div
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-r from-blue-200/15 to-cyan-200/15 dark:from-blue-900/8 dark:to-cyan-900/8 rounded-full blur-3xl animate-pulse"
              style={{ animationDelay: "4s" }}
            />

            {/* Subtle dot pattern */}
            <div className="absolute inset-0 opacity-[0.02] dark:opacity-[0.05]">
              <div
                className="absolute inset-0"
                style={{
                  backgroundImage: `radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)`,
                  backgroundSize: "24px 24px",
                }}
              />
            </div>
          </div>

          {/* Main layout structure */}
          <div className="relative z-10 flex flex-col min-h-screen">
            {/* Navigation with glass morphism effect */}
            <PublicNavbar />

            {/* Main content area with enhanced structure */}
            <main className="flex-1 relative">
              {/* Content wrapper with enhanced animations */}
              <div className="animate-in fade-in duration-1000 slide-in-from-bottom-6">
                <div className="relative">
                  {children}

                  {/* Subtle page transitions overlay */}
                  <div className="absolute inset-0 pointer-events-none">
                    <div
                      className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 opacity-0 animate-pulse"
                      style={{ animationDelay: "0.5s" }}
                    />
                  </div>
                </div>
              </div>

              {/* Enhanced floating accent elements with better positioning */}
              <div
                className="absolute top-24 right-8 w-3 h-3 bg-gradient-to-br from-orange-400 to-red-400 rounded-full opacity-20 animate-bounce shadow-lg"
                style={{ animationDelay: "1s", animationDuration: "4s" }}
              />
              <div
                className="absolute top-48 right-20 w-2 h-2 bg-gradient-to-br from-pink-400 to-purple-400 rounded-full opacity-25 animate-bounce shadow-md"
                style={{ animationDelay: "2s", animationDuration: "5s" }}
              />
              <div
                className="absolute top-72 right-6 w-2.5 h-2.5 bg-gradient-to-br from-yellow-400 to-orange-400 rounded-full opacity-30 animate-bounce shadow-lg"
                style={{ animationDelay: "3s", animationDuration: "6s" }}
              />
              <div
                className="absolute top-96 right-14 w-1.5 h-1.5 bg-gradient-to-br from-blue-400 to-cyan-400 rounded-full opacity-20 animate-bounce shadow-sm"
                style={{ animationDelay: "4s", animationDuration: "7s" }}
              />
            </main>

            {/* Footer with enhanced styling */}
            <div className="relative z-20 backdrop-blur-sm bg-white/60 dark:bg-slate-900/60 border-t border-white/20 dark:border-slate-800/50">
              <PublicFooter />
            </div>
          </div>

          {/* Global scroll enhancement styles */}
          <style jsx global>{`
            html {
              scroll-behavior: smooth;
            }

            /* Custom scrollbar */
            ::-webkit-scrollbar {
              width: 6px;
            }

            ::-webkit-scrollbar-track {
              background: transparent;
            }

            ::-webkit-scrollbar-thumb {
              background: rgba(0, 0, 0, 0.1);
              border-radius: 3px;
            }

            ::-webkit-scrollbar-thumb:hover {
              background: rgba(0, 0, 0, 0.2);
            }

            .dark ::-webkit-scrollbar-thumb {
              background: rgba(255, 255, 255, 0.1);
            }

            .dark ::-webkit-scrollbar-thumb:hover {
              background: rgba(255, 255, 255, 0.2);
            }

            /* Enhanced focus styles */
            *:focus {
              outline: none;
            }

            *:focus-visible {
              outline: 2px solid theme(colors.primary.DEFAULT);
              outline-offset: 2px;
              border-radius: 4px;
            }

            /* Smooth transitions for theme changes */
            * {
              transition-property: background-color, border-color, color, fill,
                stroke, opacity, box-shadow, transform;
              transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
              transition-duration: 150ms;
            }

            /* Animation utilities */
            @keyframes animate-in {
              from {
                opacity: 0;
                transform: translateY(16px);
              }
              to {
                opacity: 1;
                transform: translateY(0);
              }
            }

            .animate-in {
              animation: animate-in 0.6s ease-out forwards;
            }

            /* Reduced motion support */
            @media (prefers-reduced-motion: reduce) {
              * {
                animation-duration: 0.01ms !important;
                animation-iteration-count: 1 !important;
                transition-duration: 0.01ms !important;
              }
            }
          `}</style>
        </div>
      </SessionProvider>
    </Providers>
  );
}
