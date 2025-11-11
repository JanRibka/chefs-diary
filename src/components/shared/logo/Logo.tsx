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
      {/* Enhanced Logo with 3D effect - responsive to scroll */}
      <div className="relative">
        <div
          className={logoColorVariants({
            variant,
            size,
            scrolled,
            disableHover,
          })}
        >
          <div className="relative">
            <GiScrollQuill
              className={logoScrollSizeVariants({ size, scrolled })}
            />
            <GiChefToque
              className={logoToqueSizeVariants({ size, scrolled })}
            />
            <HiSparkles className="w-3 h-3 text-yellow-200 absolute -top-2 -right-2 animate-pulse" />
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
            className={mergeStyles(
              fontOrn.variable,
              logoTextTopVariants({ variant, size, scrolled })
            )}
            style={{ fontFamily: `var(${fontOrn.variable})` }}
          >
            Kuchařův
          </span>
          <span
            className={mergeStyles(
              fontOrn.variable,
              logoTextBottomVariants({ variant, size, scrolled })
            )}
            style={{ fontFamily: `var(${fontOrn.variable})` }}
          >
            Deník
            <LogoTextDecoration />
          </span>
          {/* tagline removed per user request */}
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
