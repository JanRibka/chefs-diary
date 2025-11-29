/**
 * Navigation item type - shared between desktop and mobile
 */
export interface NavItem {
  href: string;
  label: string;
  icon: string;
  description: string; // For desktop tooltips
  color: string; // For mobile gradients
}
