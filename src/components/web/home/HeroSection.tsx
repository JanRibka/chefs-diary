"use client";

import Image from "next/image";
import Link from "next/link";
import { GiChefToque } from "react-icons/gi";
import { IoArrowForward, IoSearch } from "react-icons/io5";

import { Button } from "@heroui/react";

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Enhanced Background with multiple layers */}
      <div className="absolute inset-0">
        {/* Primary gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-orange-50/80 via-white to-red-50/60 dark:from-slate-950 dark:via-slate-900 dark:to-orange-950/20" />

        {/* Floating gradient orbs - larger and more prominent */}
        <div className="absolute -top-32 -right-32 w-96 h-96 bg-gradient-to-br from-orange-300/30 to-red-300/30 dark:from-orange-900/20 dark:to-red-900/20 rounded-full blur-3xl animate-pulse" />
        <div
          className="absolute -bottom-32 -left-32 w-80 h-80 bg-gradient-to-tr from-pink-300/25 to-purple-300/25 dark:from-pink-900/15 dark:to-purple-900/15 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "2s" }}
        />
        <div
          className="absolute top-1/3 left-1/3 w-64 h-64 bg-gradient-to-r from-yellow-300/20 to-orange-300/20 dark:from-yellow-900/10 dark:to-orange-900/10 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "4s" }}
        />

        {/* Subtle pattern overlay */}
        <div className="absolute inset-0 opacity-[0.02] dark:opacity-[0.03]">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `radial-gradient(circle at 2px 2px, currentColor 1px, transparent 0)`,
              backgroundSize: "32px 32px",
            }}
          />
        </div>
      </div>

      {/* Animated floating elements with improved timing */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-20 left-[10%] w-6 h-6 bg-gradient-to-br from-orange-400 to-red-400 rounded-full opacity-40 animate-bounce"
          style={{ animationDelay: "0s", animationDuration: "3s" }}
        />
        <div
          className="absolute top-32 right-[15%] w-4 h-4 bg-gradient-to-br from-pink-400 to-purple-400 rounded-full opacity-30 animate-bounce"
          style={{ animationDelay: "1s", animationDuration: "4s" }}
        />
        <div
          className="absolute bottom-40 left-[20%] w-5 h-5 bg-gradient-to-br from-yellow-400 to-orange-400 rounded-full opacity-35 animate-bounce"
          style={{ animationDelay: "2s", animationDuration: "5s" }}
        />
        <div
          className="absolute top-1/2 right-[8%] w-3 h-3 bg-gradient-to-br from-blue-400 to-cyan-400 rounded-full opacity-25 animate-bounce"
          style={{ animationDelay: "3s", animationDuration: "6s" }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Enhanced Left Content */}
          <div className="space-y-10 text-center lg:text-left">
            {/* Premium badge */}
            <div className="inline-flex items-center gap-3 bg-gradient-to-r from-orange-100 via-red-50 to-pink-100 dark:from-orange-900/40 dark:via-red-900/30 dark:to-pink-900/40 px-6 py-3 rounded-full mb-6">
              <GiChefToque className="w-5 h-5 text-orange-600 dark:text-orange-400" />
              <span>VTejte v kulin1sk9m sv9t9</span>
              <div className="w-2 h-2 bg-orange-500 rounded-full animate-pulse" />
            </div>

            {/* Enhanced heading with better typography */}
            <div className="space-y-4">
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black leading-tight">
                <span className="text-slate-900 dark:text-white">
                  Objevte chu9
                </span>
                <br />
                <span className="bg-gradient-to-r from-orange-500 via-red-500 to-pink-600 bg-clip-text text-transparent animate-pulse">
                  dokonalosti
                </span>
              </h1>

              <div className="w-24 h-1 bg-gradient-to-r from-orange-500 to-red-500 mx-auto lg:mx-0 rounded-full" />
            </div>

            {/* Enhanced description */}
            <p className="text-xl sm:text-2xl text-slate-600 dark:text-slate-300 leading-relaxed max-w-2xl mx-auto lg:mx-0 font-light">
              Tisce recept od profesion1lnch kucha9 i dom1cch nadenc.{" "}
              <span className="font-medium text-slate-700 dark:text-slate-200">
                Sdlejte sve kulin1sk9 umn
              </span>{" "}
              a inspirujte se ostatnmi.
            </p>

            {/* Enhanced action buttons */}
            <div className="flex flex-col sm:flex-row gap-6 justify-center lg:justify-start">
              <Button
                as={Link}
                href="/recipes"
                size="lg"
                className="bg-gradient-to-r from-orange-500 to-red-500 text-white font-bold px-10 py-4 text-lg rounded-2xl shadow-2xl hover:shadow-3xl hover:from-orange-600 hover:to-red-600 transition-all duration-300 transform hover:scale-105"
                endContent={<IoArrowForward className="w-6 h-6" />}
              >
                Prozkoumat recepty
              </Button>
              <Button
                as={Link}
                href="/create-recipe"
                size="lg"
                variant="bordered"
                className="font-bold px-10 py-4 text-lg rounded-2xl border-3 border-slate-300 dark:border-slate-600 hover:border-orange-500 dark:hover:border-orange-400 hover:bg-orange-100 dark:hover:bg-orange-900/20 transition-all duration-300 backdrop-blur-sm"
                startContent={<GiChefToque className="w-6 h-6" />}
              >
                Vytvo9it recept
              </Button>
            </div>

            {/* Enhanced search bar */}
            <div className="max-w-lg mx-auto lg:mx-0">
              <div className="relative group">
                <input
                  type="text"
                  placeholder="Hledat recepty, ingredience, kucha9e..."
                  className="w-full px-8 py-5 pr-16 rounded-3xl border-3 border-slate-200 dark:border-slate-700 bg-white/90 dark:bg-slate-800/90 backdrop-blur-md text-slate-900 dark:text-white placeholder-slate-500 dark:placeholder-slate-400 focus:outline-none focus:border-orange-500 dark:focus:border-orange-400 focus:ring-6 focus:ring-orange-500/20 transition-all duration-300 shadow-lg group-hover:shadow-xl text-lg"
                />
                <button className="absolute right-2 top-1/2 -translate-y-1/2 p-3 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 rounded-2xl transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105">
                  <IoSearch className="w-6 h-6 text-white" />
                </button>
              </div>

              {/* Popular search tags */}
              <div className="flex flex-wrap gap-2 mt-4 justify-center lg:justify-start">
                {["Pizza", "Salády", "Dezerty", "Rychlé"].map((tag) => (
                  <span
                    key={tag}
                    className="px-4 py-2 bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm rounded-full text-sm text-slate-600 dark:text-slate-400 border border-slate-200/50 dark:border-slate-700/50 hover:bg-orange-100 dark:hover:bg-orange-900/30 cursor-pointer transition-all duration-200"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Enhanced Right Content - Hero Image */}
          <div className="relative">
            <div className="relative w-full h-[500px] lg:h-[600px] rounded-3xl overflow-hidden shadow-2xl transform rotate-3 hover:rotate-0 transition-transform duration-500">
              <Image
                src="/api/placeholder/700/600"
                alt="Delicious food presentation"
                fill
                className="object-cover transition-transform duration-700 hover:scale-110"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-black/5 to-transparent" />

              {/* Overlay content */}
              <div className="absolute bottom-6 left-6 right-6">
                <div className="bg-white/90 dark:bg-slate-900/90 backdrop-blur-md rounded-2xl p-4 shadow-xl">
                  <p className="text-slate-900 dark:text-white font-semibold">
                    ✨ Nejnovější recept
                  </p>
                  <p className="text-slate-600 dark:text-slate-400 text-sm">
                    Italská pasta s truflemi
                  </p>
                </div>
              </div>
            </div>

            {/* Enhanced floating stats cards */}
            <div className="absolute -top-8 -left-8 bg-white/95 dark:bg-slate-800/95 backdrop-blur-xl rounded-3xl p-6 shadow-2xl border border-white/20 dark:border-slate-700/50 transform -rotate-6 hover:rotate-0 transition-transform duration-300">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-emerald-500 rounded-2xl flex items-center justify-center shadow-lg">
                  <span className="text-3xl">★</span>
                </div>
                <div>
                  <p className="font-bold text-2xl text-slate-900 dark:text-white">
                    4.9/5
                  </p>
                  <p className="text-slate-600 dark:text-slate-400 font-medium">
                    Průměrné hodnocení
                  </p>
                </div>
              </div>
            </div>

            <div className="absolute -bottom-8 -right-8 bg-white/95 dark:bg-slate-800/95 backdrop-blur-xl rounded-3xl p-6 shadow-2xl border border-white/20 dark:border-slate-700/50 transform rotate-6 hover:rotate-0 transition-transform duration-300">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-cyan-500 rounded-2xl flex items-center justify-center shadow-lg">
                  <span className="text-3xl">👥</span>
                </div>
                <div>
                  <p className="font-bold text-2xl text-slate-900 dark:text-white">
                    25k+
                  </p>
                  <p className="text-slate-600 dark:text-slate-400 font-medium">
                    Aktivních kuchařů
                  </p>
                </div>
              </div>
            </div>

            {/* Additional floating element */}
            <div className="absolute top-1/2 -right-4 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-2xl p-4 shadow-xl transform rotate-12 hover:rotate-6 transition-transform duration-300">
              <div className="text-center">
                <p className="font-bold text-xl">1000+</p>
                <p className="text-sm opacity-90">Nových receptů</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
