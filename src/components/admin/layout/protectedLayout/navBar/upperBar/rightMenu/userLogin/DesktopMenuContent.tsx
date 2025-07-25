"use client";

import { useTheme } from "next-themes";
import { FaSignOutAlt, FaUser } from "react-icons/fa";
import { HiMoon, HiSun } from "react-icons/hi";
import { IoIosColorPalette } from "react-icons/io";

import { signOutAction } from "@/actions/admin/auth";
import { DropdownItem, DropdownMenu, Switch } from "@heroui/react";

export default function DesktopMenuContent() {
  const { theme, setTheme } = useTheme();

  const handleValueChangeTheme = (value: boolean) => {
    const newTheme = value ? "light" : "dark";
    setTheme(newTheme);
  };

  return (
    <DropdownMenu>
      <DropdownItem key="profile" startContent={<FaUser />}>
        Profil
      </DropdownItem>
      <DropdownItem
        key="theme"
        isReadOnly
        startContent={<IoIosColorPalette />}
        endContent={
          <Switch
            color="primary"
            size="sm"
            isSelected={theme === "light"}
            onValueChange={handleValueChangeTheme}
            thumbIcon={({ isSelected, className }) =>
              isSelected ? (
                <HiSun className={className} />
              ) : (
                <HiMoon className={className} />
              )
            }
          />
        }
      >
        Režim
      </DropdownItem>
      {/* TODO: Text by m2l b7t v button kv;li a11y */}
      <DropdownItem key="sign-out" isReadOnly>
        <form action={signOutAction} className=" w-full h-full">
          <button
            type="submit"
            className=" w-full h-full text-left flex items-center gap-2"
          >
            {<FaSignOutAlt />}
            <span className="flex-1">Odhlásit se</span>
          </button>
        </form>
      </DropdownItem>
    </DropdownMenu>
  );
}
