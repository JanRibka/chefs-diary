"use client";

import NextLink from "next/link";
import { memo, useMemo } from "react";

import { NAV_ITEMS } from "../../constants/navItems";
import { desktopNavStyles } from "./styles/desktopNavStyles";

/**
 * WebNavbarDesktopNav - Desktop navigation links with hover effects
 * DATA COLOCATION: NAV_ITEMS constant is here because it's only used here
 *
 * @example
 * <WebNavbarDesktopNav />
 */
export const WebNavbarDesktopNav = memo(() => {
  // Get styles from tailwind-variants
  const styles = desktopNavStyles();

  const navItems = useMemo(
    () =>
      NAV_ITEMS.map((item, index) => (
        <li key={item.href} className={styles.navItem()}>
          <NextLink href={item.href} className={styles.navLink()}>
            {/* Background hover effect */}
            <div className={styles.backgroundHover()} />

            {/* Shimmer effect */}
            <div className={styles.shimmerEffect()} />

            {/* Glow effect */}
            <div className={styles.glowEffect()} />

            {/* Content */}
            <div className={styles.content()}>
              <span
                className={styles.icon()}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {item.icon}
              </span>
              <span className={styles.label()}>{item.label}</span>
            </div>

            {/* Bottom indicator */}
            <div className={styles.bottomIndicator()} />
          </NextLink>

          {/* Tooltip */}
          <div className={styles.tooltip()}>
            <div className={styles.tooltipContent()}>
              <span>{item.icon}</span>
              <span>{item.description}</span>
            </div>
            {/* Tooltip arrow */}
            <div className={styles.tooltipArrow()} />
          </div>
        </li>
      )),
    [styles]
  );

  return (
    <nav className={styles.nav()}>
      <ul className={styles.navList()}>{navItems}</ul>
    </nav>
  );
});

WebNavbarDesktopNav.displayName = "WebNavbarDesktopNav";
