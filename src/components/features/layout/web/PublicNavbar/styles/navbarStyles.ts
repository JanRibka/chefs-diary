import { tv } from 'tailwind-variants';

/**
 * navbarStyles - Navbar styling with tailwind-variants
 * Uses variants for dynamic styles based on scroll state
 */
export const navbarStyles = tv({
  slots: {
    nav: "fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-out border-b",
    container:
      "flex items-center justify-between transition-all duration-500 ease-out",
  },
  variants: {
    scrolled: {
      true: {
        nav: "backdrop-blur-2xl bg-background/95 shadow-2xl shadow-black/10 border-border/60 h-16 lg:h-20",
        container: "h-16 lg:h-20",
      },
      false: {
        nav: "backdrop-blur-md bg-background/80 shadow-lg shadow-black/5 border-border/30 h-20 lg:h-24",
        container: "h-20 lg:h-24",
      },
    },
  },
  defaultVariants: {
    scrolled: false,
  },
});
