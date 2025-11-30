"use client";

import NextLink from "next/link";
import { GiChefToque, GiScrollQuill } from "react-icons/gi";
import { HiSparkles } from "react-icons/hi2";

import { fontDisplay, fontOrn, fontSerif } from "@/config/app/fonts";
import { mergeStyles } from "@/lib/utils/styles";

import { logoColorVariants } from "./styles/logoColorVariants";
import { logoContainerVariants } from "./styles/logoContainerVariants";
import { logoGlowSizeVariants } from "./styles/logoGlowSizeVariants";
import { logoLinkVariants } from "./styles/logoLinkVariants";
import { logoScrollSizeVariants } from "./styles/logoScrollSizeVariants";
import { logoTextBottomVariants } from "./styles/logoTextBottomVariants";
import LogoTextDecoration from "./styles/LogoTextDecoration";
import { logoTextTopVariants } from "./styles/logoTextTopVariants";
import { logoToqueSizeVariants } from "./styles/logoToqueSizeVariants";
import { LogoProps } from "./types/LogoProps";

export default function Logo({
  scrolled = false,
  showText = true,
  href = "/",
  className = "",
  size = "md",
  disableHover = false,
  variant = "default",
}: LogoProps) {
  const LogoContent = () => (
    <div
      className={mergeStyles(
        logoContainerVariants({ disableHover }),
        className
      )}
    >
      {/* Enhanced Logo with 3D effect and animations */}
      <div className="relative">
        {/* Main logo container */}
        <div
          className={logoColorVariants({
            variant,
            size,
            scrolled,
            disableHover,
          })}
        >
          <div className="relative">
            {/* Scroll icon */}
            <GiScrollQuill
              className={logoScrollSizeVariants({ size, scrolled })}
            />
            {/* Chef toque */}
            <GiChefToque
              className={logoToqueSizeVariants({ size, scrolled })}
            />
            {/* Sparkles */}
            <HiSparkles className="w-3 h-3 text-yellow-300 absolute -top-2 -right-2 animate-sparkle" />
            <HiSparkles className="w-2 h-2 text-yellow-200 absolute -bottom-1 -left-1 animate-sparkle-delayed" />
          </div>
        </div>

        {/* Glow effect */}
        <div
          className={logoGlowSizeVariants({
            variant,
            size,
            scrolled,
            disableHover,
          })}
        />

        {/* Rotating glow ring on hover */}
        <div className="absolute inset-0 -z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-primary via-secondary to-primary blur-xl animate-spin-slow" />
        </div>
      </div>

      {/* Brand Text */}
      {showText && (
        <div className="hidden sm:flex flex-col leading-none">
          {/* Font imports for build */}
          <span className={`${fontDisplay.variable} sr-only`}>
            display-font
          </span>
          <span className={`${fontSerif.variable} sr-only`}>serif-font</span>

          {/* Top text */}
          <span
            className={mergeStyles(
              fontOrn.variable,
              logoTextTopVariants({ variant, size, scrolled })
            )}
            style={{ fontFamily: `var(${fontOrn.variable})` }}
          >
            Kuchařův
          </span>

          {/* Bottom text */}
          <span
            className={mergeStyles(
              fontOrn.variable,
              logoTextBottomVariants({ variant, size, scrolled })
            )}
            style={{ fontFamily: `var(${fontOrn.variable})` }}
          >
            Deník
            <LogoTextDecoration />
            {/* Underline effect */}
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-primary to-primary group-hover:w-full transition-all duration-500" />
          </span>
        </div>
      )}
    </div>
  );

  if (href) {
    return (
      <NextLink href={href} className={logoLinkVariants({ disableHover })}>
        <LogoContent />
      </NextLink>
    );
  }

  return <LogoContent />;
}
