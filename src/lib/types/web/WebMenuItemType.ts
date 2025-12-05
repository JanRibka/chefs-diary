export type WebMenuItemType = {
  key: string;
  label: string;
  href: string; // Using string instead of RouteValue for flexibility with dynamic URLs
  subitems?: WebMenuItemType[];
  megaMenu?: boolean; // Enable mega menu layout for dropdown
};

export default WebMenuItemType;
