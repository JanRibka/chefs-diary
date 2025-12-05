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
        {/* Gradient Background - Visible by default, darkens on hover */}
        <div className={styles.gradientOverlay()} />

        {/* Gradient Overlay on Hover - for better text contrast */}
        <div className={styles.textOverlay()} />

        {/* Pattern Background */}
        <div
          className={styles.patternBg()}
          style={{
            backgroundImage:
              "radial-gradient(circle at 20px 20px, currentColor 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />

        {/* Content */}
        <div className={styles.content()}>
          <div className="relative">
            {/* Icon Circle */}
            <div className={styles.iconCircle()}>
              <div className={styles.icon()}>{icon}</div>
            </div>

            <h4 className={styles.title()}>{item.label}</h4>
          </div>
        </div>

        {/* Shimmer Effect */}
        <div className={styles.shimmer()} />
      </NextLink>
    );
  }
);

WebNavbarMegaMenuCategoryCard.displayName = "WebNavbarMegaMenuCategoryCard";
