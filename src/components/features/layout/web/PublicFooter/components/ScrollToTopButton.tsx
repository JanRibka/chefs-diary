import { FaArrowUp } from "react-icons/fa";

import { Button } from "@heroui/react";

import { useScrollState } from "../hooks/useScrollState";

/**
 * ScrollToTopButton - Scroll to top button component
 * Conditionally renders based on scroll position using local scroll state
 */
export const ScrollToTopButton = () => {
  const { showScrollTop, scrollToTop } = useScrollState();

  if (!showScrollTop) return null;

  return (
    <Button
      isIconOnly
      onPress={scrollToTop}
      className="group fixed bottom-8 right-8 z-50 bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-2xl hover:shadow-3xl hover:from-orange-600 hover:to-red-600 hover:scale-110 opacity-80 hover:opacity-100 transition-all duration-300 w-14 h-14 rounded-full border border-orange-400/20 hover:border-orange-400/40"
      aria-label="Scroll to top"
    >
      <FaArrowUp className="w-5 h-5 transition-transform duration-300 group-hover:scale-110" />
    </Button>
  );
};
