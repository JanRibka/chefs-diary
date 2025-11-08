import { AdapterUser } from "next-auth/adapters";
import { useTheme } from "next-themes";
import { FaSignOutAlt, FaUser } from "react-icons/fa";
import { HiMoon, HiSun } from "react-icons/hi";
import { IoIosColorPalette } from "react-icons/io";

import { signOutAction } from "@/actions/admin/auth";
import NavbarMenuItem from "@/components/shared/navbarMenuItem/NavbarMenuItem";
import { NavbarMenu, Switch, User } from "@heroui/react";

export default function MobileMenuContent({
  user,
}: {
  user: AdapterUser | null;
}) {
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
      {/* TODO: Text by m2l b7t v button kv;li a11y */}
      <NavbarMenuItem key="sign-out">
        <form action={signOutAction} className="w-full h-full">
          <button
            type="submit"
            className="w-full h-full text-left flex items-center gap-2"
          >
            {<FaSignOutAlt />}
            <span className="flex-1">Odhlásit se</span>
          </button>
        </form>
      </NavbarMenuItem>
    </NavbarMenu>
  );
}
