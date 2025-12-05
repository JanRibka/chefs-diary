import { memo } from "react";
import { headerVariants } from "./styles/headerVariants";

/**
 * WebNavbarMegaMenuHeader - Header section with title and description
 * Displays the mega menu title with gradient styling
 *
 * @example
 * <WebNavbarMegaMenuHeader />
 */
export const WebNavbarMegaMenuHeader = memo(() => {
  const styles = headerVariants();

  return (
    <div className={styles.container()}>
      <h3 className={styles.title()}>Kategorie receptů</h3>
      <p className={styles.description()}>Objevte recepty podle vašeho gusta</p>
    </div>
  );
});

WebNavbarMegaMenuHeader.displayName = "WebNavbarMegaMenuHeader";
