import NextLink from "next/link";
import { FaHeart } from "react-icons/fa";
import { IoRestaurant, IoTime, IoTrendingUp } from "react-icons/io5";

import { quickLinksData } from "../constants/config";

/**
 * QuickLinks - Quick navigation links component
 * Renders navigation links with icons for footer
 */
export const QuickLinks = () => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case "IoRestaurant":
        return <IoRestaurant className="w-4 h-4" />;
      case "IoTrendingUp":
        return <IoTrendingUp className="w-4 h-4" />;
      case "IoTime":
        return <IoTime className="w-4 h-4" />;
      case "FaHeart":
        return <FaHeart className="w-4 h-4" />;
      default:
        return <IoRestaurant className="w-4 h-4" />;
    }
  };

  return (
    <div className="text-center md:text-left">
      <h3 className="font-bold text-slate-900 dark:text-slate-100 text-lg mb-6 flex items-center justify-center md:justify-start gap-2">
        <IoRestaurant className="w-5 h-5 text-orange-500" />
        Rychlé odkazy
      </h3>
      <ul className="space-y-4 text-center md:text-left">
        {quickLinksData.map((link) => (
          <li key={link.href}>
            <NextLink
              href={link.href}
              className="group flex items-center justify-center md:justify-start gap-3 text-slate-600 dark:text-slate-400 hover:text-orange-600 dark:hover:text-orange-400 transition-all duration-200"
            >
              <span className="group-hover:text-orange-500 transition-colors">
                {getIcon(link.iconName)}
              </span>
              {link.label}
            </NextLink>
          </li>
        ))}
      </ul>
    </div>
  );
};
