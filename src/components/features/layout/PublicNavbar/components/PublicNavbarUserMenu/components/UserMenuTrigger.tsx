"use client";

import { memo } from "react";
import { IoSettings } from "react-icons/io5";

import { Avatar } from "@heroui/react";

import type { UserSession } from "../../../types/UserSession";

interface UserMenuTriggerProps {
  user: UserSession | undefined;
}

/**
 * UserMenuTrigger - Dropdown trigger with user avatar and info
 */
export const UserMenuTrigger = memo(({ user }: UserMenuTriggerProps) => {
  return (
    <div className="flex items-center gap-3 cursor-pointer transition-all duration-300 group-hover:scale-105 px-3 py-2 rounded-2xl hover:bg-gradient-to-r hover:from-primary/10 hover:to-primary/20 dark:hover:from-primary/20 dark:hover:to-primary/30">
      <div className="relative">
        <Avatar
          src={user?.image}
          alt={user?.name || "Uživatel"}
          size="md"
          className="ring-3 ring-primary/30 dark:ring-primary/50 hover:ring-primary/50 dark:hover:ring-primary/70 transition-all duration-300 group-hover:ring-4 group-hover:ring-primary/60 dark:group-hover:ring-primary/80"
        />
        {/* Online indicator */}
        <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white dark:border-slate-900 animate-pulse" />
        {/* Glow effect */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-primary/30 to-primary/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-lg scale-150" />
      </div>
      <div className="hidden md:block">
        <p className="text-sm font-semibold text-slate-700 dark:text-slate-300 group-hover:text-primary dark:group-hover:text-primary-light transition-colors duration-200">
          {user?.name}
        </p>
        <p className="text-xs text-slate-500 dark:text-slate-400">
          Kuchař úrovně ⭐⭐⭐
        </p>
      </div>
      <div className="transform group-hover:rotate-180 transition-transform duration-300">
        <IoSettings className="w-4 h-4 text-slate-400 dark:text-slate-500" />
      </div>
    </div>
  );
});

UserMenuTrigger.displayName = "UserMenuTrigger";
