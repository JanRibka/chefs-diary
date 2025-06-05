"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { HTMLAttributes } from "react";

import { RouteValue as AdminRouteValue } from "@/lib/routes/adminRoutes";
import { RouteValue as WebRouteValue } from "@/lib/routes/webRoutes";
import { mergeStyles } from "@/lib/utils/styles";

import sideBarMenuListItemVariants from "./sideBarMenuListItemVariants";
import sideBarMenuListLinkVariants from "./sideBarMenuListLinkVariants";

type Props = HTMLAttributes<HTMLLIElement> & {
  routeLink: AdminRouteValue | WebRouteValue;
};

export default function SideBarMenuListItem({
  className,
  children,
  routeLink,
  ...restProps
}: Props) {
  const pathName = usePathname();
  const isActive = pathName === routeLink;

  return (
    <li
      className={mergeStyles(className, sideBarMenuListItemVariants({}))}
      {...restProps}
    >
      <Link
        href={routeLink}
        className={sideBarMenuListLinkVariants({ active: isActive })}
      >
        {children}
      </Link>
    </li>
  );
}
