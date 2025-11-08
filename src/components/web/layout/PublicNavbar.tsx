"use client";

import { useSession } from "next-auth/react";
import { useTheme } from "next-themes";
import NextLink from "next/link";
import { useEffect, useState } from "react";
import { GiChefToque, GiScrollQuill } from "react-icons/gi";
import { HiMoon, HiSun } from "react-icons/hi";
import { HiSparkles } from "react-icons/hi2";
import {
  IoArrowForward,
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

            {/* Desktop Navigation - Ultra Modern */}
            <div className="hidden lg:flex items-center space-x-2">
              {[
                {
                  href: "/",
                  label: "Domů",
                  icon: "🏠",
                  description: "Hlavní stránka",
                },
                {
                  href: "/recipes",
                  label: "Recepty",
                  icon: "👨‍🍳",
                  description: "Tisíce receptů",
                },
                {
                  href: "/categories",
                  label: "Kategorie",
                  icon: "📂",
                  description: "Procházet podle typu",
                },
                {
                  href: "/about",
                  label: "O nás",
                  icon: "✨",
                  description: "Naše příběh",
                },
              ].map((item, index) => (
                <div key={item.href} className="relative group">
                  <NextLink
                    href={item.href}
                    className="relative px-6 py-3 text-sm font-semibold text-slate-700 dark:text-slate-300 transition-all duration-300 rounded-2xl overflow-hidden group-hover:text-white"
                  >
                    {/* Background hover effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 opacity-0 group-hover:opacity-100 transition-all duration-300 transform scale-x-0 group-hover:scale-x-100 origin-left" />

                    {/* Shimmer effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transform -skew-x-12 translate-x-full group-hover:translate-x-[-200%] transition-transform duration-700" />

                    {/* Glow effect */}
                    <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-60 transition-opacity duration-300 bg-gradient-to-r from-orange-500/20 via-red-500/20 to-pink-500/20 blur-xl transform scale-150" />

                    {/* Content */}
                    <div className="relative flex items-center gap-2 transform group-hover:scale-105 transition-transform duration-200">
                      <span
                        className="text-lg group-hover:animate-bounce"
                        style={{ animationDelay: `${index * 0.1}s` }}
                      >
                        {item.icon}
                      </span>
                      <span className="font-medium tracking-wide">
                        {item.label}
                      </span>
                    </div>

                    {/* Bottom indicator */}
                    <div className="absolute bottom-0 left-1/2 w-0 h-1 bg-gradient-to-r from-orange-400 to-red-400 group-hover:w-full transition-all duration-300 transform -translate-x-1/2 rounded-full" />
                  </NextLink>

                  {/* Tooltip */}
                  <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 px-3 py-2 bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-xs font-medium rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-200 pointer-events-none backdrop-blur-sm shadow-xl border border-white/10">
                    <div className="flex items-center gap-2">
                      <span>{item.icon}</span>
                      <span>{item.description}</span>
                    </div>
                    {/* Tooltip arrow */}
                    <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-slate-900 dark:bg-white rotate-45" />
                  </div>
                </div>
              ))}
            </div>

            {/* Right Section - Enhanced */}
            <div className="flex items-center gap-3 lg:gap-4">
              {/* Search Button with enhanced effects */}
              <div className="relative group">
                <Button
                  isIconOnly
                  variant="light"
                  size="lg"
                  onPress={onOpen}
                  className="hidden sm:flex relative overflow-hidden rounded-2xl transition-all duration-300 hover:bg-gradient-to-r hover:from-orange-100 hover:to-red-100 dark:hover:from-orange-900/30 dark:hover:to-red-900/30 group-hover:scale-110 group-hover:shadow-lg"
                  aria-label="Hledat"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-orange-500/20 to-red-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl" />
                  <IoSearch className="w-6 h-6 text-slate-600 dark:text-slate-400 group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-all duration-300 group-hover:scale-110 relative z-10" />
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent opacity-0 group-hover:opacity-100 transform -translate-x-full group-hover:translate-x-full transition-transform duration-500" />
                </Button>
                {/* Pulse ring */}
                <div className="absolute inset-0 rounded-2xl bg-orange-500/30 animate-ping opacity-0 group-hover:opacity-75 transition-opacity duration-300" />
              </div>

              {/* Theme Toggle with enhanced effects */}
              <div className="relative group">
                <Button
                  isIconOnly
                  variant="light"
                  size="lg"
                  onPress={() => setTheme(theme === "dark" ? "light" : "dark")}
                  className="relative overflow-hidden rounded-2xl transition-all duration-300 hover:bg-gradient-to-r hover:from-yellow-100 hover:to-orange-100 dark:hover:from-blue-900/30 dark:hover:to-purple-900/30 group-hover:scale-110 group-hover:shadow-lg"
                  aria-label="Přepnout režim"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 dark:from-blue-500/20 dark:to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl" />
                  <div className="relative z-10 transition-all duration-500 group-hover:rotate-180">
                    {theme === "light" ? (
                      <HiMoon className="w-6 h-6 text-slate-600 dark:text-slate-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300" />
                    ) : (
                      <HiSun className="w-6 h-6 text-orange-500 group-hover:text-yellow-500 transition-colors duration-300" />
                    )}
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent opacity-0 group-hover:opacity-100 transform -translate-x-full group-hover:translate-x-full transition-transform duration-500" />
                </Button>
                {/* Glow effect */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-yellow-500/40 to-orange-500/40 dark:from-blue-500/40 dark:to-purple-500/40 opacity-0 group-hover:opacity-60 transition-opacity duration-300 blur-xl scale-150" />
              </div>

              {/* User Menu / Auth Buttons - Enhanced */}
              {session ? (
                <div className="relative group">
                  <Dropdown placement="bottom-end" backdrop="blur">
                    <DropdownTrigger>
                      <div className="flex items-center gap-3 cursor-pointer transition-all duration-300 group-hover:scale-105 px-3 py-2 rounded-2xl hover:bg-gradient-to-r hover:from-orange-50 hover:to-red-50 dark:hover:from-orange-900/20 dark:hover:to-red-900/20">
                        <div className="relative">
                          <Avatar
                            src={user?.image}
                            alt={user?.name || "Uživatel"}
                            size="md"
                            className="ring-3 ring-orange-200 dark:ring-orange-800 hover:ring-orange-300 dark:hover:ring-orange-700 transition-all duration-300 group-hover:ring-4 group-hover:ring-orange-400 dark:group-hover:ring-orange-600"
                          />
                          {/* Online indicator */}
                          <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white dark:border-slate-900 animate-pulse" />
                          {/* Glow effect */}
                          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-orange-500/30 to-red-500/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-lg scale-150" />
                        </div>
                        <div className="hidden md:block">
                          <p className="text-sm font-semibold text-slate-700 dark:text-slate-300 group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors duration-200">
                            {user?.name}
                          </p>
                          <p className="text-xs text-slate-500 dark:text-slate-400">
                            Kuchař úrovně ⭐⭐⭐
                          </p>
                        </div>
                        <div className="transform group-hover:rotate-180 transition-transform duration-300">
                          <IoSettings className="w-4 h-4 text-slate-400 dark:text-slate-500" />
                        </div>
                      </div>
                    </DropdownTrigger>
                    <DropdownMenu
                      className="w-80 p-2"
                      classNames={{
                        base: "bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl border border-white/20 dark:border-slate-800/50 shadow-2xl rounded-3xl",
                      }}
                    >
                      {/* Profile Header */}
                      <DropdownItem
                        key="profile-header"
                        className="py-4 px-4 cursor-default hover:bg-transparent"
                        textValue="Profile Header"
                      >
                        <div className="flex items-center gap-4">
                          <div className="relative">
                            <Avatar
                              src={user?.image}
                              alt={user?.name || "Uživatel"}
                              size="lg"
                              className="ring-2 ring-orange-300 dark:ring-orange-700"
                            />
                            <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center">
                              <HiSparkles className="w-3 h-3 text-white" />
                            </div>
                          </div>
                          <div className="flex-1">
                            <p className="font-bold text-lg text-slate-900 dark:text-white">
                              {user?.name}
                            </p>
                            <p className="text-sm text-slate-600 dark:text-slate-400">
                              Aktivní kuchař
                            </p>
                            <div className="flex items-center gap-1 mt-1">
                              <span className="text-xs bg-gradient-to-r from-orange-500 to-red-500 text-white px-2 py-1 rounded-full font-medium">
                                ⭐ Level 3
                              </span>
                            </div>
                          </div>
                        </div>
                      </DropdownItem>

                      {/* Divider with gradient */}
                      <div className="my-2 h-px bg-gradient-to-r from-transparent via-orange-300 to-transparent dark:via-orange-700" />

                      {/* Menu Items */}
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

                      {/* Divider */}
                      <div className="my-2 h-px bg-gradient-to-r from-transparent via-slate-300 to-transparent dark:via-slate-700" />

                      <DropdownItem
                        key="signout"
                        startContent={
                          <div className="w-8 h-8 bg-gradient-to-r from-red-500 to-orange-500 rounded-xl flex items-center justify-center">
                            <IoLogOut className="w-4 h-4 text-white" />
                          </div>
                        }
                        className="py-3 px-4 rounded-2xl hover:bg-red-50 dark:hover:bg-red-900/20 text-red-600 dark:text-red-400 transition-all duration-200"
                      >
                        <form
                          action="/api/auth/signout"
                          method="post"
                          className="w-full"
                        >
                          <button type="submit" className="w-full text-left">
                            <div>
                              <p className="font-semibold">Odhlásit se</p>
                              <p className="text-xs opacity-75">
                                Ukončit relaci
                              </p>
                            </div>
                          </button>
                        </form>
                      </DropdownItem>
                    </DropdownMenu>
                  </Dropdown>
                </div>
              ) : (
                <div className="flex items-center gap-3">
                  {/* Login Button - Enhanced */}
                  <div className="relative group">
                    <Button
                      as={NextLink}
                      href={webRoutes.LogIn}
                      variant="light"
                      size="lg"
                      className="hidden sm:flex font-semibold px-6 py-3 rounded-2xl border-2 border-transparent hover:border-orange-200 dark:hover:border-orange-800 hover:bg-gradient-to-r hover:from-orange-50 hover:to-red-50 dark:hover:from-orange-900/20 dark:hover:to-red-900/20 transition-all duration-300 group-hover:scale-105 overflow-hidden"
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-orange-500/10 to-red-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      <span className="relative flex items-center gap-2">
                        <IoPerson className="w-5 h-5 group-hover:scale-110 transition-transform duration-200" />
                        Přihlásit se
                      </span>
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transform -translate-x-full group-hover:translate-x-full transition-transform duration-500" />
                    </Button>
                    {/* Subtle glow */}
                    <div className="absolute inset-0 rounded-2xl bg-orange-500/20 opacity-0 group-hover:opacity-60 transition-opacity duration-300 blur-xl scale-110" />
                  </div>

                  {/* Register Button - Premium */}
                  <div className="relative group">
                    <Button
                      as={NextLink}
                      href={webRoutes.SignUp}
                      size="lg"
                      className="relative px-8 py-3 bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 text-white font-bold rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 group-hover:scale-105 overflow-hidden"
                    >
                      {/* Animated background */}
                      <div className="absolute inset-0 bg-gradient-to-r from-orange-600 via-red-600 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                      {/* Shimmer effect */}
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent opacity-0 group-hover:opacity-100 transform -translate-x-full group-hover:translate-x-full transition-transform duration-700" />

                      {/* Content */}
                      <span className="relative flex items-center gap-2">
                        <HiSparkles className="w-5 h-5 group-hover:animate-spin transition-transform duration-500" />
                        <span className="tracking-wide">Registrovat se</span>
                        <IoArrowForward className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
                      </span>
                    </Button>

                    {/* Enhanced glow */}
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-orange-500/40 via-red-500/40 to-pink-500/40 opacity-0 group-hover:opacity-80 transition-opacity duration-300 blur-xl scale-125" />

                    {/* Pulse ring */}
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-orange-500 to-red-500 animate-ping opacity-0 group-hover:opacity-30 transition-opacity duration-300" />
                  </div>
                </div>
              )}

              {/* Mobile Menu Button - Enhanced */}
              <div className="relative group lg:hidden">
                <Button
                  isIconOnly
                  variant="light"
                  size="lg"
                  onPress={() => setMobileOpen(!mobileOpen)}
                  className="relative overflow-hidden rounded-2xl transition-all duration-300 hover:bg-gradient-to-r hover:from-orange-100 hover:to-red-100 dark:hover:from-orange-900/30 dark:hover:to-red-900/30 group-hover:scale-110 group-hover:shadow-lg"
                  aria-label="Menu"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-orange-500/20 to-red-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl" />
                  <div className="relative z-10 transition-all duration-300">
                    {mobileOpen ? (
                      <IoClose className="w-6 h-6 text-slate-600 dark:text-slate-400 group-hover:text-red-600 dark:group-hover:text-red-400 transition-colors duration-300 group-hover:rotate-90" />
                    ) : (
                      <IoMenu className="w-6 h-6 text-slate-600 dark:text-slate-400 group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors duration-300" />
                    )}
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent opacity-0 group-hover:opacity-100 transform -translate-x-full group-hover:translate-x-full transition-transform duration-500" />
                </Button>
                {/* Animated indicator dots */}
                <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 flex gap-1">
                  <div
                    className={`w-1 h-1 rounded-full transition-all duration-300 ${
                      mobileOpen ? "bg-red-500 scale-125" : "bg-orange-500"
                    }`}
                  />
                  <div
                    className={`w-1 h-1 rounded-full transition-all duration-300 ${
                      mobileOpen ? "bg-red-500 scale-125" : "bg-orange-500"
                    }`}
                    style={{ animationDelay: "0.1s" }}
                  />
                  <div
                    className={`w-1 h-1 rounded-full transition-all duration-300 ${
                      mobileOpen ? "bg-red-500 scale-125" : "bg-orange-500"
                    }`}
                    style={{ animationDelay: "0.2s" }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Menu - Ultra Modern */}
        <div
          className={`
          lg:hidden absolute top-full left-0 right-0 backdrop-blur-2xl bg-white/98 dark:bg-slate-900/98 border-b border-white/30 dark:border-slate-800/50 shadow-2xl overflow-hidden
          transition-all duration-500 ease-out transform-gpu
          ${
            mobileOpen
              ? "opacity-100 translate-y-0 scale-100"
              : "opacity-0 -translate-y-8 scale-95 pointer-events-none"
          }
        `}
        >
          {/* Animated background elements */}
          <div className="absolute inset-0 bg-gradient-to-br from-orange-50/50 via-red-50/30 to-pink-50/20 dark:from-orange-950/20 dark:via-red-950/10 dark:to-pink-950/5" />
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-orange-200/30 to-red-200/30 dark:from-orange-900/20 dark:to-red-900/20 rounded-full blur-2xl animate-pulse" />

          <div className="relative z-10 px-6 py-8 space-y-6">
            {/* Mobile Search with enhanced styling */}
            <div className="sm:hidden">
              <div className="relative group">
                <Input
                  placeholder="Hledat recepty, ingredience..."
                  startContent={
                    <IoSearch className="w-5 h-5 text-orange-500 group-focus-within:animate-pulse" />
                  }
                  classNames={{
                    input: "text-base font-medium",
                    inputWrapper:
                      "bg-gradient-to-r from-white to-orange-50/50 dark:from-slate-800 dark:to-orange-950/50 border-2 border-orange-200 dark:border-orange-800 hover:border-orange-300 dark:hover:border-orange-700 focus-within:border-orange-500 dark:focus-within:border-orange-400 transition-all duration-300 shadow-lg hover:shadow-xl backdrop-blur-sm",
                  }}
                />
                <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-orange-500/10 to-red-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10 blur-xl" />
              </div>
            </div>

            {/* Mobile Navigation Links with advanced effects */}
            <div className="space-y-3">
              {[
                {
                  href: "/",
                  label: "Domů",
                  icon: "🏠",
                  color: "from-blue-500 to-cyan-500",
                },
                {
                  href: "/recipes",
                  label: "Recepty",
                  icon: "👨‍🍳",
                  color: "from-orange-500 to-red-500",
                },
                {
                  href: "/categories",
                  label: "Kategorie",
                  icon: "📂",
                  color: "from-purple-500 to-pink-500",
                },
                {
                  href: "/about",
                  label: "O nás",
                  icon: "✨",
                  color: "from-green-500 to-emerald-500",
                },
              ].map((item, index) => (
                <div key={item.href} className="relative group">
                  <NextLink
                    href={item.href}
                    className="relative block px-6 py-4 text-lg font-semibold text-slate-700 dark:text-slate-300 rounded-2xl overflow-hidden transition-all duration-300 group-hover:text-white transform group-hover:scale-105"
                    onClick={() => setMobileOpen(false)}
                  >
                    {/* Animated background */}
                    <div
                      className={`absolute inset-0 bg-gradient-to-r ${item.color} opacity-0 group-hover:opacity-100 transition-all duration-300 transform scale-x-0 group-hover:scale-x-100 origin-left`}
                    />

                    {/* Ripple effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-white/20 via-white/40 to-white/20 opacity-0 group-hover:opacity-100 transform -translate-x-full group-hover:translate-x-full transition-transform duration-700" />

                    {/* Content with icon */}
                    <div className="relative flex items-center gap-4">
                      <div className="relative">
                        <span
                          className="text-2xl group-hover:animate-bounce transition-transform duration-200"
                          style={{ animationDelay: `${index * 0.1}s` }}
                        >
                          {item.icon}
                        </span>
                        <div className="absolute inset-0 bg-gradient-to-r from-white/30 to-transparent rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm" />
                      </div>
                      <div className="flex-1">
                        <span className="block font-bold tracking-wide group-hover:text-shadow-lg">
                          {item.label}
                        </span>
                        <div className="w-0 group-hover:w-full h-0.5 bg-white/80 transition-all duration-300 mt-1 rounded-full" />
                      </div>
                      <div className="opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-2 group-hover:translate-x-0">
                        <IoArrowForward className="w-5 h-5" />
                      </div>
                    </div>
                  </NextLink>

                  {/* Side glow effect */}
                  <div
                    className={`absolute inset-y-0 -left-2 w-1 bg-gradient-to-b ${item.color} opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full blur-sm`}
                  />
                </div>
              ))}
            </div>

            {/* Enhanced Mobile Auth Buttons */}
            {!session && (
              <div className="space-y-4 pt-6 border-t border-gradient-to-r from-orange-200/50 to-red-200/50 dark:from-orange-800/50 dark:to-red-800/50">
                <Button
                  as={NextLink}
                  href={webRoutes.LogIn}
                  variant="bordered"
                  className="w-full h-14 border-2 border-slate-300 dark:border-slate-600 hover:border-orange-500 dark:hover:border-orange-400 hover:bg-orange-50 dark:hover:bg-orange-900/20 transition-all duration-300 font-semibold text-base rounded-2xl group overflow-hidden"
                  onClick={() => setMobileOpen(false)}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-orange-500/10 to-red-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <span className="relative flex items-center gap-2">
                    <IoPerson className="w-5 h-5 group-hover:scale-110 transition-transform duration-200" />
                    Přihlásit se
                  </span>
                </Button>
                <Button
                  as={NextLink}
                  href={webRoutes.SignUp}
                  className="w-full h-14 bg-gradient-to-r from-orange-500 to-red-500 text-white font-bold text-base rounded-2xl shadow-xl hover:shadow-2xl hover:from-orange-600 hover:to-red-600 transition-all duration-300 group overflow-hidden"
                  onClick={() => setMobileOpen(false)}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-white/20 via-transparent to-white/20 opacity-0 group-hover:opacity-100 transform -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                  <span className="relative flex items-center gap-2">
                    <HiSparkles className="w-5 h-5 group-hover:animate-spin transition-transform duration-500" />
                    Registrovat se
                  </span>
                </Button>
              </div>
            )}
          </div>

          {/* Bottom wave decoration */}
          <div className="absolute bottom-0 left-0 right-0 h-2 bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 opacity-60" />
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
