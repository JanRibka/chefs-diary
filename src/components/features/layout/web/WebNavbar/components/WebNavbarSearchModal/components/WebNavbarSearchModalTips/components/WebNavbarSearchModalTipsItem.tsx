import { memo } from "react";

interface WebNavbarSearchModalTipsItemProps {
  label: string;
  text: string;
}

/**
 * WebNavbarSearchModalTipsItem
 * Individual tip item for the search tips list
 */
export const WebNavbarSearchModalTipsItem = memo(
  ({ label, text }: WebNavbarSearchModalTipsItemProps) => {
    return (
      <li className="flex gap-3 text-sm text-default-600 dark:text-default-400">
        <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0" />
        <span>
          <strong className="text-default-900 dark:text-default-200">
            {label}
          </strong>{" "}
          {text}
        </span>
      </li>
    );
  }
);

WebNavbarSearchModalTipsItem.displayName = "WebNavbarSearchModalTipsItem";
