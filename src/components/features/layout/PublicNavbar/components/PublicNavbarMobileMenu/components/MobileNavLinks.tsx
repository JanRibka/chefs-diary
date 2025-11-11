"use client";

import NextLink from "next/link";
import { memo, useMemo } from "react";
import { IoArrowForward } from "react-icons/io5";

import type { NavItem } from "../../../types/NavItem";

interface MobileNavLinksProps {
  items: NavItem[];
  onClose: () => void;
}

/**
 * MobileNavLinks - Animated mobile navigation links
 */
export const MobileNavLinks = memo(
  ({ items, onClose }: MobileNavLinksProps) => {
    const navLinks = useMemo(
      () =>
        items.map((item, index) => (
          <li key={item.href} className="relative group">
            <NextLink
              href={item.href}
              className="relative block px-6 py-4 text-lg font-semibold text-slate-700 dark:text-slate-300 rounded-2xl overflow-hidden transition-all duration-300 group-hover:text-white transform group-hover:scale-105"
              onClick={onClose}
            >
              {/* Animated background */}
              <div
                className={`absolute inset-0 bg-gradient-to-r ${item.color} opacity-0 group-hover:opacity-100 transition-all duration-300 transform scale-x-0 group-hover:scale-x-100 origin-left`}
              />

              {/* Ripple effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-white/20 via-white/40 to-white/20 opacity-0 group-hover:opacity-100 transform -translate-x-full group-hover:translate-x-full transition-transform duration-700" />

              {/* Content with icon */}
              <div className="relative flex items-center gap-4">
                <div className="relative">
                  <span
                    className="text-2xl group-hover:animate-bounce transition-transform duration-200"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    {item.icon}
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-white/30 to-transparent rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm" />
                </div>
                <div className="flex-1">
                  <span className="block font-bold tracking-wide group-hover:text-shadow-lg">
                    {item.label}
                  </span>
                  <div className="w-0 group-hover:w-full h-0.5 bg-white/80 transition-all duration-300 mt-1 rounded-full" />
                </div>
                <div className="opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-2 group-hover:translate-x-0">
                  <IoArrowForward className="w-5 h-5" />
                </div>
              </div>
            </NextLink>

            {/* Side glow effect */}
            <div
              className={`absolute inset-y-0 -left-2 w-1 bg-gradient-to-b ${item.color} opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full blur-sm`}
            />
          </li>
        )),
      [items, onClose]
    );

    return (
      <nav>
        <ul className="space-y-3">{navLinks}</ul>
      </nav>
    );
  }
);

MobileNavLinks.displayName = "MobileNavLinks";
