import NextLink from "next/link";

/**
 * LegalLinks - Legal and policy links component
 * Renders legal navigation links for footer
 */
export const LegalLinks = () => {
  return (
    <div className="text-center md:text-left">
      <h3 className="font-bold text-slate-900 dark:text-slate-100 text-lg mb-6 whitespace-nowrap">
        Právní informace
      </h3>
      <ul className="space-y-4">
        <li>
          <NextLink
            href="/privacy"
            className="text-slate-600 dark:text-slate-400 hover:text-orange-600 dark:hover:text-orange-400 transition-colors duration-200 whitespace-nowrap"
          >
            Ochrana soukromí
          </NextLink>
        </li>
        <li>
          <NextLink
            href="/terms"
            className="text-slate-600 dark:text-slate-400 hover:text-orange-600 dark:hover:text-orange-400 transition-colors duration-200 whitespace-nowrap"
          >
            Podmínky použití
          </NextLink>
        </li>
        <li>
          <NextLink
            href="/cookies"
            className="text-slate-600 dark:text-slate-400 hover:text-orange-600 dark:hover:text-orange-400 transition-colors duration-200 whitespace-nowrap"
          >
            Cookies
          </NextLink>
        </li>
        <li>
          <NextLink
            href="/contact"
            className="text-slate-600 dark:text-slate-400 hover:text-orange-600 dark:hover:text-orange-400 transition-colors duration-200 whitespace-nowrap"
          >
            Kontakt
          </NextLink>
        </li>
      </ul>
    </div>
  );
};
