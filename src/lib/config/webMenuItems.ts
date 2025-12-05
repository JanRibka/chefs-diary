import webRoutes from "@/lib/routes/webRoutes";
import WebMenuItemType from "@/lib/types/web/WebMenuItemType";

/**
 * Web navigation menu items configuration
 * Following admin pattern for consistency and maintainability
 */
const webMenuItems: WebMenuItemType[] = [
  {
    key: "home",
    label: "Domů",
    href: webRoutes.Home,
  },
  {
    key: "about",
    label: "O mě",
    href: webRoutes.About,
  },
  {
    key: "recipes",
    label: "Recepty",
    href: webRoutes.Recipes,
    megaMenu: true,
    subitems: [
      // Placeholder categories - to be replaced with DB data
      {
        key: "breakfast",
        label: "Snídaně",
        href: "/recepty/snidane",
      },
      {
        key: "lunch",
        label: "Oběd",
        href: "/recepty/obed",
      },
      {
        key: "dinner",
        label: "Večeře",
        href: "/recepty/vecere",
      },
      {
        key: "desserts",
        label: "Dezerty",
        href: "/recepty/dezerty",
      },
      {
        key: "soups",
        label: "Polévky",
        href: "/recepty/polevky",
      },
      {
        key: "salads",
        label: "Saláty",
        href: "/recepty/salaty",
      },
      {
        key: "appetizers",
        label: "Předkrmy",
        href: "/recepty/predkrmy",
      },
      {
        key: "baking",
        label: "Pečení",
        href: "/recepty/peceni",
      },
      {
        key: "drinks",
        label: "Nápoje",
        href: "/recepty/napoje",
      },
      {
        key: "vegetarian",
        label: "Vegetariánské",
        href: "/recepty/vegetarianske",
      },
      {
        key: "vegan",
        label: "Veganské",
        href: "/recepty/veganske",
      },
      {
        key: "glutenfree",
        label: "Bezlepkové",
        href: "/recepty/bezlepkove",
      },
    ],
  },
  {
    key: "contact",
    label: "Kontakt",
    href: webRoutes.Contact,
  },
  {
    key: "dictionary",
    label: "Slovník",
    href: webRoutes.Dictionary,
  },
  {
    key: "food-substitutes",
    label: "Náhrady potravin",
    href: webRoutes.FoodSubstitutes,
  },
];

export default webMenuItems;
