"use client";

import { IoSearch } from "react-icons/io5";

import { Input } from "@heroui/react";

/**
 * MobileSearchSection - Mobile search input
 */
export const MobileSearchSection = () => {
  return (
    <div className="sm:hidden">
      <div className="relative group">
        <Input
          placeholder="Hledat recepty, ingredience..."
          startContent={
            <IoSearch className="w-5 h-5 text-primary group-focus-within:animate-pulse" />
          }
          classNames={{
            input: "text-base font-medium",
            inputWrapper:
              "bg-gradient-to-r from-white to-primary/10 dark:from-slate-800 dark:to-primary/20 border-2 border-primary/30 dark:border-primary/40 hover:border-primary/50 dark:hover:border-primary/60 focus-within:border-primary dark:focus-within:border-primary-light transition-all duration-300 shadow-lg hover:shadow-xl backdrop-blur-sm",
          }}
        />
        <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-primary/10 to-primary/15 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10 blur-xl" />
      </div>
    </div>
  );
};
