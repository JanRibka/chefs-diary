import NextLink from "next/link";
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
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Categories Grid (Left Side) */}
          <div className="lg:col-span-9 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {items.map((item, index) => (
              <WebNavbarMegaMenuCategoryCard
                key={item.key}
                item={item}
                index={index}
                onClose={onClose}
              />
            ))}
          </div>

          {/* Featured Section (Right Side) */}
          <div className="hidden lg:block lg:col-span-3">
            <NextLink
              href="/recepty"
              onClick={onClose}
              className="block h-full"
            >
              <div className="h-full rounded-2xl overflow-hidden relative group cursor-pointer">
                {/* Background Image/Gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/80 to-secondary/80 mix-blend-multiply z-10" />
                <img
                  src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=2070&auto=format&fit=crop"
                  alt="Featured Recipe"
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />

                {/* Content */}
                <div className="relative z-20 h-full flex flex-col justify-end p-6 text-white">
                  <span className="inline-block px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-xs font-medium mb-3 border border-white/30">
                    Tip šéfkuchaře
                  </span>
                  <h3 className="text-xl font-bold mb-2">Sezónní speciality</h3>
                  <p className="text-sm text-white/90 mb-4">
                    Objevte nejlepší recepty pro toto roční období.
                  </p>
                  <span className="text-sm font-medium underline decoration-2 underline-offset-4 hover:text-white/80 transition-colors">
                    Prohlédnout kolekci
                  </span>
                </div>
              </div>
            </NextLink>
          </div>
        </div>
      </div>
    );
  }
);

WebNavbarMegaMenuGrid.displayName = "WebNavbarMegaMenuGrid";
