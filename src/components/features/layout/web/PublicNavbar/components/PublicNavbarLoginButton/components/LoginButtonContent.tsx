"use client";

import { memo } from "react";
import { IoPerson } from "react-icons/io5";

import type { LoginButtonContentProps } from "@/components/features/layout/web/PublicNavbar/components/PublicNavbarLoginButton/components/LoginButtonContent/types/LoginButtonContentProps";

/**
 * LoginButtonContent - Visual content for login button
 *
 * @param resolvedTheme - Current theme
 */
export const LoginButtonContent = memo(
  ({ resolvedTheme }: LoginButtonContentProps) => {
    // SSR-safe theme resolution
    const theme = resolvedTheme || "light";

    return (
      <>
        {/* Electric spark effects - decorative only */}
        <div className="absolute inset-0 rounded-3xl" aria-hidden="true">
          <div
            className={`absolute top-2 left-4 w-1 h-1 rounded-full animate-ping opacity-80 ${
              theme === "dark" ? "bg-purple-300" : "bg-yellow-300"
            }`}
          />
          <div
            className={`absolute top-3 right-6 w-0.5 h-0.5 rounded-full animate-pulse opacity-90 ${
              theme === "dark" ? "bg-indigo-300" : "bg-white"
            }`}
            style={{ animationDelay: "0.2s" }}
          />
          <div
            className={`absolute bottom-3 left-8 w-0.5 h-0.5 rounded-full animate-bounce opacity-70 ${
              theme === "dark" ? "bg-blue-300" : "bg-yellow-200"
            }`}
            style={{ animationDelay: "0.4s" }}
          />
          <div
            className={`absolute bottom-2 right-3 w-1 h-1 rounded-full animate-ping opacity-60 ${
              theme === "dark" ? "bg-purple-200" : "bg-primary/20"
            }`}
            style={{ animationDelay: "0.6s" }}
          />
        </div>

        {/* Energy wave animation - decorative */}
        <div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent opacity-0 group-hover:opacity-100 transform -translate-x-full group-hover:translate-x-full transition-transform duration-1000 rounded-3xl"
          aria-hidden="true"
        />

        {/* Content */}
        <span className="relative flex items-center gap-4 z-10">
          <div className="relative" aria-hidden="true">
            <IoPerson
              className="w-7 h-7 group-hover:rotate-180 group-hover:scale-125 transition-all duration-500 drop-shadow-lg text-white"
              aria-hidden="true"
            />
            {/* Electric ring - decorative */}
            <div
              className="absolute inset-0 border-2 border-white/50 rounded-full opacity-0 group-hover:opacity-100 group-hover:animate-spin transition-all duration-300"
              style={{ animationDuration: "2s" }}
              aria-hidden="true"
            />
          </div>
          <span
            className="tracking-wider text-lg font-black drop-shadow-2xl text-white"
            style={{
              textShadow:
                theme === "dark"
                  ? "0 0 3px rgba(0,0,0,0.7), 1px 1px 2px rgba(0,0,0,0.9)"
                  : "0 0 4px rgba(0,0,0,0.6), 1px 1px 2px rgba(0,0,0,0.8)",
            }}
          >
            PŘIHLÁSIT SE
          </span>
        </span>

        {/* Outer glow ring - decorative */}
        <div
          className="absolute inset-0 rounded-3xl border-2 border-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-pulse"
          aria-hidden="true"
        />
      </>
    );
  }
);

LoginButtonContent.displayName = "LoginButtonContent";
