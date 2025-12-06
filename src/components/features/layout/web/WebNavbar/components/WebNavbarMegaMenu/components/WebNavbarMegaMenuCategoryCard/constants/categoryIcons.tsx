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
  meatless: <FaCarrot />,
  sweets: <FaCookie />,
  diet: <FaLeaf />,
  cakes: <FaBirthdayCake />,
  grill: <FaFire />,
  mushrooms: <GiMushroomGills />,
  legumes: <FaSeedling />,
  meat: <FaDrumstickBite />,
  desserts: <GiPieSlice />,
  drinks: <FaCocktail />,
  soups: <FaUtensilSpoon />,
  salads: <FaLeaf />,
};

/**
 * Default icon for categories without a specific icon
 */
export const DEFAULT_CATEGORY_ICON = <IoCafeOutline />;
