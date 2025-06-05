"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { HTMLAttributes } from "react";

import adminMenuItemsIconMap, {
  AdminMenuItemsIconMapType,
} from "@/components/admin/layout/protectedLayout/sideBar/adminMenuItemsIconMap";
import { RouteValue as AdminRouteValue } from "@/lib/routes/adminRoutes";
import { RouteValue as WebRouteValue } from "@/lib/routes/webRoutes";
import { mergeStyles } from "@/lib/utils/styles";
import { Tooltip } from "@heroui/tooltip";

import { useAccordionContext } from "../accordion/AccordionContext";
import SideBarMenuList from "../sideBarMenuList/SideBarMenuList";
import { accordionItemLabelIconVariants } from "./accordionItemLabelIconVariants";
import { accordionItemLabelVariants } from "./accordionItemLabelVariants";
import { accordionItemLinkVariants } from "./accordionItemLinkVariants";
import accordionItemVariants from "./accordionItemVariants";

type Props = HTMLAttributes<HTMLLIElement> & {
  label: string;
  labelIcon?: AdminMenuItemsIconMapType;
  value: string;
  routeLink: WebRouteValue | AdminRouteValue | "#";
};

export default function AccordionItem({
  children,
  className,
  label,
  labelIcon,
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

  // Label icon
  const LabelIcon = labelIcon ? adminMenuItemsIconMap[labelIcon] : null;

  // Handles
  const handleClick = () => {
    const selectedValue = value === listOpenedValue ? "" : value;

    setListOpenedValue(selectedValue);
  };

  return (
    <li
      className={mergeStyles(className, accordionItemVariants({}))}
      {...restProps}
    >
      <Tooltip
        delay={500}
        placement="right-start"
        isDisabled={!children}
        classNames={{
          base: "hidden md:block xl:hidden",
        }}
        content={
          <SideBarMenuList opened={true} bypassMdHidden>
            {children}
          </SideBarMenuList>
        }
      >
        <Link
          href={routeLink}
          onClick={handleClick}
          className={accordionItemLinkVariants({
            opened: isOpened,
            active: isActive,
            hideArrow: !children,
          })}
        >
          {LabelIcon && (
            <LabelIcon className={accordionItemLabelIconVariants({})} />
          )}
          <span className={accordionItemLabelVariants({})}>{label}</span>
        </Link>
      </Tooltip>

      {children && (
        <SideBarMenuList opened={isOpened} bypassMdHidden={false}>
          {children}
        </SideBarMenuList>
      )}
    </li>
  );
}
