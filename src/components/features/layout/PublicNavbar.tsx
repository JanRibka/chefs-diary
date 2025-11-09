"use client";

import { signIn, useSession } from "next-auth/react";
import { useTheme } from "next-themes";
import NextLink from "next/link";
import { useEffect, useRef, useState } from "react";
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

import Logo from "@/components/shared/Logo";
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
  Popover,
  PopoverContent,
  PopoverTrigger,
  useDisclosure,
} from "@heroui/react";

export default function PublicNavbar() {
  const { data: session } = useSession();
  const { setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const user = session?.user as { name?: string; image?: string } | undefined;
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [loginFlyoutOpen, setLoginFlyoutOpen] = useState(false);
  const [loginFlyoutOpenedByHover, setLoginFlyoutOpenedByHover] =
    useState(false);
  const loginTriggerRef = useRef<HTMLButtonElement | null>(null);
  const flyoutFirstInputRef = useRef<HTMLInputElement | null>(null);
  const hoverOpenTimerRef = useRef<number | null>(null);

  // Login form state for popover
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [loginLoading, setLoginLoading] = useState(false);
  const [loginError, setLoginError] = useState<string | null>(null);

  useEffect(() => {
    if (!loginFlyoutOpen) return;
    setTimeout(() => flyoutFirstInputRef.current?.focus(), 50);
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setLoginFlyoutOpen(false);
        loginTriggerRef.current?.focus();
      }
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [loginFlyoutOpen]);

  // Reset login form when popover opens
  useEffect(() => {
    if (loginFlyoutOpen) {
      setLoginError(null);
      setLoginEmail("");
      setLoginPassword("");
      setLoginLoading(false);
    }
  }, [loginFlyoutOpen]);

  // mark when component is mounted client-side to avoid SSR/client mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  // Enhanced scroll effect with multiple states
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setScrolled(scrollY > 20);
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
      {/* Main Navigation - Fixed with Enhanced Scroll Effects */}
      <nav
        className={`
        fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-out
        ${
          scrolled
            ? "backdrop-blur-2xl bg-white/95 dark:bg-slate-900/95 shadow-2xl shadow-black/10 border-b border-white/30 dark:border-slate-800/60 h-16 lg:h-20"
            : "backdrop-blur-md bg-white/80 dark:bg-slate-900/80 shadow-lg shadow-black/5 border-b border-white/20 dark:border-slate-800/30 h-20 lg:h-24"
        }
      `}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div
            className={`flex items-center justify-between transition-all duration-500 ease-out ${
              scrolled ? "h-16 lg:h-20" : "h-20 lg:h-24"
            }`}
          >
            {/* Logo Section */}
            <div className="flex items-center">
              <Logo />
            </div>

            {/* Desktop Navigation - Ultra Modern */}
            <div className="hidden lg:flex items-center space-x-2">
              {[
                {
                  href: webRoutes.Home,
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
                    className="relative px-8 py-4 text-sm font-semibold text-slate-700 dark:text-slate-300 transition-all duration-300 rounded-2xl overflow-hidden group-hover:text-white"
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
              <div className="relative group cursor-pointer">
                <Button
                  isIconOnly
                  variant="light"
                  size="lg"
                  onPress={onOpen}
                  className="relative overflow-hidden rounded-2xl transition-all duration-300 hover:bg-gradient-to-r hover:from-yellow-100 hover:to-orange-100 dark:hover:from-blue-900/30 dark:hover:to-purple-900/30 group-hover:scale-110 group-hover:shadow-lg"
                  aria-label="Hledat"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 dark:from-blue-500/20 dark:to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl" />
                  <div className="relative z-10 transition-all duration-500 group-hover:rotate-12">
                    <IoSearch className="w-6 h-6 text-slate-600 dark:text-slate-400 transition-all duration-300 group-hover:scale-110" />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent opacity-0 group-hover:opacity-100 transform -translate-x-full group-hover:translate-x-full transition-transform duration-500" />
                </Button>
                {/* Pulse ring */}
                <div className="absolute inset-0 rounded-2xl bg-yellow-500/30 dark:bg-blue-500/30 animate-ping opacity-0 group-hover:opacity-75 transition-opacity duration-300" />
                {/* Glow effect */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-yellow-500/40 to-orange-500/40 dark:from-blue-500/40 dark:to-purple-500/40 opacity-0 group-hover:opacity-60 transition-opacity duration-300 blur-xl scale-150" />
              </div>

              {/* Theme Toggle with enhanced effects */}
              <div className="relative group cursor-pointer">
                <Button
                  isIconOnly
                  variant="light"
                  size="lg"
                  onPress={() =>
                    setTheme(resolvedTheme === "dark" ? "light" : "dark")
                  }
                  className="relative overflow-hidden rounded-2xl transition-all duration-300 hover:bg-gradient-to-r hover:from-yellow-100 hover:to-orange-100 dark:hover:from-blue-900/30 dark:hover:to-purple-900/30 group-hover:scale-110 group-hover:shadow-lg"
                  aria-label="Přepnout režim"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 dark:from-blue-500/20 dark:to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl" />
                  <div className="relative z-10 transition-all duration-500 group-hover:rotate-180">
                    {/* Render neutral placeholder on server to avoid hydration mismatch */}
                    {!mounted ? (
                      <span className="w-6 h-6 inline-block" aria-hidden />
                    ) : resolvedTheme === "light" ? (
                      <HiMoon className="w-6 h-6 text-slate-600 dark:text-slate-400 transition-colors duration-300" />
                    ) : (
                      <HiSun className="w-6 h-6 text-primary group-hover:text-yellow-500 transition-colors duration-300" />
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
                      <div className="flex items-center gap-3 cursor-pointer transition-all duration-300 group-hover:scale-105 px-3 py-2 rounded-2xl hover:bg-gradient-to-r hover:from-primary/10 hover:to-primary/20 dark:hover:from-primary/20 dark:hover:to-primary/30">
                        <div className="relative">
                          <Avatar
                            src={user?.image}
                            alt={user?.name || "Uživatel"}
                            size="md"
                            className="ring-3 ring-primary/30 dark:ring-primary/50 hover:ring-primary/50 dark:hover:ring-primary/70 transition-all duration-300 group-hover:ring-4 group-hover:ring-primary/60 dark:group-hover:ring-primary/80"
                          />
                          {/* Online indicator */}
                          <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white dark:border-slate-900 animate-pulse" />
                          {/* Glow effect */}
                          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-primary/30 to-primary/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-lg scale-150" />
                        </div>
                        <div className="hidden md:block">
                          <p className="text-sm font-semibold text-slate-700 dark:text-slate-300 group-hover:text-primary dark:group-hover:text-primary-light transition-colors duration-200">
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
                              className="ring-2 ring-primary/40 dark:ring-primary/60"
                            />
                            <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-gradient-to-r from-primary to-primary-dark rounded-full flex items-center justify-center">
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
                              <span className="text-xs bg-gradient-to-r from-primary to-primary-dark text-white px-2 py-1 rounded-full font-medium">
                                ⭐ Level 3
                              </span>
                            </div>
                          </div>
                        </div>
                      </DropdownItem>

                      {/* Divider with gradient */}
                      <div className="my-2 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent dark:via-primary/50" />

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
                          <div className="w-8 h-8 bg-gradient-to-r from-red-500 to-primary rounded-xl flex items-center justify-center">
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

                  {/* Login trigger: hover opens popover, click toggles */}
                  <div
                    className="relative group"
                    onMouseEnter={() => {
                      // open popover after a small delay to avoid accidental opens
                      hoverOpenTimerRef.current = window.setTimeout(() => {
                        setLoginFlyoutOpen(true);
                        setLoginFlyoutOpenedByHover(true);
                      }, 150);
                    }}
                    onMouseLeave={() => {
                      if (hoverOpenTimerRef.current) {
                        clearTimeout(hoverOpenTimerRef.current);
                        hoverOpenTimerRef.current = null;
                      }
                      // Only close if opened by hover
                      if (loginFlyoutOpenedByHover) {
                        setLoginFlyoutOpen(false);
                        setLoginFlyoutOpenedByHover(false);
                      }
                    }}
                  >
                    <Popover
                      isOpen={loginFlyoutOpen}
                      onOpenChange={(isOpen) => {
                        console.warn("Popover onOpenChange:", isOpen);
                        setLoginFlyoutOpen(isOpen);
                        // If opened by click, mark as not opened by hover
                        if (isOpen) {
                          setLoginFlyoutOpenedByHover(false);
                        }
                      }}
                      placement="bottom"
                      classNames={{
                        base: "z-50",
                        content: "z-50",
                      }}
                    >
                      <PopoverTrigger asChild>
                        <Button
                          ref={loginTriggerRef}
                          variant="bordered"
                          size="lg"
                          aria-haspopup="dialog"
                          aria-expanded={loginFlyoutOpen}
                          onPress={() => setLoginFlyoutOpen(!loginFlyoutOpen)}
                          className={`hidden sm:flex font-black px-6 py-4 rounded-3xl border-4 transition-all duration-300 hover:scale-110 overflow-hidden relative group cursor-pointer ${
                            loginFlyoutOpen ? "scale-110" : ""
                          } ${
                            resolvedTheme === "dark"
                              ? "border-purple-500 hover:border-purple-400 bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 hover:from-purple-500 hover:via-indigo-500 hover:to-blue-500 text-white shadow-2xl shadow-purple-500/60 hover:shadow-purple-400/80"
                              : "border-primary hover:border-primary-light bg-gradient-to-r from-primary via-primary-dark to-primary-light hover:from-primary-light hover:via-primary hover:to-primary-dark text-white shadow-2xl shadow-primary/60 hover:shadow-primary/80"
                          }`}
                        >
                          {/* Neon glow layers - theme-aware */}
                          <div
                            className={`absolute inset-0 rounded-3xl blur-lg opacity-60 group-hover:opacity-85 transition-opacity duration-300 ${
                              resolvedTheme === "dark"
                                ? "bg-gradient-to-r from-purple-400 via-indigo-400 to-blue-400"
                                : "bg-gradient-to-r from-primary/40 via-primary/50 to-primary/60"
                            }`}
                          />
                          <div
                            className={`absolute inset-0 rounded-3xl blur-xl opacity-40 group-hover:opacity-60 transition-opacity duration-300 ${
                              resolvedTheme === "dark"
                                ? "bg-gradient-to-r from-purple-300 via-indigo-300 to-blue-300"
                                : "bg-gradient-to-r from-primary/30 via-primary/40 to-primary/50"
                            }`}
                          />

                          {/* Electric spark effects - theme-aware */}
                          <div className="absolute inset-0 rounded-3xl">
                            <div
                              className={`absolute top-2 left-4 w-1 h-1 rounded-full animate-ping opacity-80 ${
                                resolvedTheme === "dark"
                                  ? "bg-purple-300"
                                  : "bg-yellow-300"
                              }`}
                            />
                            <div
                              className={`absolute top-3 right-6 w-0.5 h-0.5 rounded-full animate-pulse opacity-90 ${
                                resolvedTheme === "dark"
                                  ? "bg-indigo-300"
                                  : "bg-white"
                              }`}
                              style={{ animationDelay: "0.2s" }}
                            />
                            <div
                              className={`absolute bottom-3 left-8 w-0.5 h-0.5 rounded-full animate-bounce opacity-70 ${
                                resolvedTheme === "dark"
                                  ? "bg-blue-300"
                                  : "bg-yellow-200"
                              }`}
                              style={{ animationDelay: "0.4s" }}
                            />
                            <div
                              className={`absolute bottom-2 right-3 w-1 h-1 rounded-full animate-ping opacity-60 ${
                                resolvedTheme === "dark"
                                  ? "bg-purple-200"
                                  : "bg-primary/20"
                              }`}
                              style={{ animationDelay: "0.6s" }}
                            />
                          </div>

                          {/* Energy wave animation */}
                          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent opacity-0 group-hover:opacity-100 transform -translate-x-full group-hover:translate-x-full transition-transform duration-1000 rounded-3xl" />

                          {/* Content */}
                          <span className="relative flex items-center gap-4 z-10">
                            <div className="relative">
                              <IoPerson className="w-7 h-7 group-hover:rotate-180 group-hover:scale-125 transition-all duration-500 drop-shadow-lg text-white" />
                              {/* Electric ring */}
                              <div
                                className="absolute inset-0 border-2 border-white/50 rounded-full opacity-0 group-hover:opacity-100 group-hover:animate-spin transition-all duration-300"
                                style={{ animationDuration: "2s" }}
                              />
                            </div>
                            <span
                              className="tracking-wider text-lg font-black drop-shadow-2xl text-white"
                              style={{
                                textShadow:
                                  resolvedTheme === "dark"
                                    ? "0 0 3px rgba(0,0,0,0.7), 1px 1px 2px rgba(0,0,0,0.9)"
                                    : "0 0 4px rgba(0,0,0,0.6), 1px 1px 2px rgba(0,0,0,0.8)",
                              }}
                            >
                              PŘIHLÁSIT SE
                            </span>
                          </span>

                          {/* Outer glow ring */}
                          <div className="absolute inset-0 rounded-3xl border-2 border-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-pulse" />
                        </Button>
                      </PopoverTrigger>

                      {/* Subtle glow - theme-aware */}
                      <div
                        className={`absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-60 transition-opacity duration-300 blur-xl scale-110 ${
                          resolvedTheme === "dark"
                            ? "bg-purple-500/20"
                            : "bg-primary/20"
                        }`}
                      />

                      <PopoverContent className="w-80 p-0">
                        <div className="p-4 rounded-2xl shadow-2xl bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl border border-white/10 dark:border-slate-800/40">
                          <div className="space-y-4">
                            <div>
                              <h3 className="text-lg font-bold">Přihlášení</h3>
                              <p className="text-sm text-slate-500">
                                Přihlaste se do svého účtu
                              </p>
                            </div>

                            <form
                              onSubmit={async (e) => {
                                e.preventDefault();
                                setLoginLoading(true);
                                setLoginError(null);
                                try {
                                  const res = (await signIn("credentials", {
                                    redirect: false,
                                    email: loginEmail,
                                    password: loginPassword,
                                    callbackUrl: window.location.href,
                                  })) as
                                    | {
                                        error?: string;
                                        ok?: boolean;
                                        status?: number;
                                      }
                                    | undefined
                                    | void;

                                  if (
                                    res &&
                                    typeof res === "object" &&
                                    "error" in res &&
                                    res.error
                                  ) {
                                    setLoginError(
                                      res.error ||
                                        "Neznámá chyba při přihlášení"
                                    );
                                    setLoginLoading(false);
                                    return;
                                  }

                                  // success: close popover
                                  setLoginLoading(false);
                                  setLoginFlyoutOpen(false);
                                } catch (err: unknown) {
                                  if (err instanceof Error)
                                    setLoginError(err.message);
                                  else if (typeof err === "string")
                                    setLoginError(err);
                                  else setLoginError("Chyba při přihlášení");
                                  setLoginLoading(false);
                                }
                              }}
                              className="space-y-3"
                            >
                              <Input
                                ref={flyoutFirstInputRef}
                                placeholder="E-mail"
                                type="email"
                                value={loginEmail}
                                onChange={(e) => setLoginEmail(e.target.value)}
                                required
                                classNames={{
                                  input: "text-sm",
                                  inputWrapper: "rounded-md",
                                }}
                              />
                              <Input
                                placeholder="Heslo"
                                type="password"
                                value={loginPassword}
                                onChange={(e) =>
                                  setLoginPassword(e.target.value)
                                }
                                required
                                classNames={{
                                  input: "text-sm",
                                  inputWrapper: "rounded-md",
                                }}
                              />

                              {loginError && (
                                <div className="text-sm text-red-600">
                                  {loginError}
                                </div>
                              )}

                              <div className="flex items-center justify-between gap-2">
                                <Button
                                  type="submit"
                                  size="sm"
                                  className="flex-1"
                                  disabled={loginLoading}
                                >
                                  {loginLoading ? "Probíhá..." : "Přihlásit"}
                                </Button>
                                <NextLink
                                  href={webRoutes.ForgottenPassword}
                                  className="text-sm text-slate-500 underline"
                                >
                                  Zapomenuté
                                </NextLink>
                              </div>

                              <div className="text-center text-sm">
                                <span className="mr-2">Ještě nemáte účet?</span>
                                <NextLink
                                  href={webRoutes.SignUp}
                                  className="font-semibold text-primary"
                                >
                                  Registrovat se
                                </NextLink>
                              </div>

                              <div className="pt-2 border-t mt-2">
                                <div className="text-center text-sm text-slate-500 mb-2">
                                  Nebo pokračujte přes
                                </div>
                                <div className="flex gap-2">
                                  <Button
                                    variant="ghost"
                                    className="flex-1"
                                    onClick={async () => {
                                      setLoginLoading(true);
                                      setLoginError(null);
                                      try {
                                        await signIn("google", {
                                          callbackUrl: window.location.href,
                                        });
                                      } catch (err: unknown) {
                                        if (err instanceof Error)
                                          setLoginError(err.message);
                                        else if (typeof err === "string")
                                          setLoginError(err);
                                        else
                                          setLoginError(
                                            "Chyba při přesměrování na Google"
                                          );
                                        setLoginLoading(false);
                                      }
                                    }}
                                    disabled={loginLoading}
                                  >
                                    Google
                                  </Button>
                                </div>
                              </div>
                            </form>
                          </div>
                        </div>
                      </PopoverContent>
                    </Popover>
                  </div>
                  {/* Register CTA removed from desktop header to declutter; registration remains available via LogIn flow */}
                </div>
              )}

              {/* Mobile Menu Button - Enhanced */}
              <div className="relative group lg:hidden">
                <Button
                  isIconOnly
                  variant="light"
                  size="lg"
                  onPress={() => setMobileOpen(!mobileOpen)}
                  className="relative overflow-hidden rounded-2xl transition-all duration-300 hover:bg-gradient-to-r hover:from-orange-100 hover:to-red-100 dark:hover:from-orange-900/30 dark:hover:to-red-900/30 group-hover:scale-110 group-hover:shadow-lg cursor-pointer"
                  aria-label="Menu"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-orange-500/20 to-red-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl" />
                  <div className="relative z-10 transition-all duration-300">
                    {mobileOpen ? (
                      <IoClose className="w-6 h-6 text-slate-600 dark:text-slate-400 group-hover:text-red-600 dark:group-hover:text-red-400 transition-colors duration-300 group-hover:rotate-90" />
                    ) : (
                      <IoMenu className="w-6 h-6 text-slate-600 dark:text-slate-400 group-hover:text-primary dark:group-hover:text-primary-light transition-colors duration-300" />
                    )}
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent opacity-0 group-hover:opacity-100 transform -translate-x-full group-hover:translate-x-full transition-transform duration-500" />
                </Button>
                {/* Animated indicator dots */}
                <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 flex gap-1">
                  <div
                    className={`w-1 h-1 rounded-full transition-all duration-300 ${
                      mobileOpen ? "bg-red-500 scale-125" : "bg-primary"
                    }`}
                  />
                  <div
                    className={`w-1 h-1 rounded-full transition-all duration-300 ${
                      mobileOpen ? "bg-red-500 scale-125" : "bg-primary"
                    }`}
                    style={{ animationDelay: "0.1s" }}
                  />
                  <div
                    className={`w-1 h-1 rounded-full transition-all duration-300 ${
                      mobileOpen ? "bg-red-500 scale-125" : "bg-primary"
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
          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-primary/15 to-primary/20 dark:from-primary/20 dark:via-primary/15 dark:to-primary/10" />
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-primary/30 to-primary/20 dark:from-primary/20 dark:to-primary/10 rounded-full blur-2xl animate-pulse" />

          <div className="relative z-10 px-6 py-8 space-y-6">
            {/* Mobile Search with enhanced styling */}
            <div className="sm:hidden">
              <div className="relative group">
                <Input
                  placeholder="Hledat recepty, ingredience..."
                  startContent={
                    <IoSearch className="w-5 h-5 text-primary group-focus-within:animate-pulse" />
                  }
                  classNames={{
                    input: "text-base font-medium",
                    inputWrapper:
                      "bg-gradient-to-r from-white to-primary/10 dark:from-slate-800 dark:to-primary/20 border-2 border-primary/30 dark:border-primary/40 hover:border-primary/50 dark:hover:border-primary/60 focus-within:border-primary dark:focus-within:border-primary-light transition-all duration-300 shadow-lg hover:shadow-xl backdrop-blur-sm",
                  }}
                />
                <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-primary/10 to-primary/15 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10 blur-xl" />
              </div>
            </div>

            {/* Mobile Navigation Links with advanced effects */}
            <div className="space-y-3">
              {[
                {
                  href: webRoutes.Home,
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
              <div className="space-y-4 pt-6 border-t border-gradient-to-r from-primary/30 to-primary/40 dark:from-primary/40 dark:to-primary/50">
                <Button
                  as={NextLink}
                  href={webRoutes.LogIn}
                  variant="bordered"
                  className="w-full h-14 border-2 border-slate-300 dark:border-slate-600 hover:border-primary dark:hover:border-primary-light hover:bg-primary/10 dark:hover:bg-primary/20 transition-all duration-300 font-semibold text-base rounded-2xl group overflow-hidden cursor-pointer"
                  onClick={() => setMobileOpen(false)}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-primary/15 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <span className="relative flex items-center gap-2">
                    <IoPerson className="w-5 h-5 group-hover:scale-110 transition-transform duration-200" />
                    Přihlásit se
                  </span>
                </Button>
                {/* Sign-up button removed from mobile menu to keep registration accessible only in the full login modal */}
              </div>
            )}
          </div>

          {/* Bottom wave decoration */}
          <div className="absolute bottom-0 left-0 right-0 h-2 bg-gradient-to-r from-primary via-primary-dark to-primary-light opacity-60" />
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
                <h3 className="text-2xl font-bold bg-gradient-to-r from-primary via-primary-dark to-primary-light bg-clip-text text-transparent mb-2">
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
                    "bg-default-100 hover:bg-default-200 border-2 border-transparent focus-within:border-primary transition-all duration-200 shadow-lg",
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
                    className="bg-primary/10 dark:bg-primary/20 text-primary dark:text-primary-light hover:bg-primary/15 dark:hover:bg-primary/25 transition-colors"
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
