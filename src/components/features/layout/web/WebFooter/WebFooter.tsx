"use client";

import { Divider } from "@heroui/react";

import { BottomSection } from "./components/BottomSection";
import { FooterContent } from "./components/FooterContent";
import { NewsletterSection } from "./components/NewsletterSection";

/**
 * WebFooter - Main footer component using Pure Orchestration Pattern
 * Pure orchestrator that coordinates scroll state and renders footer sections
 */
export default function WebFooter() {
  return (
    <footer className="relative overflow-hidden">
      {/* Background with gradient */}
      {/* Background with gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-secondary/30 to-primary/5" />

      {/* Floating shapes */}
      <div className="absolute -top-16 -right-16 w-32 h-32 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-full blur-2xl" />
      <div className="absolute -bottom-16 -left-16 w-40 h-40 bg-gradient-to-tr from-secondary/20 to-primary/10 rounded-full blur-2xl" />

      <div className="relative z-10">
        {/* Newsletter Section */}
        <NewsletterSection />

        {/* Main Footer Content */}
        <FooterContent />

        <Divider className="bg-gradient-to-r from-transparent via-primary/20 to-transparent" />

        {/* Bottom Section */}
        <BottomSection />
      </div>
    </footer>
  );
}
