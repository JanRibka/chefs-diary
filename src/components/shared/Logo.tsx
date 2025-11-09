"use client";

import NextLink from "next/link";
import { GiChefToque, GiScrollQuill } from "react-icons/gi";
import { HiSparkles } from "react-icons/hi2";

import { fontDisplay, fontOrn, fontSerif } from "@/config/app/fonts";

interface LogoProps {
  scrolled?: boolean;
  showText?: boolean;
  href?: string;
  className?: string;
  size?: "sm" | "md" | "lg" | "xl";
  disableHover?: boolean;
}

export default function Logo({
  scrolled = false,
  showText = true,
  href = "/",
  className = "",
  size = "md",
  disableHover = false,
}: LogoProps) {
  // Size configurations
  const sizeConfig = {
    sm: {
      container: scrolled
        ? "w-8 h-8 lg:w-10 lg:h-10"
        : "w-10 h-10 lg:w-12 lg:h-12",
      scroll: scrolled ? "w-4 h-4 lg:w-5 lg:h-5" : "w-5 h-5 lg:w-6 lg:h-6",
      toque: scrolled ? "w-3 h-3 lg:w-4 lg:h-4" : "w-4 h-4 lg:w-5 lg:h-5",
      textTop: scrolled ? "text-xs" : "text-sm",
      textBottom: scrolled ? "text-lg lg:text-xl" : "text-xl lg:text-2xl",
    },
    md: {
      container: scrolled
        ? "w-10 h-10 lg:w-12 lg:h-12"
        : "w-12 h-12 lg:w-14 lg:h-14",
      scroll: scrolled ? "w-5 h-5 lg:w-6 lg:h-6" : "w-6 h-6 lg:w-7 lg:h-7",
      toque: scrolled ? "w-4 h-4 lg:w-5 lg:h-5" : "w-5 h-5 lg:w-6 lg:h-6",
      textTop: scrolled ? "text-xs" : "text-sm",
      textBottom: scrolled ? "text-xl lg:text-2xl" : "text-2xl lg:text-3xl",
    },
    lg: {
      container: scrolled
        ? "w-12 h-12 lg:w-14 lg:h-14"
        : "w-14 h-14 lg:w-16 lg:h-16",
      scroll: scrolled ? "w-6 h-6 lg:w-7 lg:h-7" : "w-7 h-7 lg:w-8 lg:h-8",
      toque: scrolled ? "w-5 h-5 lg:w-6 lg:h-6" : "w-6 h-6 lg:w-7 lg:h-7",
      textTop: scrolled ? "text-sm" : "text-base",
      textBottom: scrolled ? "text-2xl lg:text-3xl" : "text-3xl lg:text-4xl",
    },
    xl: {
      container: scrolled
        ? "w-16 h-16 lg:w-18 lg:h-18"
        : "w-18 h-18 lg:w-20 lg:h-20",
      scroll: scrolled ? "w-8 h-8 lg:w-9 lg:h-9" : "w-9 h-9 lg:w-10 lg:h-10",
      toque: scrolled ? "w-7 h-7 lg:w-8 lg:h-8" : "w-8 h-8 lg:w-9 lg:h-9",
      textTop: scrolled ? "text-base" : "text-lg",
      textBottom: scrolled ? "text-3xl lg:text-4xl" : "text-4xl lg:text-5xl",
    },
  };

  const currentSize = sizeConfig[size];

  const LogoContent = () => (
    <div
      className={`flex items-center gap-3 ${
        disableHover ? "" : "group"
      } ${className}`}
    >
      {/* Enhanced Logo with 3D effect - responsive to scroll */}
      <div className="relative">
        <div
          className={`bg-gradient-to-br from-orange-500 via-red-500 to-pink-600 rounded-2xl shadow-xl shadow-orange-500/25 ${
            disableHover ? "" : "group-hover:shadow-orange-500/40"
          } transition-all duration-500 flex items-center justify-center ${
            disableHover
              ? ""
              : "transform group-hover:scale-105 group-hover:rotate-3"
          } ${currentSize.container}`}
        >
          <div className="relative">
            <GiScrollQuill
              className={`text-white drop-shadow-lg ${currentSize.scroll}`}
            />
            <GiChefToque
              className={`text-white absolute -top-1 -right-1 drop-shadow-lg ${currentSize.toque}`}
            />
            <HiSparkles className="w-3 h-3 text-yellow-200 absolute -top-2 -right-2 animate-pulse" />
          </div>
        </div>
        {/* Glow effect */}
        <div
          className={`absolute inset-0 bg-gradient-to-br from-orange-500 to-red-500 rounded-2xl blur-xl opacity-30 ${
            disableHover ? "" : "group-hover:opacity-50"
          } transition-opacity duration-500 -z-10 ${currentSize.container}`}
        />
      </div>

      {/* Brand Text - elegant serif wordmark */}
      {showText && (
        <div className="hidden sm:flex flex-col leading-none">
          {/* keep fontDisplay and fontSerif imported for other components and builds */}
          <span className={`${fontDisplay.variable} sr-only`}>
            display-font
          </span>
          <span className={`${fontSerif.variable} sr-only`}>serif-font</span>
          <span
            className={`${fontOrn.variable} tracking-tight uppercase text-amber-700 dark:text-amber-300 font-semibold opacity-95 text-left ${currentSize.textTop}`}
            style={{ fontFamily: `var(${fontOrn.variable})` }}
          >
            Kuchařův
          </span>
          <span
            className={`${fontOrn.variable} font-extrabold tracking-tight text-amber-900 dark:text-amber-100 -mt-1 flex items-center gap-2 text-left ${currentSize.textBottom}`}
            style={{ fontFamily: `var(${fontOrn.variable})` }}
          >
            Deník
            <svg
              width="28"
              height="8"
              viewBox="0 0 28 8"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="opacity-80"
            >
              <path
                d="M0 4C2 2 6 1 9 1C12 1 16 2 18 3C20 4 24 6 28 4"
                stroke="currentColor"
                strokeWidth="0.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
          {/* tagline removed per user request */}
        </div>
      )}
    </div>
  );

  if (href) {
    return (
      <NextLink href={href} className={disableHover ? "" : "group"}>
        <LogoContent />
      </NextLink>
    );
  }

  return <LogoContent />;
}
