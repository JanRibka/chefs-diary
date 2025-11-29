"use client";

import Link from "next/link";
import { IoHeart, IoRestaurant, IoSearch } from "react-icons/io5";

import { Button } from "@heroui/react";

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-slate-950 pt-20">
      {/* Background Layers */}
      <div className="absolute inset-0 z-0">
        {/* Animated Gradient Orbs - Adjusted for Dark Theme */}
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-primary/30 blur-[120px] animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-orange-600/20 blur-[120px] animate-pulse delay-1000" />
        <div className="absolute top-[40%] left-[40%] w-[30%] h-[30%] rounded-full bg-primary/20 blur-[100px] animate-pulse delay-2000" />

        {/* Grid Pattern Overlay - Light on Dark */}
        <div
          className="absolute inset-0 opacity-[0.05]"
          style={{
            backgroundImage: `linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)`,
            backgroundSize: "4rem 4rem",
          }}
        />
      </div>

      {/* Content Container */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center text-center">
        {/* Premium Badge */}
        <div className="mb-8 animate-in fade-in slide-in-from-bottom-4 duration-1000">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 shadow-sm">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
            </span>
            <span className="text-sm font-medium text-white/90">
              Nejlepší kuchařská komunita v ČR
            </span>
          </div>
        </div>

        {/* Main Heading */}
        <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight text-white mb-8 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-150">
          Vařte s{" "}
          <span className="text-primary relative">
            vášní
            <svg
              className="absolute w-full h-3 -bottom-1 left-0 text-primary/30"
              viewBox="0 0 100 10"
              preserveAspectRatio="none"
            >
              <path
                d="M0 5 Q 50 10 100 5"
                stroke="currentColor"
                strokeWidth="8"
                fill="none"
              />
            </svg>
          </span>
          <br className="hidden sm:block" />
          sdílejte s <span className="text-orange-400 relative">láskou</span>
        </h1>

        {/* Description */}
        <p className="text-lg sm:text-xl md:text-2xl text-slate-300 max-w-3xl mx-auto mb-12 leading-relaxed animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-300">
          Objevte tisíce ověřených receptů, vytvořte si vlastní digitální
          kuchařku a staňte se součástí komunity, která žije jídlem.
        </p>

        {/* Search Bar */}
        <div className="w-full max-w-2xl mx-auto mb-16 relative group animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-450">
          <div className="absolute -inset-1 bg-gradient-to-r from-primary via-orange-500 to-primary rounded-2xl blur opacity-40 group-hover:opacity-60 transition duration-1000 group-hover:duration-200"></div>
          <div className="relative flex items-center bg-slate-900/90 border border-white/10 rounded-2xl p-2 shadow-2xl transition-transform duration-300 group-hover:scale-[1.01]">
            <div className="pl-4 text-slate-400">
              <IoSearch className="w-6 h-6" />
            </div>
            <input
              type="text"
              placeholder="Hledat recept, surovinu nebo kuchaře..."
              className="w-full bg-transparent border-none focus:ring-0 text-lg px-4 py-3 text-white placeholder:text-slate-500"
            />
            <Button
              size="lg"
              color="primary"
              className="rounded-xl px-8 font-semibold shadow-lg shadow-primary/25 hover:shadow-primary/40 transition-all duration-300"
            >
              Hledat
            </Button>
          </div>

          {/* Popular Tags */}
          <div className="mt-4 flex flex-wrap justify-center gap-2 text-sm text-slate-400">
            <span>Populární:</span>
            {[
              "Rychlá večeře",
              "Zdravé snídaně",
              "Italská kuchyně",
              "Dezerty",
            ].map((tag) => (
              <button
                key={tag}
                className="hover:text-primary transition-colors underline decoration-dotted"
              >
                {tag}
              </button>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-600">
          <Button
            as={Link}
            href="/recipes"
            size="lg"
            color="primary"
            variant="shadow"
            className="w-full sm:w-auto px-8 py-6 text-lg font-semibold rounded-2xl"
            startContent={<IoRestaurant className="w-5 h-5" />}
          >
            Prozkoumat recepty
          </Button>
          <Button
            as={Link}
            href="/register"
            size="lg"
            variant="bordered"
            className="w-full sm:w-auto px-8 py-6 text-lg font-semibold rounded-2xl border-2 border-white/20 text-white hover:bg-white/10"
          >
            Přidat vlastní recept
          </Button>
        </div>

        {/* Floating Stats Cards - Decorative (Dark Mode Version) */}
        <div className="absolute top-1/4 left-0 hidden xl:block animate-float-slow">
          <div className="bg-slate-800/80 backdrop-blur-md p-4 rounded-2xl border border-white/10 shadow-xl transform -rotate-6 hover:rotate-0 transition-transform duration-300">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center text-green-400">
                <IoRestaurant />
              </div>
              <div>
                <div className="font-bold text-white">5000+</div>
                <div className="text-xs text-slate-400">Receptů</div>
              </div>
            </div>
          </div>
        </div>

        <div className="absolute bottom-1/4 right-0 hidden xl:block animate-float-delayed">
          <div className="bg-slate-800/80 backdrop-blur-md p-4 rounded-2xl border border-white/10 shadow-xl transform rotate-6 hover:rotate-0 transition-transform duration-300">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-orange-500/20 flex items-center justify-center text-orange-400">
                <IoHeart />
              </div>
              <div>
                <div className="font-bold text-white">10k+</div>
                <div className="text-xs text-slate-400">Oblíbených</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
