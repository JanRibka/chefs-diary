"use client";

import { FaUserLarge } from "react-icons/fa6";
import { RiDashboardFill } from "react-icons/ri";

import Accordion from "@/components/shared/accordion/Accordion";
import AccordionItem from "@/components/shared/accordionItem/AccordionItem";
import SideBarMenuListItem from "@/components/shared/sideBarMenuListItem/SideBarMenuListItem";
import { useSideBarContext } from "@/context/SideBarContext";
import adminRoutes from "@/lib/routes/adminRoutes";

import { sideBarVariants } from "./sideBarVariants";

const SideBar = () => {
  // Sidebar context
  const { opened } = useSideBarContext();

  return (
    <aside className={sideBarVariants({ opened })}>
      <div className="flex w-full h-full">
        <Accordion>
          <AccordionItem
            key="dashboard"
            aria-label="Dashboard"
            value="dashboard"
            label="Dashboard"
            labelIcon={RiDashboardFill}
            sidebarOpened={opened}
            routeLink="#"
          />
          <AccordionItem
            key="users"
            aria-label="Uživatelé"
            value="users"
            label="Uživatelé"
            labelIcon={FaUserLarge}
            sidebarOpened={opened}
            routeLink="#"
          >
            <SideBarMenuListItem routeLink={adminRoutes.Dashboard}>
              Test
            </SideBarMenuListItem>
            <SideBarMenuListItem routeLink={adminRoutes.LogIn}>
              Test2
            </SideBarMenuListItem>
          </AccordionItem>
        </Accordion>
      </div>
    </aside>
  );
};

export default SideBar;
