import { BrandSection } from "./BrandSection";
import { Categories } from "./Categories";
import { LegalLinks } from "./LegalLinks";
import { QuickLinks } from "./QuickLinks";

/**
 * FooterContent - Main footer content component
 * Contains all footer sections and layout
 */
export const FooterContent = () => {
  return (
    <div className="max-w-main mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
        {/* Brand Section with Social Links - takes 5/12 width on large screens */}
        <div className="lg:col-span-5">
          <BrandSection />
        </div>

        {/* Quick Links - takes 3/12 width */}
        <div className="lg:col-span-3">
          <QuickLinks />
        </div>

        {/* Categories - takes 2/12 width */}
        <div className="lg:col-span-2">
          <Categories />
        </div>

        {/* Legal - takes 2/12 width */}
        <div className="lg:col-span-2">
          <LegalLinks />
        </div>
      </div>
    </div>
  );
};
