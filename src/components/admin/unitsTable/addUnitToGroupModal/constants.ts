import { UnitGroupModalState } from "./types";

// Modal
export const MODAL_CONFIG = {
  placement: "center" as const,
  headerLabel: "Přiřadit jednotku do skupiny",
  hideFooter: true,
  isDismissable: false,
} as const;

export const TOAST_MESSAGES = {
  addSuccess: {
    title: "Úspěch",
    message: "Jednotka byla úspěšně přiřazena do skupiny",
    type: "success" as const,
  },
  removeSuccess: {
    title: "Úspěch",
    message: "Jednotka byla úspěšně odebrána ze skupiny",
    type: "success" as const,
  },
  genericError: {
    title: "Chyba",
    type: "danger" as const,
  },
} as const;

// Modal content
export const CONFIRMATION_MESSAGES = {
  SET_BASE_UNIT:
    "Zaškrtnutím této volby změníte základní jednotku ve skupině. Pokračovat?",
  UNSET_BASE_UNIT:
    "Odškrtnutím této volby zrušíte základní jednotku ve skupině. Pokračovat?",
  REMOVE_BASE_UNIT:
    "Chystáte se odebrat jednotku ze skupiny, která je nastavená jako základní jednotka. Pokračovat?",
  REMOVE_UNIT: "Chcete opravdu odebrat jednotku ze skupiny? Pokračovat?",
} as const;

export const INITIAL_STATE: UnitGroupModalState = {
  selectedGroupIds: [],
  isBaseUnit: false,
  isInitialized: false,
  confirmationModal: {
    isOpen: false,
    message: "",
    onConfirm: () => {},
  },
  isRemoving: false,
};

export const SPINNER_CLASSES = {
  circle1: "w-16 h-16",
  circle2: "w-16 h-16",
  wrapper: "w-16 h-16",
} as const;
