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
      //TODO: DO href doplnit odkazy z webRoutes
      {
        key: "meatless",
        label: "Bezmasá jídla",
        href: "/recepty/bezmasa-jidla",
      },
      {
        key: "sweets",
        label: "Cukroví",
        href: "/recepty/cukrovi",
      },
      {
        key: "diet",
        label: "Dietní recepty",
        href: "/recepty/dietni-recepty",
      },
      {
        key: "cakes",
        label: "Dorty",
        href: "/recepty/dorty",
      },
      {
        key: "grill",
        label: "Grilování",
        href: "/recepty/grilovani",
      },
      {
        key: "mushrooms",
        label: "Houby",
        href: "/recepty/houby",
      },
      {
        key: "legumes",
        label: "Luštěniny",
        href: "/recepty/lusteniny",
      },
      {
        key: "meat",
        label: "Maso",
        href: "/recepty/maso",
      },
      {
        key: "desserts",
        label: "Moučníky",
        href: "/recepty/moucniky",
      },
      {
        key: "drinks",
        label: "Nápoje",
        href: "/recepty/napoje",
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
