"use client";

import { useSession } from "next-auth/react";
import { useTheme } from "next-themes";
import NextLink from "next/link";
import { useEffect, useState } from "react";
import { GiChefToque, GiScrollQuill } from "react-icons/gi";
import { HiMoon, HiSun } from "react-icons/hi";
import { HiSparkles } from "react-icons/hi2";
import {
  IoClose,
  IoLogOut,
  IoMenu,
  IoPerson,
  IoSearch,
  IoSettings,
} from "react-icons/io5";

import webRoutes from "@/lib/routes/webRoutes";
import {
  Avatar,
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  useDisclosure,
} from "@heroui/react";

export default function PublicNavbar() {
  const { data: session } = useSession();
  const { theme, setTheme } = useTheme();
  const user = session?.user as { name?: string; image?: string } | undefined;
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu when clicking outside or on link
  useEffect(() => {
    const handleClickOutside = () => setMobileOpen(false);
    if (mobileOpen) {
      document.addEventListener("click", handleClickOutside);
      return () => document.removeEventListener("click", handleClickOutside);
    }
  }, [mobileOpen]);

  return (
    <>
      {/* Main Navigation */}
      <nav
        className={`
        transition-all duration-300 ease-out
        ${
          scrolled
            ? "backdrop-blur-xl bg-white/90 dark:bg-slate-900/90 shadow-lg shadow-black/5 border-b border-white/20 dark:border-slate-800/40"
            : "backdrop-blur-md bg-white/70 dark:bg-slate-900/70 border-b border-white/10 dark:border-slate-800/20"
        }
      `}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo Section */}
            <div className="flex items-center">
              <NextLink href="/" className="flex items-center gap-3 group">
                {/* Enhanced Logo with 3D effect */}
                <div className="relative">
                  <div className="w-12 h-12 lg:w-14 lg:h-14 bg-gradient-to-br from-orange-500 via-red-500 to-pink-600 rounded-2xl shadow-xl shadow-orange-500/25 group-hover:shadow-orange-500/40 transition-all duration-300 flex items-center justify-center transform group-hover:scale-105 group-hover:rotate-3">
                    <div className="relative">
                      <GiScrollQuill className="w-6 h-6 lg:w-7 lg:h-7 text-white drop-shadow-lg" />
                      <GiChefToque className="w-5 h-5 lg:w-6 lg:h-6 text-white absolute -top-1 -right-1 drop-shadow-lg" />
                      <HiSparkles className="w-3 h-3 text-yellow-200 absolute -top-2 -right-2 animate-pulse" />
                    </div>
                  </div>
                  {/* Glow effect */}
                  <div className="absolute inset-0 w-12 h-12 lg:w-14 lg:h-14 bg-gradient-to-br from-orange-500 to-red-500 rounded-2xl blur-xl opacity-30 group-hover:opacity-50 transition-opacity duration-300 -z-10" />
                </div>

                {/* Brand Text */}
                <div className="hidden sm:flex flex-col">
                  <span className="font-black text-lg lg:text-xl leading-tight tracking-wide bg-gradient-to-r from-orange-600 via-red-600 to-pink-600 bg-clip-text text-transparent">
                    KUCHAŘŮV
                  </span>
                  <span className="font-bold text-sm lg:text-base leading-tight tracking-wide bg-gradient-to-r from-orange-600 via-red-600 to-pink-600 bg-clip-text text-transparent -mt-1">
                    DENÍK
                  </span>
                </div>
              </NextLink>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-8">
              {[
                { href: "/", label: "Domů" },
                { href: "/recipes", label: "Recepty" },
                { href: "/categories", label: "Kategorie" },
                { href: "/about", label: "O nás" },
              ].map((item) => (
                <NextLink
                  key={item.href}
                  href={item.href}
                  className="relative px-3 py-2 text-sm font-medium text-slate-700 dark:text-slate-300 hover:text-orange-600 dark:hover:text-orange-400 transition-colors duration-200 group"
                >
                  {item.label}
                  <span className="absolute inset-x-0 bottom-0 h-0.5 bg-gradient-to-r from-orange-500 to-red-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-200" />
                </NextLink>
              ))}
            </div>

            {/* Right Section */}
            <div className="flex items-center gap-2 lg:gap-4">
              {/* Search Button */}
              <Button
                isIconOnly
                variant="light"
                size="sm"
                onPress={onOpen}
                className="hidden sm:flex hover:bg-orange-100 dark:hover:bg-orange-900/20 transition-colors"
                aria-label="Hledat"
              >
                <IoSearch className="w-5 h-5 text-slate-600 dark:text-slate-400" />
              </Button>

              {/* Theme Toggle */}
              <Button
                isIconOnly
                variant="light"
                size="sm"
                onPress={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="hover:bg-orange-100 dark:hover:bg-orange-900/20 transition-colors"
                aria-label="Přepnout režim"
              >
                {theme === "light" ? (
                  <HiMoon className="w-5 h-5 text-slate-600 dark:text-slate-400" />
                ) : (
                  <HiSun className="w-5 h-5 text-orange-500" />
                )}
              </Button>

              {/* User Menu / Auth Buttons */}
              {session ? (
                <Dropdown placement="bottom-end" backdrop="blur">
                  <DropdownTrigger>
                    <div className="flex items-center gap-2 cursor-pointer hover:opacity-80 transition-opacity">
                      <Avatar
                        src={user?.image}
                        alt={user?.name || "Uživatel"}
                        size="sm"
                        className="ring-2 ring-orange-200 dark:ring-orange-800 hover:ring-orange-300 dark:hover:ring-orange-700 transition-all"
                      />
                      <span className="hidden md:block text-sm font-medium text-slate-700 dark:text-slate-300">
                        {user?.name}
                      </span>
                    </div>
                  </DropdownTrigger>
                  <DropdownMenu className="w-64">
                    <DropdownItem
                      key="profile"
                      startContent={<IoPerson className="w-4 h-4" />}
                      className="py-3"
                    >
                      <div>
                        <p className="font-medium">{user?.name}</p>
                        <p className="text-xs text-default-500">
                          Zobrazit profil
                        </p>
                      </div>
                    </DropdownItem>
                    <DropdownItem
                      key="settings"
                      startContent={<IoSettings className="w-4 h-4" />}
                    >
                      Nastavení
                    </DropdownItem>
                    <DropdownItem
                      key="signout"
                      startContent={<IoLogOut className="w-4 h-4" />}
                      className="text-danger"
                      color="danger"
                    >
                      <form
                        action="/api/auth/signout"
                        method="post"
                        className="w-full"
                      >
                        <button type="submit" className="w-full text-left">
                          Odhlásit se
                        </button>
                      </form>
                    </DropdownItem>
                  </DropdownMenu>
                </Dropdown>
              ) : (
                <div className="flex items-center gap-2">
                  <Button
                    as={NextLink}
                    href={webRoutes.LogIn}
                    variant="light"
                    size="sm"
                    className="hidden sm:flex font-medium hover:bg-orange-100 dark:hover:bg-orange-900/20"
                  >
                    Přihlásit se
                  </Button>
                  <Button
                    as={NextLink}
                    href={webRoutes.SignUp}
                    size="sm"
                    className="bg-gradient-to-r from-orange-500 to-red-500 text-white font-medium shadow-lg hover:shadow-xl hover:from-orange-600 hover:to-red-600 transition-all duration-200"
                  >
                    Registrovat se
                  </Button>
                </div>
              )}

              {/* Mobile Menu Button */}
              <Button
                isIconOnly
                variant="light"
                size="sm"
                onPress={() => setMobileOpen(!mobileOpen)}
                className="lg:hidden hover:bg-orange-100 dark:hover:bg-orange-900/20 transition-colors"
                aria-label="Menu"
              >
                {mobileOpen ? (
                  <IoClose className="w-5 h-5 text-slate-600 dark:text-slate-400" />
                ) : (
                  <IoMenu className="w-5 h-5 text-slate-600 dark:text-slate-400" />
                )}
              </Button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={`
          lg:hidden absolute top-full left-0 right-0 backdrop-blur-xl bg-white/95 dark:bg-slate-900/95 border-b border-white/20 dark:border-slate-800/40 shadow-lg
          transition-all duration-300 ease-out transform-gpu
          ${
            mobileOpen
              ? "opacity-100 translate-y-0"
              : "opacity-0 -translate-y-4 pointer-events-none"
          }
        `}
        >
          <div className="px-4 py-6 space-y-4">
            {/* Mobile Search */}
            <div className="sm:hidden">
              <Input
                placeholder="Hledat recepty..."
                startContent={<IoSearch className="w-4 h-4 text-default-400" />}
                classNames={{
                  input: "text-sm",
                  inputWrapper:
                    "bg-default-100 hover:bg-default-200 transition-colors",
                }}
              />
            </div>

            {/* Mobile Navigation Links */}
            <div className="space-y-2">
              {[
                { href: "/", label: "Domů" },
                { href: "/recipes", label: "Recepty" },
                { href: "/categories", label: "Kategorie" },
                { href: "/about", label: "O nás" },
              ].map((item) => (
                <NextLink
                  key={item.href}
                  href={item.href}
                  className="block px-4 py-3 text-base font-medium text-slate-700 dark:text-slate-300 hover:text-orange-600 dark:hover:text-orange-400 hover:bg-orange-50 dark:hover:bg-orange-900/10 rounded-lg transition-all duration-200"
                  onClick={() => setMobileOpen(false)}
                >
                  {item.label}
                </NextLink>
              ))}
            </div>

            {/* Mobile Auth Buttons */}
            {!session && (
              <div className="flex flex-col gap-3 pt-4 border-t border-default-200 dark:border-default-700">
                <Button
                  as={NextLink}
                  href={webRoutes.LogIn}
                  variant="bordered"
                  className="w-full border-default-300 hover:border-orange-500 hover:text-orange-600 transition-colors"
                  onClick={() => setMobileOpen(false)}
                >
                  Přihlásit se
                </Button>
                <Button
                  as={NextLink}
                  href={webRoutes.SignUp}
                  className="w-full bg-gradient-to-r from-orange-500 to-red-500 text-white font-medium"
                  onClick={() => setMobileOpen(false)}
                >
                  Registrovat se
                </Button>
              </div>
            )}
          </div>
        </div>
      </nav>

      {/* Search Modal */}
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        backdrop="blur"
        size="2xl"
        placement="top"
        classNames={{
          backdrop: "bg-black/50",
          wrapper: "pt-20",
          base: "bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl border border-white/20 dark:border-slate-800/40",
        }}
      >
        <ModalContent>
          <ModalBody className="py-8">
            <div className="space-y-6">
              <div className="text-center">
                <h3 className="text-2xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent mb-2">
                  Hledat recepty
                </h3>
                <p className="text-default-600">
                  Objevte tisíce skvělých receptů
                </p>
              </div>

              <Input
                placeholder="Napište název receptu, ingredienci nebo kategorii..."
                startContent={<IoSearch className="w-5 h-5 text-default-400" />}
                size="lg"
                classNames={{
                  input: "text-lg",
                  inputWrapper:
                    "bg-default-100 hover:bg-default-200 border-2 border-transparent focus-within:border-orange-500 transition-all duration-200 shadow-lg",
                }}
                autoFocus
              />

              <div className="flex flex-wrap gap-2">
                {[
                  "Hlavní chody",
                  "Dezerty",
                  "Snídaně",
                  "Vegetariánské",
                  "Rychlé recepty",
                ].map((tag) => (
                  <Button
                    key={tag}
                    size="sm"
                    variant="flat"
                    className="bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300 hover:bg-orange-200 dark:hover:bg-orange-900/50 transition-colors"
                  >
                    {tag}
                  </Button>
                ))}
              </div>
            </div>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
