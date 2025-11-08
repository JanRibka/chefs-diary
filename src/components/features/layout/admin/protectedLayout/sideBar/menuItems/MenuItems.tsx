import AccordionItem from "@/components/shared/accordionItem/AccordionItem";
import HideContentNoPermission from "@/components/shared/layout/hideContentNoPermission/HideContentNoPermission";
import SideBarMenuListItem from "@/components/shared/sideBarMenuListItem/SideBarMenuListItem";
import { RouteValue } from "@/lib/routes/adminRoutes";

import adminMenuItems from "../adminMenuItems";

const MenuItems = () => {
  return (
    <>
      {adminMenuItems.map((item) => (
        <HideContentNoPermission
          key={`hide_content_${item.key}`}
          allowedPermissions={item.permissions}
        >
          <AccordionItem
            key={item.key}
            aria-label={item.label}
            value={item.key}
            label={item.label}
            labelIcon={item.icon}
            routeLink={item.link ?? "#"}
          >
            {item.subitems?.length
              ? item.subitems.map((subItem) => (
                  <HideContentNoPermission
                    key={`hide_content_${item.key}_${subItem.key}`}
                    allowedPermissions={subItem.permissions}
                  >
                    <SideBarMenuListItem routeLink={subItem.link as RouteValue}>
                      {subItem.label}
                    </SideBarMenuListItem>
                  </HideContentNoPermission>
                ))
              : null}
          </AccordionItem>
        </HideContentNoPermission>
      ))}
    </>
  );
};

export default MenuItems;
