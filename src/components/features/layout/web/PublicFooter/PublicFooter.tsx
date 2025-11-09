"use client";

import { Divider } from "@heroui/react";

import { BottomSection } from "./components/BottomSection";
import { FooterContent } from "./components/FooterContent";
import { NewsletterSection } from "./components/NewsletterSection";

/**
 * PublicFooter - Main footer component using Pure Orchestration Pattern
 * Pure orchestrator that coordinates scroll state and renders footer sections
 */
export default function PublicFooter() {
  return (
    <footer className="relative overflow-hidden">
      {/* Background with gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-orange-50/30 to-red-50/20 dark:from-slate-950 dark:via-orange-950/20 dark:to-red-950/10" />

      {/* Floating shapes */}
      <div className="absolute -top-16 -right-16 w-32 h-32 bg-gradient-to-br from-orange-200/20 to-red-200/20 dark:from-orange-900/10 dark:to-red-900/10 rounded-full blur-2xl" />
      <div className="absolute -bottom-16 -left-16 w-40 h-40 bg-gradient-to-tr from-pink-200/20 to-purple-200/20 dark:from-pink-900/10 dark:to-purple-900/10 rounded-full blur-2xl" />

      <div className="relative z-10">
        {/* Newsletter Section */}
        <NewsletterSection />

        {/* Main Footer Content */}
        <FooterContent />

        <Divider className="bg-gradient-to-r from-transparent via-orange-200 to-transparent dark:via-orange-800" />

        {/* Bottom Section */}
        <BottomSection />
      </div>
    </footer>
  );
}
