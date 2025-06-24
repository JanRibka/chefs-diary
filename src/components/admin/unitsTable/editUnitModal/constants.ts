// Modal
export const MODAL_CONFIG = {
  PLACEMENT: "center" as const,
  IS_DISMISSABLE: false,
  HIDE_FOOTER: true,
} as const;

export const EDIT_UNIT_MODAL_TEXTS = {
  HEADER_LABEL: "Upravit jednotku",
  UNIT_NAME_LABEL: "Název jednotky",
  CANCEL_BUTTON: "Zrušit",
  SAVE_BUTTON: "Uložit",
  SUCCESS_TITLE: "Úspěch",
  SUCCESS_MESSAGE: "Jednotka byla úspěšně upravena",
  ERROR_TITLE: "Chyba",
  UNEXPECTED_ERROR: "Došlo k neočekávané chybě",
} as const;

// Modal content
export const INPUT_CONFIG = {
  VARIANT: "faded" as const,
  COLOR: "primary" as const,
  AUTO_COMPLETE: "off",
  FULL_WIDTH: true,
  REQUIRED: true,
} as const;
