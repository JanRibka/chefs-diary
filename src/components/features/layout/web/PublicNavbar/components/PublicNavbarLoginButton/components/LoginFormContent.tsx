"use client";

import { memo } from 'react';

import LogIn from '@/components/features/web/auth/logIn/LogIn';

/**
 * LoginFormContent - Login form popover orchestrator with beautiful animated background
 *
 * Features:
 * - Animated gradient background that shifts colors
 * - Floating accent elements with pulse and bounce animations
 * - Glass morphism overlay with backdrop blur
 * - Subtle animated border gradient
 * - Smooth entrance animations
 *
 * Note: Currently uses LogIn component's internal state management instead of props.
 * TODO: Integrate navbar login state with LogIn component state management.
 */
export const LoginFormContent = memo(() => {
  return (
    <div className="relative overflow-hidden rounded-xl animate-in fade-in-0 zoom-in-95 duration-300">
      {/* Animated gradient background with color shifting */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-orange-50/60 to-red-50/50 dark:from-slate-900 dark:via-orange-950/50 dark:to-red-950/40 animate-gradient-x" />

      {/* Glass morphism overlay with enhanced blur */}
      <div className="relative backdrop-blur-md bg-white/85 dark:bg-slate-900/85 border border-white/40 dark:border-slate-700/60 shadow-lg">
        {/* Animated gradient border */}
        <div className="absolute inset-0 bg-gradient-to-r from-orange-400/20 via-red-400/20 to-pink-400/20 rounded-xl animate-gradient-xy opacity-60" />

        {/* Floating accent elements - moved inside overlay so they're visible */}
        <div className="absolute top-3 right-3 w-2 h-2 bg-gradient-to-br from-orange-400 to-red-400 rounded-full opacity-30 animate-bounce" />
        <div className="absolute bottom-5 left-5 w-3 h-3 bg-gradient-to-tr from-pink-400 to-purple-400 rounded-full opacity-25 animate-pulse" />
        <div className="absolute top-1/2 left-2 w-1.5 h-1.5 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full opacity-20 animate-ping" />
        <div className="absolute bottom-2 right-1/3 w-2 h-2 bg-gradient-to-l from-blue-400 to-cyan-400 rounded-full opacity-30 animate-pulse" />

        <div className="relative p-6">
          <LogIn />
        </div>
      </div>
    </div>
  );
});

LoginFormContent.displayName = "LoginFormContent";
