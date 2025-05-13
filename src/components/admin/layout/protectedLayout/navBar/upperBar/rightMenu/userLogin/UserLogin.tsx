"use client";

import { useTheme } from "next-themes";
import { FaSignOutAlt, FaUser } from "react-icons/fa";
import { HiMoon, HiSun } from "react-icons/hi";
import { IoIosColorPalette } from "react-icons/io";

import { signOutAction } from "@/actions/admin/auth";
import User from "@/components/shared/user/User";
import { useUserContext } from "@/context/UserContext";
import {
  Avatar,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Switch,
} from "@heroui/react";

const UserLogin = () => {
  const { user } = useUserContext();
  const { theme, setTheme } = useTheme();

  const handleValueChangeTheme = (value: boolean) => {
    const newTheme = value ? "light" : "dark";
    setTheme(newTheme);
  };

  // TODO: Rozdělit to všechno do různých kompnent
  // TODO: delat mobilní menu. Bude tam bocní panel a uvnitř i User
  return (
    <div className="cursor-pointer flex items-center">
      <Dropdown placement="bottom" backdrop="opaque">
        <DropdownTrigger>
          <div>
            <Avatar
              isBordered={!!user?.image}
              as="button"
              className="md:hidden"
            />
            <User
              className="hidden md:inline-flex"
              as="button"
              avatarProps={{
                isBordered: !!user?.image,
                src: user?.image ?? "",
              }}
              description={user?.email ?? ""}
              name={user?.name ?? ""}
            />
          </div>
        </DropdownTrigger>
        <form action={signOutAction}>
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
                  defaultSelected
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

            <DropdownItem
              key="sign-out"
              startContent={<FaSignOutAlt />}
              isReadOnly
            >
              <button type="submit" className="w-full h-full text-left">
                Odhlásit
              </button>
            </DropdownItem>
          </DropdownMenu>
        </form>
      </Dropdown>
    </div>
  );
};

export default UserLogin;
