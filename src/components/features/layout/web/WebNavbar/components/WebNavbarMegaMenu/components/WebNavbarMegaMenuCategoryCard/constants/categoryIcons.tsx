import { IoCafeOutline } from "react-icons/io5";
import {
  FaBirthdayCake,
  FaCarrot,
  FaCocktail,
  FaCookie,
  FaDrumstickBite,
  FaFire,
  FaLeaf,
  FaSeedling,
  FaUtensilSpoon,
} from "react-icons/fa";
import { GiMushroomGills, GiPieSlice } from "react-icons/gi";

/**
 * Icon mappings for each category
 * Maps category keys to their corresponding React icon components
 */
export const CATEGORY_ICONS: Record<string, React.ReactNode> = {
  meatless: <FaCarrot className="w-6 h-6" />,
  sweets: <FaCookie className="w-6 h-6" />,
  diet: <FaLeaf className="w-6 h-6" />,
  cakes: <FaBirthdayCake className="w-6 h-6" />,
  grill: <FaFire className="w-6 h-6" />,
  mushrooms: <GiMushroomGills className="w-6 h-6" />,
  legumes: <FaSeedling className="w-6 h-6" />,
  meat: <FaDrumstickBite className="w-6 h-6" />,
  desserts: <GiPieSlice className="w-6 h-6" />,
  drinks: <FaCocktail className="w-6 h-6" />,
  soups: <FaUtensilSpoon className="w-6 h-6" />,
  salads: <FaLeaf className="w-6 h-6" />,
};

/**
 * Default icon for categories without a specific icon
 */
export const DEFAULT_CATEGORY_ICON = <IoCafeOutline className="w-6 h-6" />;
