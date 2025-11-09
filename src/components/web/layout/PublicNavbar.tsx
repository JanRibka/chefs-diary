"use client";

import { useSession } from "next-auth/react";
import { useTheme } from "next-themes";
import NextLink from "next/link";
import { useState } from "react";
import { GiChefToque, GiScrollQuill } from "react-icons/gi";
// icons moved into inline SVG for the logo
// icons kept elsewhere; logo is handled by SiteLogo
import { HiMoon, HiSun } from "react-icons/hi";
import {
  IoHome,
  IoLogOut,
  IoPerson,
  IoSearch,
  IoSettings,
} from "react-icons/io5";

import SiteLogo from "@/components/ui/SiteLogo";
import webRoutes from "@/lib/routes/webRoutes";
import {
  Avatar,
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Link,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
} from "@heroui/react";

export default function PublicNavbar() {
  const { data: session } = useSession();
  const { theme, setTheme } = useTheme();
  const user = session?.user as { name?: string; image?: string } | undefined;
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <Navbar
      isBordered
      className="bg-background/80 backdrop-blur-md border-b border-divider"
      maxWidth="xl"
    >
      <NavbarBrand>
        <SiteLogo size={20} />
      </NavbarBrand>

      {/* Mobile controls: hamburger and optional simple actions */}
      <div className="flex items-center gap-2 sm:hidden">
        <button
          aria-label="Otevřít menu"
          aria-expanded={mobileOpen}
          onClick={() => setMobileOpen((v) => !v)}
          className="p-2 rounded-md text-foreground hover:bg-background/60 focus:outline-none focus:ring-2 focus:ring-primary"
        >
          {/* simple hamburger icon */}
          <svg
            className="w-6 h-6"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M4 7H20"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <path
              d="M4 12H20"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <path
              d="M4 17H20"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </button>
      </div>

      <NavbarContent className="hidden sm:flex gap-3" justify="center">
        <NavbarItem>
          <Button
            as={NextLink}
            href="/"
            variant="ghost"
            className="px-4 py-2 rounded-full flex items-center gap-2 text-sm text-foreground hover:scale-105 hover:bg-gradient-to-r hover:from-orange-50 hover:to-pink-50 transition-all"
          >
            <IoHome className="w-5 h-5" />
            Domů
          </Button>
        </NavbarItem>

        <NavbarItem>
          <Button
            as={NextLink}
            href="/recipes"
            variant="ghost"
            className="px-4 py-2 rounded-full flex items-center gap-2 text-sm text-foreground hover:scale-105 hover:bg-gradient-to-r hover:from-orange-50 hover:to-pink-50 transition-all"
          >
            <GiChefToque className="w-5 h-5" />
            Recepty
          </Button>
        </NavbarItem>

        <NavbarItem>
          <Button
            as={NextLink}
            href="/categories"
            variant="ghost"
            className="px-4 py-2 rounded-full flex items-center gap-2 text-sm text-foreground hover:scale-105 hover:bg-gradient-to-r hover:from-orange-50 hover:to-pink-50 transition-all"
          >
            <GiScrollQuill className="w-5 h-5" />
            Kategorie
          </Button>
        </NavbarItem>

        <NavbarItem>
          <Button
            as={NextLink}
            href="/about"
            variant="ghost"
            className="px-4 py-2 rounded-full flex items-center gap-2 text-sm text-foreground hover:scale-105 hover:bg-gradient-to-r hover:from-orange-50 hover:to-pink-50 transition-all"
          >
            <IoSearch className="w-5 h-5" />O nás
          </Button>
        </NavbarItem>
      </NavbarContent>

      {/* Mobile menu panel (mobile-first, slide down) */}
      <div
        className={`sm:hidden absolute left-0 right-0 top-full bg-background/95 backdrop-blur-md border-b border-divider transform origin-top transition-all duration-200 ease-in-out ${
          mobileOpen ? "scale-y-100 opacity-100" : "scale-y-0 opacity-0"
        }`}
        aria-hidden={!mobileOpen}
      >
        <div className="px-4 py-3 flex flex-col gap-2">
          {[
            { href: "/", label: "Domů", icon: <IoHome className="w-5 h-5" /> },
            {
              href: "/recipes",
              label: "Recepty",
              icon: <GiChefToque className="w-5 h-5" />,
            },
            {
              href: "/categories",
              label: "Kategorie",
              icon: <GiScrollQuill className="w-5 h-5" />,
            },
            {
              href: "/about",
              label: "O nás",
              icon: <IoSearch className="w-5 h-5" />,
            },
          ].map((it) => (
            <Link
              key={it.href}
              as={NextLink}
              href={it.href}
              className="py-2 rounded-md hover:bg-muted flex items-center gap-3 px-2"
            >
              {it.icon}
              {it.label}
            </Link>
          ))}
        </div>
      </div>

      <NavbarContent justify="end" className="items-center gap-3">
        <NavbarItem>
          <Button
            isIconOnly
            variant="light"
            onPress={() => setTheme(theme === "dark" ? "light" : "dark")}
            aria-label="Přepnout režim"
          >
            {theme === "light" ? (
              <HiMoon className="w-5 h-5" />
            ) : (
              <HiSun className="w-5 h-5" />
            )}
          </Button>
        </NavbarItem>

        <NavbarItem className="hidden sm:flex">
          <Button isIconOnly variant="ghost" aria-label="Hledat">
            <IoSearch className="w-5 h-5" />
          </Button>
        </NavbarItem>

        {session ? (
          <NavbarItem>
            <Dropdown placement="bottom" backdrop="opaque">
              <DropdownTrigger>
                <Avatar
                  src={user?.image}
                  alt={user?.name || "Uživatel"}
                  size="sm"
                />
              </DropdownTrigger>
              <DropdownMenu>
                <DropdownItem key="profile" startContent={<IoPerson />}>
                  Můj profil
                </DropdownItem>
                <DropdownItem key="settings" startContent={<IoSettings />}>
                  Nastavení
                </DropdownItem>
                <DropdownItem key="signout" isReadOnly>
                  <form
                    action="/api/auth/signout"
                    method="post"
                    className="w-full h-full"
                  >
                    <button
                      type="submit"
                      className="w-full h-full text-left flex items-center gap-2"
                    >
                      <IoLogOut className="w-4 h-4" /> Odhlásit se
                    </button>
                  </form>
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </NavbarItem>
        ) : (
          <>
            <NavbarItem className="hidden sm:flex">
              <Button
                as={NextLink}
                href={webRoutes.LogIn}
                variant="light"
                className="font-medium"
              >
                Přihlásit se
              </Button>
            </NavbarItem>
            <NavbarItem>
              <Button
                as={NextLink}
                href={webRoutes.SignUp}
                color="primary"
                variant="solid"
                className="font-medium"
              >
                Registrovat se
              </Button>
            </NavbarItem>
          </>
        )}
      </NavbarContent>
    </Navbar>
  );
}
