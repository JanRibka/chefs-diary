import { memo } from "react";

/**
 * LogoTextDecoration - Decorative SVG curve for the logo text
 * Used under "Deník" text as a visual accent
 */
const LogoTextDecoration = memo(() => (
  <svg
    width="28"
    height="8"
    viewBox="0 0 28 8"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="opacity-80"
  >
    <path
      d="M0 4C2 2 6 1 9 1C12 1 16 2 18 3C20 4 24 6 28 4"
      stroke="currentColor"
      strokeWidth="0.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
));

LogoTextDecoration.displayName = "LogoTextDecoration";

export default LogoTextDecoration;
