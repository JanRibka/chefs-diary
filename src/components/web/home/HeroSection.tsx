"use client";

import Image from 'next/image';
import Link from 'next/link';
import { GiChefToque } from 'react-icons/gi';
import { IoArrowForward, IoSearch } from 'react-icons/io5';

import { Button } from '@heroui/react';

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-orange-50 via-white to-red-50 dark:from-default-900 dark:via-default-800 dark:to-default-900">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
      </div>

      {/* Floating Elements */}
      <div
        className="absolute top-20 left-10 w-20 h-20 bg-orange-200 dark:bg-orange-800 rounded-full opacity-20 animate-bounce"
        style={{ animationDelay: "0s" }}
      />
      <div
        className="absolute top-40 right-20 w-16 h-16 bg-red-200 dark:bg-red-800 rounded-full opacity-20 animate-bounce"
        style={{ animationDelay: "1s" }}
      />
      <div
        className="absolute bottom-40 left-20 w-12 h-12 bg-yellow-200 dark:bg-yellow-800 rounded-full opacity-20 animate-bounce"
        style={{ animationDelay: "2s" }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 bg-orange-100 dark:bg-orange-900/30 px-4 py-2 rounded-full text-orange-800 dark:text-orange-200 text-sm font-medium">
              <GiChefToque className="w-4 h-4" />
              Vítejte v kulinářském světě
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white leading-tight">
              Objevte chuť
              <span className="block bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
                dokonalosti
              </span>
            </h1>

            <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto lg:mx-0">
              Tisíce receptů od profesionálních kuchařů i domácích nadšenců.
              Sdílejte své kulinářské umění a inspirujte se ostatními.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button
                as={Link}
                href="/recipes"
                size="lg"
                color="primary"
                variant="solid"
                className="font-semibold px-8 py-3 text-lg"
                endContent={<IoArrowForward className="w-5 h-5" />}
              >
                Prozkoumat recepty
              </Button>
              <Button
                as={Link}
                href="/create-recipe"
                size="lg"
                variant="bordered"
                className="font-semibold px-8 py-3 text-lg border-2"
                startContent={<GiChefToque className="w-5 h-5" />}
              >
                Vytvořit recept
              </Button>
            </div>

            {/* Search Bar */}
            <div className="max-w-md mx-auto lg:mx-0 mt-8">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Hledat recepty..."
                  className="w-full px-6 py-4 pr-12 rounded-2xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-default-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/20 transition-all"
                />
                <button className="absolute right-3 top-1/2 -translate-y-1/2 p-2 bg-primary hover:bg-primary-600 rounded-xl transition-colors">
                  <IoSearch className="w-5 h-5 text-white" />
                </button>
              </div>
            </div>
          </div>

          {/* Right Content - Hero Image */}
          <div className="relative">
            <div className="relative w-full h-96 lg:h-[500px] rounded-3xl overflow-hidden shadow-2xl">
              <Image
                src="/api/placeholder/600/500"
                alt="Delicious food"
                fill
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
            </div>

            {/* Floating Cards */}
            <div className="absolute -top-6 -left-6 bg-white dark:bg-default-800 rounded-2xl p-4 shadow-xl border border-gray-200 dark:border-gray-700">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-xl flex items-center justify-center">
                  <span className="text-2xl">⭐</span>
                </div>
                <div>
                  <p className="font-semibold text-gray-900 dark:text-white">
                    4.9/5
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Průměrné hodnocení
                  </p>
                </div>
              </div>
            </div>

            <div className="absolute -bottom-6 -right-6 bg-white dark:bg-default-800 rounded-2xl p-4 shadow-xl border border-gray-200 dark:border-gray-700">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-xl flex items-center justify-center">
                  <span className="text-2xl">👥</span>
                </div>
                <div>
                  <p className="font-semibold text-gray-900 dark:text-white">
                    10k+
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Aktivních uživatelů
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
