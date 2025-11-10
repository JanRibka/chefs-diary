"use client";

import { memo } from "react";
import { IoSettings } from "react-icons/io5";

import { DropdownItem } from "@heroui/react";

/**
 * UserMenuItems - Main menu navigation items
 */
export const UserMenuItems = memo(() => {
  return (
    <>
      <DropdownItem
        key="recipes"
        startContent={
          <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center">
            <span className="text-white text-sm">👨‍🍳</span>
          </div>
        }
        className="py-3 px-4 rounded-2xl hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all duration-200"
      >
        <div>
          <p className="font-semibold text-slate-900 dark:text-white">
            Moje recepty
          </p>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Spravovat vaše recepty
          </p>
        </div>
      </DropdownItem>

      <DropdownItem
        key="favorites"
        startContent={
          <div className="w-8 h-8 bg-gradient-to-r from-pink-500 to-red-500 rounded-xl flex items-center justify-center">
            <span className="text-white text-sm">❤️</span>
          </div>
        }
        className="py-3 px-4 rounded-2xl hover:bg-pink-50 dark:hover:bg-pink-900/20 transition-all duration-200"
      >
        <div>
          <p className="font-semibold text-slate-900 dark:text-white">
            Oblíbené
          </p>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Uložené recepty
          </p>
        </div>
      </DropdownItem>

      <DropdownItem
        key="settings"
        startContent={
          <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-xl flex items-center justify-center">
            <IoSettings className="w-4 h-4 text-white" />
          </div>
        }
        className="py-3 px-4 rounded-2xl hover:bg-purple-50 dark:hover:bg-purple-900/20 transition-all duration-200"
      >
        <div>
          <p className="font-semibold text-slate-900 dark:text-white">
            Nastavení
          </p>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Upravit profil a předvolby
          </p>
        </div>
      </DropdownItem>
    </>
  );
});

UserMenuItems.displayName = "UserMenuItems";
