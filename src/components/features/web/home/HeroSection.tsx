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
        <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-secondary/30" />

        {/* Floating gradient orbs - larger and more prominent */}
        <div className="absolute -top-32 -right-32 w-96 h-96 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-full blur-3xl animate-pulse" />
        <div
          className="absolute -bottom-32 -left-32 w-80 h-80 bg-gradient-to-tr from-secondary/20 to-primary/15 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "2s" }}
        />
        <div
          className="absolute top-1/3 left-1/3 w-64 h-64 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-full blur-3xl animate-pulse"
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
          className="absolute top-20 left-[10%] w-6 h-6 bg-gradient-to-br from-primary to-primary-light rounded-full opacity-40 animate-bounce"
          style={{ animationDelay: "0s", animationDuration: "3s" }}
        />
        <div
          className="absolute top-32 right-[15%] w-4 h-4 bg-gradient-to-br from-secondary to-secondary-dark rounded-full opacity-30 animate-bounce"
          style={{ animationDelay: "1s", animationDuration: "4s" }}
        />
        <div
          className="absolute bottom-40 left-[20%] w-5 h-5 bg-gradient-to-br from-primary-light to-primary rounded-full opacity-35 animate-bounce"
          style={{ animationDelay: "2s", animationDuration: "5s" }}
        />
        <div
          className="absolute top-1/2 right-[8%] w-3 h-3 bg-gradient-to-br from-secondary-light to-secondary rounded-full opacity-25 animate-bounce"
          style={{ animationDelay: "3s", animationDuration: "6s" }}
        />
      </div>

      <div className="relative z-10 max-w-main mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Enhanced Left Content */}
          <div className="space-y-10 text-center lg:text-left">
            {/* Premium badge */}
            <div className="inline-flex items-center gap-3 bg-secondary/50 px-6 py-3 rounded-full text-foreground text-sm font-semibold border border-border backdrop-blur-sm shadow-lg">
              <GiChefToque className="w-5 h-5 text-primary" />
              <span>Vítejte v kulinářském světě</span>
              <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
            </div>

            {/* Enhanced heading with better typography */}
            <div className="space-y-4">
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black leading-tight tracking-tight">
                <span className="text-foreground">
                  Objevte chuť
                </span>
                <br />
                <span className="bg-gradient-to-r from-primary via-primary-light to-secondary bg-clip-text text-transparent animate-pulse">
                  dokonalosti
                </span>
              </h1>

              <div className="w-24 h-1 bg-gradient-to-r from-primary to-primary-light mx-auto lg:mx-0 rounded-full" />
            </div>

            {/* Enhanced description */}
            <p className="text-xl sm:text-2xl text-muted-foreground leading-relaxed max-w-2xl mx-auto lg:mx-0 font-light">
              Tisíce receptů od profesionálních kuchařů i domácích nadšenců.
              <span className="font-medium text-foreground">
                {" "}
                Sdílejte své kulinářské umění
              </span>{" "}
              a inspirujte se ostatními.
            </p>

            {/* Enhanced action buttons */}
            <div className="flex flex-col sm:flex-row gap-6 justify-center lg:justify-start">
              <Button
                as={Link}
                href="/recipes"
                size="lg"
                className="bg-primary text-primary-foreground font-bold px-10 py-4 text-lg rounded-2xl shadow-2xl hover:shadow-3xl hover:bg-primary-dark transition-all duration-300 transform hover:scale-105"
                endContent={<IoArrowForward className="w-6 h-6" />}
              >
                Prozkoumat recepty
              </Button>
              <Button
                as={Link}
                href="/create-recipe"
                size="lg"
                variant="bordered"
                className="font-bold px-10 py-4 text-lg rounded-2xl border-3 border-border hover:border-primary hover:bg-secondary/50 transition-all duration-300 backdrop-blur-sm text-foreground"
                startContent={<GiChefToque className="w-6 h-6" />}
              >
                Vytvořit recept
              </Button>
            </div>

            {/* Enhanced search bar */}
            <div className="max-w-lg mx-auto lg:mx-0">
              <div className="relative group">
                <input
                  type="text"
                  placeholder="Hledat recepty, ingredience, kuchaře..."
                  className="w-full px-8 py-5 pr-16 rounded-3xl border-3 border-border bg-background/90 backdrop-blur-md text-foreground placeholder-muted-foreground focus:outline-none focus:border-primary focus:ring-6 focus:ring-primary/20 transition-all duration-300 shadow-lg group-hover:shadow-xl text-lg"
                />
                <button className="absolute right-2 top-1/2 -translate-y-1/2 p-3 bg-primary hover:bg-primary-dark rounded-2xl transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105">
                  <IoSearch className="w-6 h-6 text-primary-foreground" />
                </button>
              </div>

              {/* Popular search tags */}
              <div className="flex flex-wrap gap-2 mt-4 justify-center lg:justify-start">
                {["🍕 Pizza", "🥗 Salády", "🍰 Dezerty", "🥘 Rychlé"].map(
                  (tag) => (
                    <span
                      key={tag}
                      className="px-4 py-2 bg-background/60 backdrop-blur-sm rounded-full text-sm text-muted-foreground border border-border hover:bg-secondary cursor-pointer transition-all duration-200"
                    >
                      {tag}
                    </span>
                  )
                )}
              </div>
            </div>
          </div>

          {/* Enhanced Right Content - Hero Image */}
          <div className="relative">
            <div className="relative w-full h-hero lg:h-hero-lg rounded-3xl overflow-hidden shadow-2xl transform rotate-3 hover:rotate-0 transition-transform duration-500">
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
                <div className="bg-background/90 backdrop-blur-md rounded-2xl p-4 shadow-xl">
                  <p className="text-foreground font-semibold">
                    ✨ Nejnovější recept
                  </p>
                  <p className="text-muted-foreground text-sm">
                    Italská pasta s truflemi
                  </p>
                </div>
              </div>
            </div>

            {/* Enhanced floating stats cards */}
            <div className="absolute -top-8 -left-8 bg-card/95 backdrop-blur-xl rounded-3xl p-6 shadow-2xl border border-border transform -rotate-6 hover:rotate-0 transition-transform duration-300">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-emerald-500 rounded-2xl flex items-center justify-center shadow-lg">
                  <span className="text-3xl">⭐</span>
                </div>
                <div>
                  <p className="font-bold text-2xl text-foreground">
                    4.9/5
                  </p>
                  <p className="text-muted-foreground font-medium">
                    Průměrné hodnocení
                  </p>
                </div>
              </div>
            </div>

            <div className="absolute -bottom-8 -right-8 bg-card/95 backdrop-blur-xl rounded-3xl p-6 shadow-2xl border border-border transform rotate-6 hover:rotate-0 transition-transform duration-300">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-cyan-500 rounded-2xl flex items-center justify-center shadow-lg">
                  <span className="text-3xl">👥</span>
                </div>
                <div>
                  <p className="font-bold text-2xl text-foreground">
                    25k+
                  </p>
                  <p className="text-muted-foreground font-medium">
                    Aktivních kuchařů
                  </p>
                </div>
              </div>
            </div>

            {/* Additional floating element */}
            <div className="absolute top-1/2 -right-4 bg-primary text-primary-foreground rounded-2xl p-4 shadow-xl transform rotate-12 hover:rotate-6 transition-transform duration-300">
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
