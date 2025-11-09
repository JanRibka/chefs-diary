"use client";

import NextLink from "next/link";
import { GiChefToque } from "react-icons/gi";
import { IoArrowBack, IoHome } from "react-icons/io5";

import Logo from "@/components/shared/Logo";
import webRoutes from "@/lib/routes/webRoutes";

export default function NotFoundClient() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-red-50 to-pink-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 flex items-center justify-center p-4">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-orange-200/30 to-red-200/30 dark:from-orange-900/20 dark:to-red-900/20 rounded-full blur-3xl animate-pulse" />
        <div
          className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-pink-200/30 to-purple-200/30 dark:from-pink-900/20 dark:to-purple-900/20 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "2s" }}
        />
        <div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-yellow-200/20 to-orange-200/20 dark:from-yellow-900/10 dark:to-orange-900/10 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "4s" }}
        />
      </div>

      <div className="relative z-10 max-w-2xl mx-auto text-center">
        {/* Logo/Icon Section */}
        <div className="mb-8 flex justify-center">
          <Logo size="xl" href={webRoutes.Home} />
        </div>

        {/* Error Code - less prominent */}
        <div className="mb-6">
          <h1 className="text-6xl md:text-7xl font-black text-slate-300 dark:text-slate-600 mb-4 opacity-50">
            404
          </h1>
          <h2 className="text-3xl md:text-4xl font-bold text-slate-800 dark:text-slate-200 mb-4">
            Stránka nenalezena
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-md mx-auto leading-relaxed">
            Bohužel se nám nepodařilo najít stránku, kterou hledáte. Možná byla
            přesunuta nebo dočasně není k dispozici.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
          <NextLink
            href={webRoutes.Home}
            className="group relative px-8 py-4 bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 hover:from-orange-600 hover:via-red-600 hover:to-pink-600 text-white font-bold rounded-2xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transform -translate-x-full group-hover:translate-x-full transition-transform duration-500" />
            <div className="relative flex items-center gap-3">
              <IoHome className="w-5 h-5" />
              <span>Zpět na hlavní stránku</span>
            </div>
          </NextLink>

          <NextLink
            href="/recipes"
            className="group relative px-8 py-4 bg-white/90 dark:bg-slate-800/90 hover:bg-white dark:hover:bg-slate-800 text-slate-800 dark:text-slate-200 font-bold rounded-2xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 border border-orange-200 dark:border-orange-800 overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-orange-500/10 to-red-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="relative flex items-center gap-3">
              <GiChefToque className="w-5 h-5" />
              <span>Procházet recepty</span>
            </div>
          </NextLink>
        </div>

        {/* Fun Elements */}
        <div className="text-center">
          <div className="inline-flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400 bg-white/50 dark:bg-slate-800/50 px-4 py-2 rounded-full backdrop-blur-sm">
            <span>🔍</span>
            <span>Asi se stránka schovala před námi!</span>
            <span>�</span>
          </div>
        </div>

        {/* Back Button */}
        <div className="mt-8">
          <button
            onClick={() => window.history.back()}
            className="group inline-flex items-center gap-2 text-slate-600 dark:text-slate-400 hover:text-orange-600 dark:hover:text-orange-400 transition-colors duration-200"
          >
            <IoArrowBack className="w-4 h-4 group-hover:-translate-x-1 transition-transform duration-200" />
            <span>Zpět na předchozí stránku</span>
          </button>
        </div>
      </div>
    </div>
  );
}
