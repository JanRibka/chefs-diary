import { tv } from 'tailwind-variants';

/**
 * loginPopoverWrapperStyles - Login popover wrapper styling with tailwind-variants
 * Organized into logical slots for better maintainability
 */
export const loginPopoverWrapperStyles = tv({
  slots: {
    // Popover base classes
    popoverBase: "z-50",

    // Popover content classes
    popoverContent: "z-50",

    // Popover content container
    content: "w-80 p-0",
  },
});
