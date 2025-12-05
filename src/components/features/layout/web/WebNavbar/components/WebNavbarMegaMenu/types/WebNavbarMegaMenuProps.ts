import WebMenuItemType from "@/lib/types/web/WebMenuItemType";

export type WebNavbarMegaMenuProps = {
  items: WebMenuItemType[];
  isOpen: boolean;
  onClose: () => void;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
};
