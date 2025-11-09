import NextLink from "next/link";

import { categories } from "../constants/config";

/**
 * Categories - Recipe categories component
 * Renders category links for footer navigation
 */
export const Categories = () => {
  return (
    <div className="text-center md:text-left">
      <h3 className="font-bold text-slate-900 dark:text-slate-100 text-lg mb-6">
        Kategorie
      </h3>
      <ul className="space-y-4">
        {categories.map((category) => (
          <li key={category.href}>
            <NextLink
              href={category.href}
              className="text-slate-600 dark:text-slate-400 hover:text-orange-600 dark:hover:text-orange-400 transition-colors duration-200 hover:translate-x-1 transform inline-block"
            >
              {category.label}
            </NextLink>
          </li>
        ))}
      </ul>
    </div>
  );
};
