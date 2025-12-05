import { memo } from "react";

interface WebNavbarMegaMenuBackdropProps {
  onClose: () => void;
}

/**
 * WebNavbarMegaMenuBackdrop - Backdrop overlay with blur effect
 * Handles click to close the mega menu
 *
 * @example
 * <WebNavbarMegaMenuBackdrop onClose={handleClose} />
 */
export const WebNavbarMegaMenuBackdrop = memo(
  ({ onClose }: WebNavbarMegaMenuBackdropProps) => {
    return (
      <div
        className="fixed inset-x-0 top-[72px] bottom-0 bg-black/20 backdrop-blur-sm z-40"
        onClick={onClose}
      />
    );
  }
);

WebNavbarMegaMenuBackdrop.displayName = "WebNavbarMegaMenuBackdrop";
