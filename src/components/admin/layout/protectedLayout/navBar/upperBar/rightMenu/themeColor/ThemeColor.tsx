"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

import ThemeType from "@/lib/types/common/ThemeType";

import ThemeIcon from "./ThemeIcon";

const ThemeColor = () => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted || theme === undefined) return null;

  const handleClickThemeChange = () => {
    const newTheme: ThemeType = theme === "light" ? "dark" : "light";

    setTheme(newTheme);
  };

  if (!theme) return null;

  return (
    <ThemeIcon
      theme={theme as ThemeType}
      handleClickIcon={handleClickThemeChange}
    />
  );
};

export default ThemeColor;
