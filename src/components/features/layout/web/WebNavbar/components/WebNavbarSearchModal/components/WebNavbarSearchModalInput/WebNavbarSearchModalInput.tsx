import { memo } from "react";
import { Input } from "@heroui/react";
import { IoSearch } from "react-icons/io5";
import { searchModalInputStyles } from "./styles/searchModalInputStyles";

/**
 * WebNavbarSearchModalInput
 * Search input field with icon and custom styling
 */
export const WebNavbarSearchModalInput = memo(() => {
  const styles = searchModalInputStyles();

  return (
    <Input
      placeholder="Hledat recept, surovinu nebo kuchaře..."
      startContent={<IoSearch className={styles.searchIcon()} />}
      size="lg"
      classNames={{
        input: styles.inputInput(),
        inputWrapper: styles.inputWrapper(),
      }}
      autoFocus
    />
  );
});

WebNavbarSearchModalInput.displayName = "WebNavbarSearchModalInput";
