"use client";

import { memo } from "react";
import { HiSparkles } from "react-icons/hi2";

import { Avatar, DropdownItem } from "@heroui/react";

import type { UserSession } from "../../../types/UserSession";

interface UserMenuHeaderProps {
  user: UserSession | undefined;
}

/**
 * UserMenuHeader - Profile header in dropdown menu
 */
export const UserMenuHeader = memo(({ user }: UserMenuHeaderProps) => {
  return (
    <DropdownItem
      key="profile-header"
      className="py-4 px-4 cursor-default hover:bg-transparent"
      textValue="Profile Header"
    >
      <div className="flex items-center gap-4">
        <div className="relative">
          <Avatar
            src={user?.image}
            alt={user?.name || "Uživatel"}
            size="lg"
            className="ring-2 ring-primary/40 dark:ring-primary/60"
          />
          <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-gradient-to-r from-primary to-primary-dark rounded-full flex items-center justify-center">
            <HiSparkles className="w-3 h-3 text-white" />
          </div>
        </div>
        <div className="flex-1">
          <p className="font-bold text-lg text-slate-900 dark:text-white">
            {user?.name}
          </p>
          <p className="text-sm text-slate-600 dark:text-slate-400">
            Aktivní kuchař
          </p>
          <div className="flex items-center gap-1 mt-1">
            <span className="text-xs bg-gradient-to-r from-primary to-primary-dark text-white px-2 py-1 rounded-full font-medium">
              ⭐ Level 3
            </span>
          </div>
        </div>
      </div>
    </DropdownItem>
  );
});

UserMenuHeader.displayName = "UserMenuHeader";
