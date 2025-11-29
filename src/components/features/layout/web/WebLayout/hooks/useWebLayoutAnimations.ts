/**
 * useWebLayoutAnimations - Hook for managing WebLayout animations
 * Provides animation configurations and delays for floating elements
 *
 * @returns Object with animation configurations
 */
export const useWebLayoutAnimations = () => {
  return {
    // Floating accent elements configuration
    floatingElements: {
      first: {
        delay: 1,
        duration: "4s",
      },
      second: {
        delay: 2,
        duration: "5s",
      },
      third: {
        delay: 3,
        duration: "6s",
      },
      fourth: {
        delay: 4,
        duration: "7s",
      },
    },

    // Page transition overlay delay
    pageTransitionDelay: "0.5s",
  };
};
