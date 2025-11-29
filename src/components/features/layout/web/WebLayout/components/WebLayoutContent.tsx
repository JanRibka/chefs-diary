import { useWebLayoutAnimations } from "../hooks/useWebLayoutAnimations";

/**
 * WebLayoutContent - Main content wrapper with animations and floating elements
 *
 * @param children - Child components to be rendered within the content area
 */
interface WebLayoutContentProps {
  children: React.ReactNode;
}

export const WebLayoutContent = ({ children }: WebLayoutContentProps) => {
  const animations = useWebLayoutAnimations();

  return (
    <main className="flex-1 relative">
      {/* Content wrapper with enhanced animations */}
      <div className="animate-animate-in fade-in duration-1000 slide-in-from-bottom-6">
        <div className="relative">
          {children}

          {/* Subtle page transitions overlay */}
          <div className="absolute inset-0 pointer-events-none">
            <div
              className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary via-destructive to-primary opacity-0 animate-pulse"
              style={{ animationDelay: animations.pageTransitionDelay }}
            />
          </div>
        </div>
      </div>

      {/* Enhanced floating accent elements with better positioning */}
      <div
        className="absolute top-24 right-8 w-3 h-3 bg-gradient-to-br from-primary to-primary/60 rounded-full opacity-20 animate-bounce shadow-lg"
        style={{
          animationDelay: `${animations.floatingElements.first.delay}s`,
          animationDuration: animations.floatingElements.first.duration,
        }}
      />
      <div
        className="absolute top-48 right-20 w-2 h-2 bg-gradient-to-br from-secondary to-secondary/60 rounded-full opacity-25 animate-bounce shadow-md"
        style={{
          animationDelay: `${animations.floatingElements.second.delay}s`,
          animationDuration: animations.floatingElements.second.duration,
        }}
      />
      <div
        className="absolute top-72 right-6 w-2.5 h-2.5 bg-gradient-to-br from-primary/80 to-primary/40 rounded-full opacity-30 animate-bounce shadow-lg"
        style={{
          animationDelay: `${animations.floatingElements.third.delay}s`,
          animationDuration: animations.floatingElements.third.duration,
        }}
      />
      <div
        className="absolute top-96 right-14 w-1.5 h-1.5 bg-gradient-to-br from-accent to-accent/60 rounded-full opacity-20 animate-bounce shadow-sm"
        style={{
          animationDelay: `${animations.floatingElements.fourth.delay}s`,
          animationDuration: animations.floatingElements.fourth.duration,
        }}
      />
    </main>
  );
};
