import { tv } from "tailwind-variants";
import { navbarSharedConfig } from "./sharedNavbarStyles";

/**
 * navbarStyles - Navbar styling with tailwind-variants
 * Uses variants for dynamic styles based on scroll state
 */
export const navbarStyles = tv({
  slots: {
    nav: "fixed top-0 left-0 right-0 z-50 flex justify-center pt-6 px-4 pointer-events-none",
    container: `pointer-events-auto flex items-center justify-between transition-all duration-500 ease-out rounded-full border ${navbarSharedConfig.borderColor} ${navbarSharedConfig.glass} shadow-lg shadow-black/5`,
  },
  variants: {
    scrolled: {
      true: {
        container: `w-[90%] md:w-[80%] lg:w-[70%] h-14 lg:h-16 ${navbarSharedConfig.glass} px-6`,
      },
      false: {
        container: `w-[95%] md:w-[90%] lg:w-[85%] h-16 lg:h-20 ${navbarSharedConfig.glass} px-8`,
      },
    },
  },
  defaultVariants: {
    scrolled: false,
  },
});
