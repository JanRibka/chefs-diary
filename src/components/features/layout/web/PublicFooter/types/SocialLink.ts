import type { IconType } from "react-icons";

/**
 * SocialLink - Interface for social media links
 */
export interface SocialLink {
  href: string;
  icon: IconType;
  label: string;
  color: string;
}