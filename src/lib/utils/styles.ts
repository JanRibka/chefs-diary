import { ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export const mergeStyles = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs));
};
