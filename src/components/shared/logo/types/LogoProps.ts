import { LogoSize } from "./LogoSize";
import { LogoVariant } from "./LogoVariant";

export interface LogoProps {
  /** Whether the page is scrolled - affects logo size and animations. @default false */
  scrolled?: boolean;
  /** Whether to show the text part of the logo. @default true */
  showText?: boolean;
  /** URL to link to when logo is clicked. If not provided, logo won't be a link. @default "/" */
  href?: string;
  /** Additional CSS classes to apply to the logo container. @default "" */
  className?: string;
  /** Size variant of the logo. @default "md" */
  size?: LogoSize;
  /** Whether to disable hover effects and animations. @default false */
  disableHover?: boolean;
  /** Color variant for different themes. @default "default" */
  variant?: LogoVariant;
}
