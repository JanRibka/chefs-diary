import {
  IoSunnyOutline,
  IoRestaurantOutline,
  IoMoonOutline,
  IoCafeOutline,
  IoLeafOutline,
  IoNutritionOutline,
  IoWineOutline,
  IoPizzaOutline,
} from "react-icons/io5";
import {
  GiBowlOfRice,
  GiCupcake,
  GiChiliPepper,
  GiBreadSlice,
} from "react-icons/gi";

/**
 * Icon mappings for each category
 * Maps category keys to their corresponding React icon components
 */
export const CATEGORY_ICONS: Record<string, React.ReactNode> = {
  breakfast: <IoSunnyOutline className="w-6 h-6" />,
  lunch: <IoRestaurantOutline className="w-6 h-6" />,
  dinner: <IoMoonOutline className="w-6 h-6" />,
  desserts: <GiCupcake className="w-6 h-6" />,
  soups: <GiBowlOfRice className="w-6 h-6" />,
  salads: <IoLeafOutline className="w-6 h-6" />,
  appetizers: <IoPizzaOutline className="w-6 h-6" />,
  baking: <GiBreadSlice className="w-6 h-6" />,
  drinks: <IoWineOutline className="w-6 h-6" />,
  vegetarian: <IoNutritionOutline className="w-6 h-6" />,
  vegan: <IoLeafOutline className="w-6 h-6" />,
  glutenfree: <GiChiliPepper className="w-6 h-6" />,
};

/**
 * Default icon for categories without a specific icon
 */
export const DEFAULT_CATEGORY_ICON = <IoCafeOutline className="w-6 h-6" />;
