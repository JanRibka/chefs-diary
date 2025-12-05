"use client";

import NextLink from "next/link";
import { usePathname } from "next/navigation";
import { memo, useMemo, useState, useCallback, useEffect, useRef } from "react";
import { IoChevronDown } from "react-icons/io5";

import { mobileNavLinksStyles } from "./styles/mobileNavLinksStyles";
import { navSharedStyles } from "../../../../styles/navSharedStyles";
import WebMenuItemType from "@/lib/types/web/WebMenuItemType";

interface MobileNavLinksProps {
  items: WebMenuItemType[];
  onClose: () => void;
}

/**
 * MobileNavLinks - Mobile navigation with expandable categories
 * Simple custom implementation for better control
 */
export const MobileNavLinks = memo(
  ({ items, onClose }: MobileNavLinksProps) => {
    const pathname = usePathname();
    const styles = mobileNavLinksStyles();
    const [expandedKey, setExpandedKey] = useState<string | null>(null);
    const prevPathnameRef = useRef(pathname);

    const toggleExpand = useCallback((key: string) => {
      setExpandedKey((prev) => (prev === key ? null : key));
    }, []);

    // Close menu when navigation happens (pathname changes, not on mount)
    useEffect(() => {
      if (prevPathnameRef.current !== pathname) {
        onClose();
        prevPathnameRef.current = pathname;
      }
    }, [pathname, onClose]);

    const navLinks = useMemo(
      () =>
        items.map((item) => {
          const hasSubitems = item.subitems && item.subitems.length > 0;
          const isCurrentPage =
            item.href === "/"
              ? pathname === "/"
              : pathname.startsWith(item.href);
          const isExpanded = expandedKey === item.key;

          // For items with subitems, use custom expandable
          if (hasSubitems) {
            // Shared styles for mobile link - use isCurrentPage, not isExpanded
            const linkStyles = navSharedStyles({
              active: isCurrentPage,
              mobile: true,
            });

            return (
              <li key={item.key} className={styles.navItem()}>
                {/* Trigger button */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    e.nativeEvent.stopImmediatePropagation();
                    toggleExpand(item.key);
                  }}
                  className={linkStyles.link({
                    class: "justify-between w-full",
                  })}
                >
                  <span className={linkStyles.label()}>
                    {item.label}
                    <span className={linkStyles.underline()} />
                  </span>
                  <IoChevronDown
                    className={linkStyles.chevron({
                      class: isExpanded ? "rotate-180" : "",
                    })}
                  />
                </button>

                {/* Expandable content */}
                {/* Expandable content with animation */}
                <div
                  className={styles.subitemsWrapper({ expanded: isExpanded })}
                >
                  <div className={styles.subitemsInner()}>
                    <ul className={styles.subitemsList()}>
                      {item.subitems!.map((subitem) => {
                        const isSubitemActive = pathname.startsWith(
                          subitem.href
                        );
                        const subLinkStyles = navSharedStyles({
                          active: isSubitemActive,
                          mobile: true,
                        });

                        return (
                          <li key={subitem.key}>
                            <NextLink
                              href={subitem.href}
                              className={subLinkStyles.link({
                                class: "text-sm pl-4",
                              })}
                            >
                              <span className={subLinkStyles.label()}>
                                {subitem.label}
                                <span className={subLinkStyles.underline()} />
                              </span>
                            </NextLink>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                </div>
              </li>
            );
          }

          // For regular items without subitems
          const linkStyles = navSharedStyles({
            active: isCurrentPage,
            mobile: true,
          });

          return (
            <li key={item.key} className={styles.navItem()}>
              <NextLink href={item.href} className={linkStyles.link()}>
                <span className={linkStyles.label()}>
                  {item.label}
                  <span className={linkStyles.underline()} />
                </span>
              </NextLink>
            </li>
          );
        }),
      [items, pathname, styles, expandedKey, toggleExpand]
    );

    return (
      <nav className={styles.nav()}>
        <ul className={styles.navList()}>{navLinks}</ul>
      </nav>
    );
  }
);

MobileNavLinks.displayName = "MobileNavLinks";
