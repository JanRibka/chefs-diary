"use client";

import { FaDatabase, FaUserLarge } from "react-icons/fa6";
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
          {/* Dashboard */}
          <AccordionItem
            key="dashboard"
            aria-label="Dashboard"
            value="dashboard"
            label="Dashboard"
            labelIcon={RiDashboardFill}
            routeLink="#"
          />
          {/* Uživatelé */}
          <AccordionItem
            key="users"
            aria-label="Uživatelé"
            value="users"
            label="Uživatelé"
            labelIcon={FaUserLarge}
            routeLink="#"
          >
            <SideBarMenuListItem routeLink={adminRoutes.Dashboard}>
              Všichni uživatelé
            </SideBarMenuListItem>
            <SideBarMenuListItem routeLink={adminRoutes.Dashboard}>
              Profil uživatele
            </SideBarMenuListItem>
            <SideBarMenuListItem routeLink={adminRoutes.LogIn}>
              Práva uživatelů
            </SideBarMenuListItem>
          </AccordionItem>
          {/* Data webu */}
          <AccordionItem
            key="web-data"
            aria-label="Data webu"
            value="web-data"
            label="Data webu"
            labelIcon={FaDatabase}
            routeLink="#"
          >
            <SideBarMenuListItem routeLink={adminRoutes.Dashboard}>
              Jednotky
            </SideBarMenuListItem>
            <SideBarMenuListItem routeLink={adminRoutes.LogIn}>
              Ingredience
            </SideBarMenuListItem>
          </AccordionItem>
          {/* Oprávnění */}
          <AccordionItem
            key="roles-permissions"
            aria-label="Práva a oprávnění"
            value="roles-permissions"
            label="Práva a oprávnění"
            labelIcon={FaDatabase}
            routeLink="#"
          >
            <SideBarMenuListItem routeLink={adminRoutes.Dashboard}>
              Práva
            </SideBarMenuListItem>
            <SideBarMenuListItem routeLink={adminRoutes.LogIn}>
              Oprávnění
            </SideBarMenuListItem>
          </AccordionItem>
        </Accordion>
      </div>
    </aside>
  );
};

export default SideBar;
