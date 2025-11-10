"use client";

import { IoLogOut } from "react-icons/io5";

import { DropdownItem } from "@heroui/react";

/**
 * UserMenuSignOut - Sign out menu item with form
 */
export const UserMenuSignOut = () => {
  return (
    <DropdownItem
      key="signout"
      startContent={
        <div className="w-8 h-8 bg-gradient-to-r from-red-500 to-primary rounded-xl flex items-center justify-center">
          <IoLogOut className="w-4 h-4 text-white" />
        </div>
      }
      className="py-3 px-4 rounded-2xl hover:bg-red-50 dark:hover:bg-red-900/20 text-red-600 dark:text-red-400 transition-all duration-200"
    >
      <form action="/api/auth/signout" method="post" className="w-full">
        <button type="submit" className="w-full text-left">
          <div>
            <p className="font-semibold">Odhlásit se</p>
            <p className="text-xs opacity-75">Ukončit relaci</p>
          </div>
        </button>
      </form>
    </DropdownItem>
  );
};
