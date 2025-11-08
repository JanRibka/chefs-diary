"use client";

import NextLink from "next/link";
import { useEffect, useState } from "react";
import {
  FaArrowUp,
  FaFacebook,
  FaHeart,
  FaInstagram,
  FaTiktok,
  FaTwitter,
  FaYoutube,
} from "react-icons/fa";
import { GiChefToque, GiScrollQuill } from "react-icons/gi";
import { HiLocationMarker, HiMail, HiPhone, HiSparkles } from "react-icons/hi";
import { IoRestaurant, IoTime, IoTrendingUp } from "react-icons/io5";

import { Button, Divider } from "@heroui/react";
import { fontSerif, fontOrn } from "@/config/app/fonts";

export default function PublicFooter() {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const quickLinks = [
    {
      href: "/recipes",
      label: "Všechny recepty",
      icon: <IoRestaurant className="w-4 h-4" />,
    },
    {
      href: "/categories/trending",
      label: "Trendy",
      icon: <IoTrendingUp className="w-4 h-4" />,
    },
    {
      href: "/categories/quick",
      label: "Rychlé recepty",
      icon: <IoTime className="w-4 h-4" />,
    },
    {
      href: "/categories/healthy",
      label: "Zdravé recepty",
      icon: <FaHeart className="w-4 h-4" />,
    },
  ];

  const categories = [
    { href: "/categories/breakfast", label: "Snídaně" },
    { href: "/categories/lunch", label: "Obědy" },
    { href: "/categories/dinner", label: "Večeře" },
    { href: "/categories/desserts", label: "Dezerty" },
    { href: "/categories/drinks", label: "Nápoje" },
    { href: "/categories/vegetarian", label: "Vegetariánské" },
  ];

  const socialLinks = [
    {
      href: "#",
      icon: FaFacebook,
      label: "Facebook",
      color: "hover:text-blue-500",
    },
    {
      href: "#",
      icon: FaInstagram,
      label: "Instagram",
      color: "hover:text-pink-500",
    },
    {
      href: "#",
      icon: FaTwitter,
      label: "Twitter",
      color: "hover:text-blue-400",
    },
    {
      href: "#",
      icon: FaYoutube,
      label: "YouTube",
      color: "hover:text-red-500",
    },
    {
      href: "#",
      icon: FaTiktok,
      label: "TikTok",
      color: "hover:text-black dark:hover:text-white",
    },
  ];

  return (
    <>
      <footer className="relative overflow-hidden">
        {/* Background with gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-orange-50/30 to-red-50/20 dark:from-slate-950 dark:via-orange-950/20 dark:to-red-950/10" />

        {/* Floating shapes */}
        <div className="absolute -top-16 -right-16 w-32 h-32 bg-gradient-to-br from-orange-200/20 to-red-200/20 dark:from-orange-900/10 dark:to-red-900/10 rounded-full blur-2xl" />
        <div className="absolute -bottom-16 -left-16 w-40 h-40 bg-gradient-to-tr from-pink-200/20 to-purple-200/20 dark:from-pink-900/10 dark:to-purple-900/10 rounded-full blur-2xl" />

        <div className="relative z-10">
          {/* Newsletter Section */}
          <div className="border-b border-orange-200/30 dark:border-orange-800/30">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
              <div className="text-center max-w-3xl mx-auto">
                <div className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-100 to-red-100 dark:from-orange-900/30 dark:to-red-900/30 px-6 py-3 rounded-full mb-6">
                  <HiSparkles className="w-5 h-5 text-orange-600 dark:text-orange-400" />
                  <span className="text-orange-800 dark:text-orange-300 font-medium">
                    Zůstaňte v obraze
                  </span>
                </div>

                <h3 className="text-3xl lg:text-4xl font-bold mb-4">
                  <span className="bg-gradient-to-r from-orange-600 via-red-600 to-pink-600 bg-clip-text text-transparent">
                    Týdenní kulinářské inspirace
                  </span>
                </h3>

                <p className="text-lg text-slate-600 dark:text-slate-400 mb-8">
                  Každý týden dostanete nejlepší recepty, tipy od
                  profesionálních kuchařů a exkluzivní obsah přímo do emailu.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                  <div className="flex-1">
                    <input
                      type="email"
                      placeholder="váš@email.cz"
                      className="w-full px-6 py-4 rounded-2xl border-2 border-orange-200 dark:border-orange-800 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm text-slate-900 dark:text-slate-100 placeholder-slate-500 dark:placeholder-slate-400 focus:outline-none focus:border-orange-500 dark:focus:border-orange-400 focus:ring-4 focus:ring-orange-500/20 transition-all"
                    />
                  </div>
                  <Button
                    size="lg"
                    className="bg-gradient-to-r from-orange-500 to-red-500 text-white font-semibold px-8 py-4 rounded-2xl shadow-lg hover:shadow-xl hover:from-orange-600 hover:to-red-600 transition-all duration-200"
                  >
                    Odebírat
                  </Button>
                </div>

                <p className="text-sm text-slate-500 dark:text-slate-400 mt-4">
                  ✨ Žádný spam, odhlásit se můžete kdykoliv
                </p>
              </div>
            </div>
          </div>

          {/* Main Footer Content */}
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
              {/* Brand Section */}
              <div className="lg:col-span-2 space-y-6">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <div className="w-14 h-14 bg-gradient-to-br from-orange-500 via-red-500 to-pink-600 rounded-2xl shadow-xl shadow-orange-500/25 flex items-center justify-center">
                      <div className="relative">
                        <GiScrollQuill className="w-7 h-7 text-white drop-shadow-lg" />
                        <GiChefToque className="w-6 h-6 text-white absolute -top-1 -right-1 drop-shadow-lg" />
                        <HiSparkles className="w-3 h-3 text-yellow-200 absolute -top-2 -right-2 animate-pulse" />
                      </div>
                    </div>
                    <div className="absolute inset-0 w-14 h-14 bg-gradient-to-br from-orange-500 to-red-500 rounded-2xl blur-xl opacity-30 -z-10" />
                  </div>

                  <div className="flex flex-col">
                    <span className={`${fontSerif.variable} sr-only`}>serif</span>
                    <span className={`${fontOrn.variable} font-extrabold text-2xl leading-tight tracking-tight text-amber-900 dark:text-amber-100`} style={{ fontFamily: `var(${fontOrn.variable})` }}>Kuchařův</span>
                    <span className={`${fontOrn.variable} font-bold text-lg leading-tight tracking-wide text-amber-700 dark:text-amber-300 -mt-1 flex items-center gap-2`} style={{ fontFamily: `var(${fontOrn.variable})` }}>Deník
                      <svg width="36" height="10" viewBox="0 0 36 10" fill="none" xmlns="http://www.w3.org/2000/svg" className="opacity-80">
                        <path d="M0 5C3 2 8 1 12 1C16 1 20 2 24 3C28 4 32 7 36 5" stroke="currentColor" strokeWidth="0.9" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </span>
                  </div>
                </div>

                <p className="text-slate-600 dark:text-slate-400 text-lg leading-relaxed max-w-md">
                  Vaše kulinářská cesta začíná zde. Objevujte recepty od
                  profesionálních kuchařů, sdílejte své kuchařské umění a spojte
                  se s rostoucí komunitou food nadšenců.
                </p>

                {/* Contact Info */}
                <div className="space-y-3">
                  <div className="flex items-center gap-3 text-slate-600 dark:text-slate-400">
                    <HiMail className="w-5 h-5 text-orange-500" />
                    <span>info@kucharuvdenik.cz</span>
                  </div>
                  <div className="flex items-center gap-3 text-slate-600 dark:text-slate-400">
                    <HiPhone className="w-5 h-5 text-orange-500" />
                    <span>+420 123 456 789</span>
                  </div>
                  <div className="flex items-center gap-3 text-slate-600 dark:text-slate-400">
                    <HiLocationMarker className="w-5 h-5 text-orange-500" />
                    <span>Praha, Česká republika</span>
                  </div>
                </div>

                {/* Social Links */}
                <div className="flex gap-3">
                  {socialLinks.map((social) => {
                    const Icon = social.icon;
                    return (
                      <Button
                        key={social.label}
                        as={NextLink}
                        href={social.href}
                        isIconOnly
                        variant="flat"
                        size="lg"
                        className={`bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm hover:bg-orange-100 dark:hover:bg-orange-900/30 transition-all duration-200 ${social.color}`}
                        aria-label={social.label}
                      >
                        <Icon className="w-5 h-5" />
                      </Button>
                    );
                  })}
                </div>
              </div>

              {/* Quick Links */}
              <div>
                <h3 className="font-bold text-slate-900 dark:text-slate-100 text-lg mb-6 flex items-center gap-2">
                  <IoRestaurant className="w-5 h-5 text-orange-500" />
                  Rychlé odkazy
                </h3>
                <ul className="space-y-4">
                  {quickLinks.map((link) => (
                    <li key={link.href}>
                      <NextLink
                        href={link.href}
                        className="group flex items-center gap-3 text-slate-600 dark:text-slate-400 hover:text-orange-600 dark:hover:text-orange-400 transition-all duration-200"
                      >
                        <span className="group-hover:text-orange-500 transition-colors">
                          {link.icon}
                        </span>
                        {link.label}
                      </NextLink>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Categories */}
              <div>
                <h3 className="font-bold text-slate-900 dark:text-slate-100 text-lg mb-6">
                  Kategorie
                </h3>
                <ul className="space-y-4">
                  {categories.map((category) => (
                    <li key={category.href}>
                      <NextLink
                        href={category.href}
                        className="text-slate-600 dark:text-slate-400 hover:text-orange-600 dark:hover:text-orange-400 transition-colors duration-200 hover:translate-x-1 transform inline-block"
                      >
                        {category.label}
                      </NextLink>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Legal */}
              <div>
                <h3 className="font-bold text-slate-900 dark:text-slate-100 text-lg mb-6">
                  Právní informace
                </h3>
                <ul className="space-y-4">
                  <li>
                    <NextLink
                      href="/privacy"
                      className="text-slate-600 dark:text-slate-400 hover:text-orange-600 dark:hover:text-orange-400 transition-colors duration-200"
                    >
                      Ochrana soukromí
                    </NextLink>
                  </li>
                  <li>
                    <NextLink
                      href="/terms"
                      className="text-slate-600 dark:text-slate-400 hover:text-orange-600 dark:hover:text-orange-400 transition-colors duration-200"
                    >
                      Podmínky použití
                    </NextLink>
                  </li>
                  <li>
                    <NextLink
                      href="/cookies"
                      className="text-slate-600 dark:text-slate-400 hover:text-orange-600 dark:hover:text-orange-400 transition-colors duration-200"
                    >
                      Cookies
                    </NextLink>
                  </li>
                  <li>
                    <NextLink
                      href="/contact"
                      className="text-slate-600 dark:text-slate-400 hover:text-orange-600 dark:hover:text-orange-400 transition-colors duration-200"
                    >
                      Kontakt
                    </NextLink>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <Divider className="bg-gradient-to-r from-transparent via-orange-200 to-transparent dark:via-orange-800" />

          {/* Bottom Section */}
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
                <span>© 2025 Kuchařův deník.</span>
                <span>Vytvořeno s</span>
                <FaHeart className="w-4 h-4 text-red-500 animate-pulse" />
                <span>v České republice</span>
              </div>

              <div className="flex items-center gap-4 text-sm text-slate-500 dark:text-slate-400">
                <span>Všechna práva vyhrazena</span>
                <span>•</span>
                <span>Verze 2.0</span>
              </div>
            </div>
          </div>
        </div>
      </footer>

      {/* Scroll to Top Button */}
      {showScrollTop && (
        <Button
          isIconOnly
          onPress={scrollToTop}
          className="fixed bottom-6 right-6 z-50 bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-2xl hover:shadow-xl hover:from-orange-600 hover:to-red-600 transition-all duration-200 w-14 h-14 rounded-full"
          aria-label="Scroll to top"
        >
          <FaArrowUp className="w-5 h-5" />
        </Button>
      )}
    </>
  );
}
