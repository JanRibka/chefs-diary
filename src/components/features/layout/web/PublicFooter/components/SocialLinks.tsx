import NextLink from "next/link";
import { Button } from "@heroui/react";
import { FaFacebook, FaInstagram, FaTwitter, FaYoutube, FaTiktok } from "react-icons/fa";

import { socialLinksData } from "../constants/config";

/**
 * SocialLinks - Social media links component
 * Renders social media buttons with proper icons and styling
 */
export const SocialLinks = () => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case "FaFacebook":
        return FaFacebook;
      case "FaInstagram":
        return FaInstagram;
      case "FaTwitter":
        return FaTwitter;
      case "FaYoutube":
        return FaYoutube;
      case "FaTiktok":
        return FaTiktok;
      default:
        return FaFacebook;
    }
  };

  return (
    <div className="flex gap-3">
      {socialLinksData.map((social) => {
        const Icon = getIcon(social.iconName);
        return (
          <Button
            key={social.label}
            as={NextLink}
            href={social.href}
            isIconOnly
            variant="flat"
            size="lg"
            className={`bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm hover:bg-orange-100 dark:hover:bg-orange-900/30 transition-all duration-200 ${social.color}`}
            aria-label={social.label}
          >
            <Icon className="w-5 h-5" />
          </Button>
        );
      })}
    </div>
  );
};