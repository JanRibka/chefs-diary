"use client";

import { memo } from "react";

import LayoutLoginContent from "./content/LayoutLoginContent";
import LayoutLoginInfo from "./info/LayoutLoginInfo";

type Props = {
  children: React.ReactNode;
  header: string;
  description: string;
};

/**
 * AuthLayout - Modern authentication layout with animated background
 * Features glass morphism effects, floating elements, and smooth animations
 */
const AuthLayout = memo(({ children, header, description }: Props) => {
  return (
    <main className="min-h-screen relative overflow-hidden">
      {/* Animated background with gradients */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-orange-50/30 to-red-50/20 dark:from-slate-950 dark:via-orange-950/20 dark:to-red-950/10" />

      {/* Floating shapes */}
      <div className="absolute -top-16 -right-16 w-32 h-32 bg-gradient-to-br from-orange-200/20 to-red-200/20 dark:from-orange-900/10 dark:to-red-900/10 rounded-full blur-2xl animate-pulse" />
      <div className="absolute -bottom-16 -left-16 w-40 h-40 bg-gradient-to-tr from-pink-200/20 to-purple-200/20 dark:from-pink-900/10 dark:to-purple-900/10 rounded-full blur-2xl animate-pulse" />

      {/* Main content */}
      <div className="relative z-10 flex items-center justify-center min-h-screen px-4 py-8">
        <div className="w-full max-w-6xl">
          {/* Glass morphism card */}
          <div className="relative backdrop-blur-xl bg-white/70 dark:bg-slate-900/70 border border-white/20 dark:border-slate-800/50 rounded-3xl shadow-2xl overflow-hidden">
            {/* Animated border gradient */}
            <div className="absolute inset-0 bg-gradient-to-r from-orange-500/20 via-red-500/20 to-pink-500/20 rounded-3xl opacity-50" />

            <div className="relative flex flex-col lg:h-auth lg:flex-row">
              <LayoutLoginInfo header={header} description={description} />
              <LayoutLoginContent>{children}</LayoutLoginContent>
            </div>
          </div>
        </div>
      </div>

      {/* Additional floating elements */}
      <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-gradient-to-br from-blue-400 to-cyan-400 rounded-full opacity-30 animate-bounce" />
      <div className="absolute top-3/4 right-1/4 w-3 h-3 bg-gradient-to-br from-yellow-400 to-orange-400 rounded-full opacity-25 animate-bounce" />
      <div className="absolute top-1/2 left-1/2 w-1.5 h-1.5 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full opacity-20 animate-bounce" />
    </main>
  );
});

AuthLayout.displayName = "AuthLayout";

export default AuthLayout;
