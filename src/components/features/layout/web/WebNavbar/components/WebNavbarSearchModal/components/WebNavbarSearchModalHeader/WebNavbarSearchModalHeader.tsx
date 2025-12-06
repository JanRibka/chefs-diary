import { memo } from "react";
import { searchModalHeaderStyles } from "./styles/searchModalHeaderStyles";

/**
 * WebNavbarSearchModalHeader
 * Displays the title and subtitle of the search modal
 */
export const WebNavbarSearchModalHeader = memo(() => {
  const styles = searchModalHeaderStyles();

  return (
    <div className={styles.header()}>
      <h3 className={styles.title()}>Hledat recepty</h3>
      <p className={styles.subtitle()}>Objevte tisíce skvělých receptů</p>
    </div>
  );
});

WebNavbarSearchModalHeader.displayName = "WebNavbarSearchModalHeader";
