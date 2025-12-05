import { memo } from "react";
import { WebNavbarMegaMenuCategoryCard } from "./WebNavbarMegaMenuCategoryCard/WebNavbarMegaMenuCategoryCard";

interface NavItem {
  key: string;
  label: string;
  href: string;
}

interface WebNavbarMegaMenuGridProps {
  items: NavItem[];
  onClose: () => void;
}

/**
 * WebNavbarMegaMenuGrid - Grid wrapper for category cards
 * Renders the grid layout and maps items to category cards
 *
 * @example
 * <WebNavbarMegaMenuGrid items={navItems} onClose={handleClose} />
 */
export const WebNavbarMegaMenuGrid = memo(
  ({ items, onClose }: WebNavbarMegaMenuGridProps) => {
    return (
      <div className="p-6 max-h-[70vh] overflow-y-auto bg-slate-50/30 dark:bg-slate-800/30">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
          {items.map((item, index) => (
            <WebNavbarMegaMenuCategoryCard
              key={item.key}
              item={item}
              index={index}
              onClose={onClose}
            />
          ))}
        </div>
      </div>
    );
  }
);

WebNavbarMegaMenuGrid.displayName = "WebNavbarMegaMenuGrid";
