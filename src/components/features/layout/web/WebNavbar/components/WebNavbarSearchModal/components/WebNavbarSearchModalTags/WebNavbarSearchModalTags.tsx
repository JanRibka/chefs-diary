import { memo, useMemo } from "react";
import { Button } from "@heroui/react";
import { searchModalTagsStyles } from "./styles/searchModalTagsStyles";
import { SEARCH_TAGS } from "../../constants/searchTags";

/**
 * WebNavbarSearchModalTags
 * Renders quick access search tags
 */
export const WebNavbarSearchModalTags = memo(() => {
  const styles = searchModalTagsStyles();

  // PERFORMANCE: Memoize tags mapping
  const searchTagButtons = useMemo(
    () =>
      SEARCH_TAGS.map((tag) => (
        <Button
          key={tag}
          size="sm"
          variant="flat"
          className={styles.tagButton()}
        >
          {tag}
        </Button>
      )),
    [styles]
  );

  return (
    <div className={styles.tagsSection()}>
      <h4 className={styles.tagsTitle()}>Rychlé odkazy</h4>
      <div className={styles.tagsContainer()}>{searchTagButtons}</div>
    </div>
  );
});

WebNavbarSearchModalTags.displayName = "WebNavbarSearchModalTags";
