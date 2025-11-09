"use client";

import NextLink from "next/link";
import { GiChefToque, GiScrollQuill } from "react-icons/gi";
import { HiSparkles } from "react-icons/hi2";

import { fontDisplay, fontOrn } from "@/config/app/fonts";

interface LogoProps {
  size?: "sm" | "md" | "lg" | "xl";
  showText?: boolean;
  href?: string;
  className?: string;
}

export default function Logo({
  size = "lg",
  showText = true,
  href = "/",
  className = ""
}: LogoProps) {
  const sizeClasses = {
    sm: "w-8 h-8 lg:w-10 lg:h-10",
    md: "w-12 h-12 lg:w-14 lg:h-14",
    lg: "w-16 h-16 lg:w-20 lg:h-20",
    xl: "w-20 h-20 lg:w-24 lg:h-24"
  };

  const iconSizes = {
    sm: "w-4 h-4 lg:w-5 lg:h-5",
    md: "w-6 h-6 lg:w-7 lg:h-7",
    lg: "w-8 h-8 lg:w-10 lg:h-10",
    xl: "w-10 h-10 lg:w-12 lg:h-12"
  };

  const textSizes = {
    sm: "text-xs lg:text-sm",
    md: "text-sm lg:text-base",
    lg: "text-lg lg:text-xl",
    xl: "text-xl lg:text-2xl"
  };

  const LogoContent = () => (
    <div className={`flex items-center gap-4 group ${className}`}>
      {/* Enhanced Logo with 3D effect */}
      <div className="relative">
        <div
          className={`bg-gradient-to-br from-orange-500 via-red-500 to-pink-600 rounded-3xl shadow-2xl shadow-orange-500/25 group-hover:shadow-orange-500/40 transition-all duration-500 flex items-center justify-center transform group-hover:scale-105 group-hover:rotate-3 ${sizeClasses[size]}`}
        >
          <div className="relative">
            <GiScrollQuill
              className={`text-white drop-shadow-lg ${iconSizes[size]}`}
            />
            <GiChefToque
              className={`text-white absolute -top-1 -right-1 drop-shadow-lg ${iconSizes[size] === 'w-8 h-8 lg:w-10 lg:h-10' ? 'w-6 h-6 lg:w-8 lg:h-8' : iconSizes[size] === 'w-10 h-10 lg:w-12 lg:h-12' ? 'w-8 h-8 lg:w-10 lg:h-10' : 'w-4 h-4 lg:w-5 lg:h-5'}`}
            />
            <HiSparkles className="w-3 h-3 text-yellow-200 absolute -top-2 -right-2 animate-pulse" />
          </div>
        </div>
        {/* Glow effect */}
        <div
          className={`absolute inset-0 bg-gradient-to-br from-orange-500 to-red-500 rounded-3xl blur-xl opacity-30 group-hover:opacity-50 transition-opacity duration-500 -z-10 ${sizeClasses[size]}`}
        />
      </div>

      {/* Brand Text - elegant serif wordmark */}
      {showText && (
        <div className="flex flex-col leading-none">
          {/* keep fontDisplay and fontSerif imported for other components and builds */}
          <span className={`${fontDisplay.variable} sr-only`}>
            display-font
          </span>
          <span className={`${fontOrn.variable} sr-only`}>
            serif-font
          </span>
          <span
            className={`${fontOrn.variable} tracking-widest uppercase text-amber-700 dark:text-amber-300 font-semibold opacity-95 ${textSizes[size]}`}
            style={{ fontFamily: `var(${fontOrn.variable})` }}
          >
            Kuchařův
          </span>
          <span
            className={`${fontOrn.variable} font-extrabold tracking-tight text-amber-900 dark:text-amber-100 -mt-1 flex items-center gap-2 ${textSizes[size]}`}
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
        </div>
      )}
    </div>
  );

  if (href) {
    return (
      <NextLink href={href} className="group">
        <LogoContent />
      </NextLink>
    );
  }

  return <LogoContent />;
}