"use client";

import NextLink from "next/link";
import { memo, useMemo } from "react";

import { NAV_ITEMS } from "../constants/navItems";

/**
 * PublicNavbarDesktopNav - Desktop navigation links with hover effects
 * DATA COLOCATION: NAV_ITEMS constant is here because it's only used here
 *
 * @example
 * <PublicNavbarDesktopNav />
 */
export const PublicNavbarDesktopNav = memo(() => {
  const navItems = useMemo(
    () =>
      NAV_ITEMS.map((item, index) => (
        <div key={item.href} className="relative group">
          <NextLink
            href={item.href}
            className="relative px-8 py-4 text-sm font-semibold text-slate-700 dark:text-slate-300 transition-all duration-300 rounded-2xl overflow-hidden group-hover:text-white"
          >
            {/* Background hover effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 opacity-0 group-hover:opacity-100 transition-all duration-300 transform scale-x-0 group-hover:scale-x-100 origin-left" />

            {/* Shimmer effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transform -skew-x-12 translate-x-full group-hover:translate-x-[-200%] transition-transform duration-700" />

            {/* Glow effect */}
            <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-60 transition-opacity duration-300 bg-gradient-to-r from-orange-500/20 via-red-500/20 to-pink-500/20 blur-xl transform scale-150" />

            {/* Content */}
            <div className="relative flex items-center gap-2 transform group-hover:scale-105 transition-transform duration-200">
              <span
                className="text-lg group-hover:animate-bounce"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {item.icon}
              </span>
              <span className="font-medium tracking-wide">{item.label}</span>
            </div>

            {/* Bottom indicator */}
            <div className="absolute bottom-0 left-1/2 w-0 h-1 bg-gradient-to-r from-orange-400 to-red-400 group-hover:w-full transition-all duration-300 transform -translate-x-1/2 rounded-full" />
          </NextLink>

          {/* Tooltip */}
          <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 px-3 py-2 bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-xs font-medium rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-200 pointer-events-none backdrop-blur-sm shadow-xl border border-white/10">
            <div className="flex items-center gap-2">
              <span>{item.icon}</span>
              <span>{item.description}</span>
            </div>
            {/* Tooltip arrow */}
            <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-slate-900 dark:bg-white rotate-45" />
          </div>
        </div>
      )),
    []
  );

  return (
    <div className="hidden lg:flex items-center space-x-2">{navItems}</div>
  );
});

PublicNavbarDesktopNav.displayName = "PublicNavbarDesktopNav";
