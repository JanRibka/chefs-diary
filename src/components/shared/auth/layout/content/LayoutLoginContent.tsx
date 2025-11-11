"use client";

import { memo, ReactNode } from "react";

type Props = {
  children?: ReactNode;
};

/**
 * LayoutLoginContent - Glass morphism form container with backdrop blur
 * Features floating animations and modern glass effect
 */
const LayoutLoginContent = memo(({ children }: Props) => {
  return (
    <section className="relative w-full lg:w-2/5 lg:min-h-auth flex items-center justify-center p-6 lg:p-8">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent" />

      {/* Floating accent elements */}
      <div className="absolute top-8 right-8 w-6 h-6 bg-orange-400/20 rounded-full animate-pulse" />
      <div className="absolute bottom-12 left-8 w-4 h-4 bg-pink-400/20 rounded-full animate-pulse delay-500" />

      {/* Glass morphism container */}
      <div className="relative w-full h-full max-w-md">
        <div className="backdrop-blur-xl h-full bg-white/10 dark:bg-black/10 border border-white/20 dark:border-white/10 rounded-2xl shadow-2xl p-8 transition-all duration-300 hover:bg-white/15 dark:hover:bg-black/15">
          {/* Inner glow effect */}
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/5 to-transparent pointer-events-none" />

          {/* Content */}
          <div className="relative z-10 h-full">{children}</div>
        </div>
      </div>
    </section>
  );
});

LayoutLoginContent.displayName = "LayoutLoginContent";

export default LayoutLoginContent;
