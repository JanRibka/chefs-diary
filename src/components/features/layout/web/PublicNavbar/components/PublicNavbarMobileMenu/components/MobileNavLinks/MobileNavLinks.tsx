"use client";

import NextLink from 'next/link';
import { memo, useMemo } from 'react';
import { IoArrowForward } from 'react-icons/io5';

import { mergeStyles } from '@/lib/utils/styles';

import { mobileNavLinksStyles } from './styles/mobileNavLinksStyles';

import type { NavItem } from "../../../../types/NavItem";
interface MobileNavLinksProps {
  items: NavItem[];
  onClose: () => void;
}

/**
 * MobileNavLinks - Animated mobile navigation links
 */
export const MobileNavLinks = memo(
  ({ items, onClose }: MobileNavLinksProps) => {
    // Get styles from tailwind-variants
    const styles = mobileNavLinksStyles();

    const navLinks = useMemo(
      () =>
        items.map((item, index) => (
          <li key={item.href} className={styles.navItem()}>
            <NextLink
              href={item.href}
              className={styles.navLink()}
              onClick={onClose}
            >
              {/* Animated background */}
              <div
                className={mergeStyles(
                  styles.animatedBackground(),
                  "bg-gradient-to-r",
                  item.color
                )}
              />

              {/* Ripple effect */}
              <div className={styles.rippleEffect()} />

              {/* Content with icon */}
              <div className={styles.content()}>
                <div className={styles.iconContainer()}>
                  <span
                    className={styles.icon()}
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    {item.icon}
                  </span>
                  <div className={styles.iconGlow()} />
                </div>
                <div className={styles.textContainer()}>
                  <span className={styles.label()}>{item.label}</span>
                  <div className={styles.underline()} />
                </div>
                <div className={styles.arrowContainer()}>
                  <IoArrowForward className={styles.arrow()} />
                </div>
              </div>
            </NextLink>

            {/* Side glow effect */}
            <div
              className={`${styles.sideGlow()} bg-gradient-to-b ${item.color}`}
            />
          </li>
        )),
      [items, onClose, styles]
    );

    return (
      <nav className={styles.nav()}>
        <ul className={styles.navList()}>{navLinks}</ul>
      </nav>
    );
  }
);

MobileNavLinks.displayName = "MobileNavLinks";
