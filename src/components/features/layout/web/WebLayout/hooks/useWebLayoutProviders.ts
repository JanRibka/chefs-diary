/**
 * useWebLayoutProviders - Hook for managing WebLayout providers
 * Handles SessionProvider and HeroUI providers setup
 *
 * @returns Object with provider components
 */
export const useWebLayoutProviders = () => {
  // Provider configuration - could be extended for theme management
  const themeProps = {
    attribute: "class" as const,
    defaultTheme: "light" as const,
  };

  return {
    themeProps,
  };
};
