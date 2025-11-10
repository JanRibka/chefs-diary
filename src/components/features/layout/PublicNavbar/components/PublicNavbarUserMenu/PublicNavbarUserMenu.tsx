"use client";

import { memo } from "react";

import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@heroui/react";

import { UserMenuHeader } from "./components/UserMenuHeader";
import { UserMenuItems } from "./components/UserMenuItems";
import { UserMenuSignOut } from "./components/UserMenuSignOut";
import { UserMenuTrigger } from "./components/UserMenuTrigger";

import type { UserSession } from "../../types/UserSession";
interface PublicNavbarUserMenuProps {
  user: UserSession | undefined;
}

/**
 * PublicNavbarUserMenu - User dropdown menu orchestrator
 *
 * Coordinates user menu components: trigger, header, items, and sign out.
 *
 * @param {UserSession | undefined} user - Current user session data
 */
export const PublicNavbarUserMenu = memo(
  ({ user }: PublicNavbarUserMenuProps) => {
    return (
      <Dropdown
        placement="bottom-end"
        className="min-w-[340px] bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-700 shadow-2xl"
      >
        <DropdownTrigger>
          <UserMenuTrigger user={user} />
        </DropdownTrigger>
        <DropdownMenu
          aria-label="User menu"
          className="p-4 rounded-3xl"
          itemClasses={{
            base: "rounded-2xl transition-all duration-200",
          }}
        >
          <UserMenuHeader user={user} />

          <DropdownItem
            key="divider-1"
            className="cursor-default hover:bg-transparent p-0 my-2"
            textValue="Divider"
          >
            <div className="h-px bg-gradient-to-r from-transparent via-slate-200 dark:via-slate-700 to-transparent" />
          </DropdownItem>

          <UserMenuItems />

          <DropdownItem
            key="divider-2"
            className="cursor-default hover:bg-transparent p-0 my-2"
            textValue="Divider"
          >
            <div className="h-px bg-gradient-to-r from-transparent via-slate-200 dark:via-slate-700 to-transparent" />
          </DropdownItem>

          <UserMenuSignOut />
        </DropdownMenu>
      </Dropdown>
    );
  }
);

PublicNavbarUserMenu.displayName = "PublicNavbarUserMenu";
