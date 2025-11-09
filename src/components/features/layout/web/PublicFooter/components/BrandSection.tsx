import { HiLocationMarker, HiMail, HiPhone } from "react-icons/hi";

import Logo from "@/components/shared/Logo";

import { SocialLinks } from "./SocialLinks";

/**
 * BrandSection - Brand and contact information section
 * Contains logo, description, contact details, and social links
 */
export const BrandSection = () => {
  return (
    <div className="space-y-6 text-center md:text-left">
      <Logo
        size="lg"
        disableHover={true}
        className="justify-center md:justify-start"
      />

      <p className="text-slate-600 dark:text-slate-400 text-lg leading-relaxed max-w-md">
        Vaše kulinářská cesta začíná zde. Objevujte recepty od profesionálních
        kuchařů, sdílejte své kuchařské umění a spojte se s rostoucí komunitou
        food nadšenců.
      </p>

      {/* Contact Info */}
      <div className="space-y-3">
        <div className="flex items-center gap-3 text-slate-600 dark:text-slate-400">
          <HiMail className="w-5 h-5 text-orange-500" />
          <span>kucharuv.denik@gmail.com</span>
        </div>
        <div className="flex items-center gap-3 text-slate-600 dark:text-slate-400">
          <HiPhone className="w-5 h-5 text-orange-500" />
          <span>+420 777 811 790</span>
        </div>
        <div className="flex items-center gap-3 text-slate-600 dark:text-slate-400">
          <HiLocationMarker className="w-5 h-5 text-orange-500" />
          <span>Opava, Česká republika</span>
        </div>
      </div>

      {/* Social Links */}
      <div className="pt-2">
        <SocialLinks />
      </div>
    </div>
  );
};
