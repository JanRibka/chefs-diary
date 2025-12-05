import webRoutes from "@/lib/routes/webRoutes";
import NextLink from "next/link";
import { memo } from "react";
import { footerVariants } from "./styles/footerVariants";

interface WebNavbarMegaMenuFooterProps {
  onClose: () => void;
}

/**
 * WebNavbarMegaMenuFooter - Footer section with "view all" link
 * Displays a link to view all recipes with animated arrow
 *
 * @example
 * <WebNavbarMegaMenuFooter onClose={handleClose} />
 */
export const WebNavbarMegaMenuFooter = memo(
  ({ onClose }: WebNavbarMegaMenuFooterProps) => {
    const styles = footerVariants();

    return (
      <div className={styles.container()}>
        <NextLink
          href={webRoutes.Recipes}
          onClick={onClose}
          className={styles.link()}
        >
          <span>Zobrazit všechny recepty</span>
          <svg
            className={styles.arrow()}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M13 7l5 5m0 0l-5 5m5-5H6"
            />
          </svg>
        </NextLink>
      </div>
    );
  }
);

WebNavbarMegaMenuFooter.displayName = "WebNavbarMegaMenuFooter";
