import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { HTMLAttributes } from 'react';
import { IconType } from 'react-icons';

import { RouteValue as AdminRouteValue } from '@/lib/routes/adminRoutes';
import { RouteValue as WebRouteValue } from '@/lib/routes/webRoutes';
import { mergeStyles } from '@/lib/utils/styles';
import { Tooltip } from '@heroui/tooltip';

import { useAccordionContext } from '../accordion/AccordionContext';
import SideBarMenuList from '../sideBarMenuList/SideBarMenuList';
import { accordionItemLabelIconVariants } from './accordionItemLabelIconVariants';
import { accordionItemLabelVariants } from './accordionItemLabelVariants';
import { accordionItemLinkVariants } from './accordionItemLinkVariants';
import accordionItemVariants from './accordionItemVariants';

type Props = HTMLAttributes<HTMLLIElement> & {
  label: string;
  labelIcon?: IconType;
  sidebarOpened: boolean;
  value: string;
  routeLink: WebRouteValue | AdminRouteValue | "#";
};

export default function AccordionItem({
  children,
  className,
  sidebarOpened,
  label,
  labelIcon: LabelIcon,
  value,
  routeLink,
  ...restProps
}: Props) {
  // Context
  const { listOpenedValue, setListOpenedValue } = useAccordionContext();

  // Constants
  const pathName = usePathname();
  const isActive = pathName === routeLink;
  const isOpened = listOpenedValue === value;

  // Handles
  const handleClick = () => {
    const selectedValue = value === listOpenedValue ? "" : value;

    setListOpenedValue(selectedValue);
  };

  return (
    <li
      className={mergeStyles(
        className,
        accordionItemVariants({ opened: isOpened })
      )}
      {...restProps}
    >
      <Tooltip delay={1000} isDisabled={sidebarOpened} content={children}>
        <Link
          href={routeLink}
          onClick={handleClick}
          className={accordionItemLinkVariants({
            opened: isOpened,
            sideBarOpened: sidebarOpened,
            active: isActive,
          })}
        >
          {LabelIcon && (
            <LabelIcon
              className={accordionItemLabelIconVariants({
                sideBarOpened: sidebarOpened,
              })}
            />
          )}
          <span
            className={accordionItemLabelVariants({
              sideBarOpened: sidebarOpened,
            })}
          >
            {label}
          </span>
        </Link>
      </Tooltip>

      {children && (
        <SideBarMenuList opened={isOpened}>{children}</SideBarMenuList>
      )}
    </li>
  );
}
