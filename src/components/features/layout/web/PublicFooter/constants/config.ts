import type { Category } from "../types/Category";

/**
 * Quick navigation links data for footer
 */
export const quickLinksData = [
  {
    href: "/recipes",
    label: "Všechny recepty",
    iconName: "IoRestaurant" as const,
  },
  {
    href: "/categories/trending",
    label: "Trendy",
    iconName: "IoTrendingUp" as const,
  },
  {
    href: "/categories/quick",
    label: "Rychlé recepty",
    iconName: "IoTime" as const,
  },
  {
    href: "/categories/healthy",
    label: "Zdravé recepty",
    iconName: "FaHeart" as const,
  },
];

/**
 * Recipe categories for footer
 */
export const categories: Category[] = [
  { href: "/categories/breakfast", label: "Snídaně" },
  { href: "/categories/lunch", label: "Obědy" },
  { href: "/categories/dinner", label: "Večeře" },
  { href: "/categories/desserts", label: "Dezerty" },
  { href: "/categories/drinks", label: "Nápoje" },
  { href: "/categories/vegetarian", label: "Vegetariánské" },
];

/**
 * Social media links data for footer
 */
export const socialLinksData = [
  {
    href: "#",
    iconName: "FaFacebook" as const,
    label: "Facebook",
    color: "hover:text-blue-500",
  },
  {
    href: "#",
    iconName: "FaInstagram" as const,
    label: "Instagram",
    color: "hover:text-pink-500",
  },
  {
    href: "#",
    iconName: "FaTwitter" as const,
    label: "Twitter",
    color: "hover:text-blue-400",
  },
  {
    href: "#",
    iconName: "FaYoutube" as const,
    label: "YouTube",
    color: "hover:text-red-500",
  },
  {
    href: "#",
    iconName: "FaTiktok" as const,
    label: "TikTok",
    color: "hover:text-black dark:hover:text-white",
  },
];