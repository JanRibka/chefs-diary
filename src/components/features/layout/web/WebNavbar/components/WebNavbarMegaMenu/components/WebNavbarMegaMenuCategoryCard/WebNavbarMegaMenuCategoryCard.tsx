import NextLink from "next/link";
import { memo } from "react";
import {
  CATEGORY_ICONS,
  DEFAULT_CATEGORY_ICON,
} from "./constants/categoryIcons";
import { categoryCardVariants } from "./styles/categoryCardVariants";
import { getVariantIndex } from "./utils/variantUtils";

interface NavItem {
  key: string;
  label: string;
  href: string;
}

interface WebNavbarMegaMenuCategoryCardProps {
  item: NavItem;
  index: number;
  onClose: () => void;
}

/**
 * WebNavbarMegaMenuCategoryCard - Individual category card with icon and gradient
 * Displays a single category with icon, gradient background, and hover effects
 * Uses Data Colocation - constants are imported directly, not passed as props
 * Uses tailwind-variants for all styling - gradients and colors as variants
 *
 * @example
 * <WebNavbarMegaMenuCategoryCard item={navItem} index={0} onClose={handleClose} />
 */
export const WebNavbarMegaMenuCategoryCard = memo(
  ({ item, index, onClose }: WebNavbarMegaMenuCategoryCardProps) => {
    const icon = CATEGORY_ICONS[item.key] || DEFAULT_CATEGORY_ICON;

    // Get variant styles with gradient and iconColor variants
    const styles = categoryCardVariants({
      gradient: getVariantIndex(index),
      iconColor: getVariantIndex(index),
    });

    return (
      <NextLink href={item.href} onClick={onClose} className={styles.card()}>
        {/* Icon Circle */}
        <div className={styles.iconCircle()}>
          <div className={styles.icon()}>{icon}</div>
        </div>

        {/* Content */}
        <div className={styles.content()}>
          <h4 className={styles.title()}>{item.label}</h4>
          <p className={styles.description()}>Prozkoumat recepty</p>
        </div>

        {/* Arrow Icon (visible on hover) */}
        <svg
          className={styles.arrow()}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 5l7 7-7 7"
          />
        </svg>
      </NextLink>
    );
  }
);

WebNavbarMegaMenuCategoryCard.displayName = "WebNavbarMegaMenuCategoryCard";
