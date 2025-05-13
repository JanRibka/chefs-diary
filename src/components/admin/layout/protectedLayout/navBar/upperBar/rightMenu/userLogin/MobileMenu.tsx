"use client";

import { AdapterUser } from 'next-auth/adapters';
import { useTheme } from 'next-themes';
// import { useTheme } from 'next-themes';
import { useState } from 'react';
import { FaSignOutAlt, FaUser } from 'react-icons/fa';
import { HiMoon, HiSun } from 'react-icons/hi';
import { IoIosColorPalette } from 'react-icons/io';

import { signOutAction } from '@/actions/admin/auth';
import NavbarMenuItem from '@/components/shared/navbarMenuItem/NavbarMenuItem';
import { useUserContext } from '@/context/UserContext';
import { mergeStyles } from '@/lib/utils/styles';
import {
    Avatar, Navbar, NavbarContent, NavbarMenu, NavbarProps, Switch, User
} from '@heroui/react';

const UserLogin = ({ className, ...restProps }: NavbarProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const { user } = useUserContext();

  const handleClickOpen = () => {
    setIsMenuOpen((prev) => !prev);
  };

  return (
    <Navbar
      isMenuOpen={isMenuOpen}
      className={mergeStyles("", className)}
      {...restProps}
    >
      <NavbarContent>
        <Avatar
          isBordered={!!user?.image}
          as="button"
          className="md:hidden"
          onClick={handleClickOpen}
        />
      </NavbarContent>

      <NavbarMenuContent user={user} />
    </Navbar>
  );
};

export default UserLogin;

function NavbarMenuContent({ user }: { user: AdapterUser | null }) {
  const { theme, setTheme } = useTheme();

  const handleValueChangeTheme = (value: boolean) => {
    const newTheme = value ? "light" : "dark";
    setTheme(newTheme);
  };

  return (
    <NavbarMenu>
      <NavbarMenuItem key="user">
        <User
          avatarProps={{
            isBordered: !!user?.image,
            src: user?.image ?? "",
          }}
          description={user?.email ?? ""}
          name={user?.name ?? ""}
        />
      </NavbarMenuItem>
      <NavbarMenuItem key="profile" startContent={<FaUser />}>
        Profil
      </NavbarMenuItem>
      <NavbarMenuItem
        key="theme"
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
      </NavbarMenuItem>

      <NavbarMenuItem
        key="sign-out"
        startContent={<FaSignOutAlt />}
        className="relative"
      >
        <form action={signOutAction} className="w-full h-full">
          <button
            type="submit"
            className="absolute left-0 top-0 w-full h-full text-left"
          />
          Odhlásit se
        </form>
      </NavbarMenuItem>
    </NavbarMenu>
  );
}
