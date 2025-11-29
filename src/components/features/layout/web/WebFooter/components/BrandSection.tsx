import NextLink from 'next/link';
import { HiLocationMarker, HiMail, HiPhone } from 'react-icons/hi';

import Logo from '@/components/shared/logo/Logo';

import { SocialLinks } from './SocialLinks';

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
        <NextLink
          href="mailto:kucharuv.denik@gmail.com"
          className="flex items-center gap-3 text-slate-600 dark:text-slate-400 hover:text-primary dark:hover:text-primary-light transition-colors duration-200 group"
        >
          <HiMail className="w-5 h-5 text-primary group-hover:scale-110 transition-transform duration-200" />
          <span>kucharuv.denik@gmail.com</span>
        </NextLink>
        <NextLink
          href="tel:+420777811790"
          className="flex items-center gap-3 text-slate-600 dark:text-slate-400 hover:text-primary dark:hover:text-primary-light transition-colors duration-200 group"
        >
          <HiPhone className="w-5 h-5 text-primary group-hover:scale-110 transition-transform duration-200" />
          <span>+420 777 811 790</span>
        </NextLink>
        <NextLink
          href="https://maps.google.com/?q=Opava, Česká republika"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3 text-slate-600 dark:text-slate-400 hover:text-primary dark:hover:text-primary-light transition-colors duration-200 group"
        >
          <HiLocationMarker className="w-5 h-5 text-primary group-hover:scale-110 transition-transform duration-200" />
          <span>Opava, Česká republika</span>
        </NextLink>
      </div>

      {/* Social Links */}
      <div className="pt-2">
        <SocialLinks />
      </div>
    </div>
  );
};
