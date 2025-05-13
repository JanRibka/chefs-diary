"use client";

import { useTheme } from 'next-themes';
import { FaSignOutAlt, FaUser } from 'react-icons/fa';
import { HiMoon, HiSun } from 'react-icons/hi';
import { IoIosColorPalette } from 'react-icons/io';

import { signOutAction } from '@/actions/admin/auth';
import User from '@/components/shared/user/User';
import { useUserContext } from '@/context/UserContext';
import { mergeStyles } from '@/lib/utils/styles';
import {
    Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, DropdownTriggerProps, Switch
} from '@heroui/react';

const DesktopMenu = ({ className, ...restProps }: DropdownTriggerProps) => {
  const { user } = useUserContext();

  return (
    <Dropdown placement="bottom" backdrop="opaque">
      <DropdownTrigger className={mergeStyles("", className)} {...restProps}>
        <User
          as="button"
          avatarProps={{
            isBordered: !!user?.image,
            src: user?.image ?? "",
          }}
          description={user?.email ?? ""}
          name={user?.name ?? ""}
        />
      </DropdownTrigger>
      <DropdownMenuContent />
    </Dropdown>
  );
};

export default DesktopMenu;

function DropdownMenuContent() {
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
        className="relative"
      >
        <form action={signOutAction} className=" w-full h-full">
          <button
            type="submit"
            className="absolute left-0 top-0 w-full h-full text-left"
          />
          Odhlásit se
        </form>
      </DropdownItem>
    </DropdownMenu>
  );
}
