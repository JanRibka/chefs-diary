"use client";

import { memo } from "react";
import { IoClose, IoMenu } from "react-icons/io5";

import { Button } from "@heroui/react";

interface PublicNavbarMobileToggleProps {
  mobileOpen: boolean;
  onToggle: () => void;
}

/**
 * PublicNavbarMobileToggle - Mobile menu toggle button
 *
 * @param mobileOpen - Whether mobile menu is open
 * @param onToggle - Callback to toggle mobile menu
 *
 * @example
 * <PublicNavbarMobileToggle
 *   mobileOpen={false}
 *   onToggle={() => setMobileOpen(!mobileOpen)}
 * />
 */
export const PublicNavbarMobileToggle = memo(({
  mobileOpen,
  onToggle,
}: PublicNavbarMobileToggleProps) => {
  return (
    <div className="relative group lg:hidden">
      <Button
        isIconOnly
        variant="light"
        size="lg"
        onPress={onToggle}
        className="relative overflow-hidden rounded-2xl transition-all duration-300 hover:bg-gradient-to-r hover:from-orange-100 hover:to-red-100 dark:hover:from-orange-900/30 dark:hover:to-red-900/30 group-hover:scale-110 group-hover:shadow-lg cursor-pointer"
        aria-label="Menu"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-orange-500/20 to-red-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl" />
        <div className="relative z-10 transition-all duration-300">
          {mobileOpen ? (
            <IoClose className="w-6 h-6 text-slate-600 dark:text-slate-400 group-hover:text-red-600 dark:group-hover:text-red-400 transition-colors duration-300 group-hover:rotate-90" />
          ) : (
            <IoMenu className="w-6 h-6 text-slate-600 dark:text-slate-400 group-hover:text-primary dark:group-hover:text-primary-light transition-colors duration-300" />
          )}
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent opacity-0 group-hover:opacity-100 transform -translate-x-full group-hover:translate-x-full transition-transform duration-500" />
      </Button>
      {/* Animated indicator dots */}
      <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 flex gap-1">
        <div
          className={`w-1 h-1 rounded-full transition-all duration-300 ${
            mobileOpen ? "bg-red-500 scale-125" : "bg-primary"
          }`}
        />
        <div
          className={`w-1 h-1 rounded-full transition-all duration-300 ${
            mobileOpen ? "bg-red-500 scale-125" : "bg-primary"
          }`}
          style={{ animationDelay: "0.1s" }}
        />
        <div
          className={`w-1 h-1 rounded-full transition-all duration-300 ${
            mobileOpen ? "bg-red-500 scale-125" : "bg-primary"
          }`}
          style={{ animationDelay: "0.2s" }}
        />
      </div>
    </div>
  );
});

PublicNavbarMobileToggle.displayName = "PublicNavbarMobileToggle";
