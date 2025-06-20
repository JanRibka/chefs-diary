// Modal
export const MODAL_CONFIG = {
  placement: "center" as const,
  headerLabel: "Smazat jednotku",
  hideFooter: true,
  isDismissable: false,
} as const;

export const TOAST_MESSAGES = {
  deleteSuccess: {
    title: "Úspěch",
    message: "Skupina jednotek byla úspěšně smazána",
    type: "success" as const,
  },
  genericError: {
    title: "Chyba",
    type: "danger" as const,
  },
} as const;

// Modal content
export const FORM_CONFIG = {
  className: "flex flex-col gap-5",
  noValidate: true,
} as const;

export const ACTIONS_CONFIG = {
  className: "flex py-2 px-1 justify-between",
} as const;

export const BUTTON_CONFIG = {
  cancel: {
    color: "success" as const,
    variant: "flat" as const,
    text: "Zrušit",
  },
  delete: {
    color: "danger" as const,
    text: "Smazat",
  },
} as const;

export const TEXT_CONTENT = {
  confirmationText: (unitName: string) => (
    <>
      Opravdu chcete smazat jednotku <strong>{unitName}</strong>?
    </>
  ),
} as const;
