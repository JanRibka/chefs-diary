import webRoutes from "@/lib/routes/webRoutes";

import type { NavItem } from "../types/NavItem";

/**
 * Navigation items configuration - shared between desktop and mobile
 * Contains all properties needed by both variants
 */
export const NAV_ITEMS: NavItem[] = [
  {
    href: webRoutes.Home,
    label: "Domů",
    icon: "🏠",
    description: "Hlavní stránka",
    color: "from-blue-500 to-cyan-500",
  },
  {
    href: "/recipes",
    label: "Recepty",
    icon: "👨‍🍳",
    description: "Tisíce receptů",
    color: "from-orange-500 to-red-500",
  },
  {
    href: "/categories",
    label: "Kategorie",
    icon: "📂",
    description: "Procházet podle typu",
    color: "from-purple-500 to-pink-500",
  },
  {
    href: "/about",
    label: "O nás",
    icon: "✨",
    description: "Naše příběh",
    color: "from-green-500 to-emerald-500",
  },
];
