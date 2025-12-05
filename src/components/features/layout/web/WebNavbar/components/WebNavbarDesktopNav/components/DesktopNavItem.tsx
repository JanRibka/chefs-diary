import NextLink from "next/link";
import { usePathname } from "next/navigation";
import { memo } from "react";

import { WebNavbarMegaMenu } from "../../WebNavbarMegaMenu/WebNavbarMegaMenu";
import { navSharedStyles } from "../../../styles/navSharedStyles";
import type { WebMenuItemType } from "@/lib/types/web/WebMenuItemType";

interface DesktopNavItemProps {
  item: WebMenuItemType;
  activeMegaMenu: string | null;
  onMouseEnter: (key: string, hasMegaMenu: boolean) => void;
  onMouseLeave: () => void;
  onCloseMegaMenu: () => void;
}

/**
 * DesktopNavItem - Individual desktop navigation item with mega menu support
 * Handles mega menu detection, active state, and rendering
 */
export const DesktopNavItem = memo(
  ({
    item,
    activeMegaMenu,
    onMouseEnter,
    onMouseLeave,
    onCloseMegaMenu,
  }: DesktopNavItemProps) => {
    // DATA COLOCATION: usePathname called where it's used
    const pathname = usePathname();

    const hasMegaMenu =
      item.megaMenu && item.subitems && item.subitems.length > 0;
    const isMegaMenuActive = activeMegaMenu === item.key;

    // Check if current path matches the menu item href
    const isCurrentPage =
      item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);

    const isActive = isMegaMenuActive || isCurrentPage;

    // Apply shared styles
    const styles = navSharedStyles({
      active: isActive,
      mobile: false,
      megaMenuActive: isMegaMenuActive,
    });

    return (
      <li
        key={item.key}
        className="relative"
        onMouseEnter={() => onMouseEnter(item.key, !!hasMegaMenu)}
        onMouseLeave={onMouseLeave}
      >
        <NextLink
          href={item.href}
          className={styles.link()}
          onMouseEnter={
            hasMegaMenu ? () => onMouseEnter(item.key, true) : undefined
          }
          onMouseLeave={hasMegaMenu ? onMouseLeave : undefined}
        >
          {/* Label */}
          <span className={styles.label()}>
            {item.label}

            {/* Underline Animation */}
            <span className={styles.underline()} />
          </span>

          {/* Chevron for Mega Menu */}
          {hasMegaMenu && (
            <svg
              className={`w-3 h-3 ml-0.5 ${styles.chevron()}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          )}
        </NextLink>

        {/* Invisible Bridge to prevent closing when moving to menu */}
        {hasMegaMenu && (
          <div className="absolute top-full left-0 w-full h-10 bg-transparent" />
        )}

        {/* Mega Menu */}
        {hasMegaMenu && (
          <WebNavbarMegaMenu
            items={item.subitems || []}
            isOpen={isMegaMenuActive}
            onClose={onCloseMegaMenu}
            onMouseEnter={() => onMouseEnter(item.key, true)}
            onMouseLeave={onMouseLeave}
          />
        )}
      </li>
    );
  }
);

DesktopNavItem.displayName = "DesktopNavItem";
