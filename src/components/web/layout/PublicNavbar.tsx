"use client";

import { useSession } from 'next-auth/react';
import { useTheme } from 'next-themes';
import NextLink from 'next/link';
// icons moved into inline SVG for the logo
import { GiScrollQuill, GiChefToque } from 'react-icons/gi';
import { HiMoon, HiSun } from 'react-icons/hi';
import { IoLogOut, IoPerson, IoSearch, IoSettings } from 'react-icons/io5';

import webRoutes from '@/lib/routes/webRoutes';
import {
    Avatar, Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, Link, Navbar,
    NavbarBrand, NavbarContent, NavbarItem
} from '@heroui/react';

export default function PublicNavbar() {
  const { data: session } = useSession();
  const { theme, setTheme } = useTheme();
  const user = session?.user as { name?: string; image?: string } | undefined;

  return (
    <Navbar
      isBordered
      className="bg-background/80 backdrop-blur-md border-b border-divider"
      maxWidth="xl"
    >
            <NavbarBrand>
        <NextLink href="/" className="flex items-center gap-4">
                    <div className="relative w-20 h-16 shadow-[0_8px_20px_rgba(0,0,0,0.28)]">
            <svg className="absolute inset-0 w-full h-full block" viewBox="0 0 80 64" xmlns="http://www.w3.org/2000/svg" role="img" aria-hidden="true">
              <defs>
                <linearGradient id="blobGrad" x1="0" y1="0" x2="1" y2="1">
                  {/* colors mapped to Tailwind: orange-600, red-600, pink-600 */}
                  <stop offset="0%" stopColor="#EA580C" />
                  <stop offset="50%" stopColor="#DC2626" />
                  <stop offset="100%" stopColor="#DB2777" />
                </linearGradient>
                <filter id="soft" x="-30%" y="-30%" width="160%" height="160%">
                  <feDropShadow dx="0" dy="6" stdDeviation="8" floodOpacity="0.22" />
                </filter>
                <filter id="outerGlow" x="-60%" y="-60%" width="220%" height="220%">
                  <feGaussianBlur stdDeviation="6" result="b" />
                  <feComposite in="b" in2="SourceGraphic" operator="out" result="c" />
                  <feColorMatrix type="matrix" values="0 0 0 0 0.05  0 0 0 0 0.02  0 0 0 0 0.01  0 0 0 0.6"/>
                </filter>
                <g id="chefHatDark">
                  <path d="M22 30c-1-3 1-5 5-5 1-4 6-6 11-5 4 1 5 4 5 6 5 0 7 2 5 6-2 4-20 7-24 0z" fill="#FFFFFF" />
                </g>
                <pattern id="stripesDark" width="6" height="6" patternUnits="userSpaceOnUse" patternTransform="rotate(30)">
                  <rect width="3" height="6" fill="rgba(255,255,255,0.03)" />
                </pattern>
                <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
                  <feGaussianBlur stdDeviation="2.2" result="coloredBlur" />
                  <feMerge>
                    <feMergeNode in="coloredBlur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>

              <path d="M5 20C5 10 18 5 30 8C45 12 68 5 75 22C82 39 68 58 48 57C30 56 12 54 8 40C5 30 5 30 5 20Z" fill="url(#blobGrad)" filter="url(#soft) url(#outerGlow)" />
              {/* ellipse removed to restore original blob visibility */}
            </svg>

            <div className="relative z-10 flex items-center justify-center w-full h-full drop-shadow-[0_6px_12px_rgba(0,0,0,0.4)]">
              <GiScrollQuill className="w-8 h-8 text-white" />
              <GiChefToque className="w-8 h-8 text-white -ml-1" />
            </div>
          </div>
          <div className="flex flex-col">
            <span className="font-black text-xl leading-tight tracking-wide bg-gradient-to-r from-orange-600 via-red-600 to-pink-600 bg-clip-text text-transparent">
              KUCHAŘŮV
            </span>
            <span className="font-bold text-base leading-tight tracking-wide bg-gradient-to-r from-orange-600 via-red-600 to-pink-600 bg-clip-text text-transparent -mt-1">
              DENÍK
            </span>
          </div>
        </NextLink>
      </NavbarBrand>

      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavbarItem>
          <Link
            as={NextLink}
            href="/"
            color="foreground"
            className="hover:text-primary transition-colors"
          >
            Domů
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link
            as={NextLink}
            href="/recipes"
            color="foreground"
            className="hover:text-primary transition-colors"
          >
            Recepty
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link
            as={NextLink}
            href="/categories"
            color="foreground"
            className="hover:text-primary transition-colors"
          >
            Kategorie
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link
            as={NextLink}
            href="/about"
            color="foreground"
            className="hover:text-primary transition-colors"
          >
            O nás
          </Link>
        </NavbarItem>
      </NavbarContent>

      <NavbarContent justify="end" className="items-center gap-3">
        <NavbarItem>
          <Button
            isIconOnly
            variant="light"
            onPress={() => setTheme(theme === "dark" ? "light" : "dark")}
            aria-label="Přepnout režim"
          >
            {theme === "light" ? <HiMoon className="w-5 h-5" /> : <HiSun className="w-5 h-5" />}
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
                <Avatar src={user?.image} alt={user?.name || 'Uživatel'} size="sm" />
              </DropdownTrigger>
              <DropdownMenu>
                <DropdownItem key="profile" startContent={<IoPerson />}>Můj profil</DropdownItem>
                <DropdownItem key="settings" startContent={<IoSettings />}>Nastavení</DropdownItem>
                <DropdownItem key="signout" isReadOnly>
                  <form action="/api/auth/signout" method="post" className="w-full h-full">
                    <button type="submit" className="w-full h-full text-left flex items-center gap-2">
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
              <Button as={NextLink} href={webRoutes.LogIn} variant="light" className="font-medium">
                Přihlásit se
              </Button>
            </NavbarItem>
            <NavbarItem>
              <Button as={NextLink} href={webRoutes.SignUp} color="primary" variant="solid" className="font-medium">
                Registrovat se
              </Button>
            </NavbarItem>
          </>
        )}
      </NavbarContent>
    </Navbar>
  );
}
