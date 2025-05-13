import { mergeStyles } from '@/lib/utils/styles';
import { NavbarMenuItem as HeroNavbarMenuItem, NavbarMenuItemProps } from '@heroui/react';

type Props = NavbarMenuItemProps & {
  startContent?: React.ReactNode;
  endContent?: React.ReactNode;
};

export default function NavbarMenuItem({
  className,
  children,
  startContent,
  endContent,
  ...restProps
}: Props) {
  return (
    <HeroNavbarMenuItem
      className={mergeStyles(
        "flex items-center justify-between gap-2",
        className
      )}
      {...restProps}
    >
      {startContent}
      <span className="flex-1">{children}</span>
      {endContent}
    </HeroNavbarMenuItem>
  );
}
