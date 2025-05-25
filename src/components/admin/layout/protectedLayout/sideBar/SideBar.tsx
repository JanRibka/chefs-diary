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
      <nav
        aria-label="Navigace v postranním panelu"
        className="flex w-full h-full"
      >
        <Accordion>
          {/* Dashboard */}
          <AccordionItem
            key="dashboard"
            aria-label="Dashboard"
            value="dashboard"
            label="Dashboard"
            labelIcon={RiDashboardFill}
            routeLink={adminRoutes.Dashboard}
          />
          {/* Uživatelé */}
          {/* TODO: Item bude v souboru a podle oprávnění se budou podle oprávnění se bd vrátí null nebo daná záložka */}
          {/* TODO: Mel bych i n2jak osetri, ze kdyz do prohlizece zadam url na stranku kde nemam opravneni musi mi to vyhodit stranku s textem, ze nemam opraveni. ASi bych to mohl dat do layout dane stranky. BUdu m9t komponentu, ktera bude vyhodnocovat opravn2ni v reactu */}
          <AccordionItem
            key="users"
            aria-label="Uživatelé"
            value="users"
            label="Uživatelé"
            labelIcon={FaUserLarge}
            routeLink="#"
          >
            <SideBarMenuListItem routeLink={adminRoutes.AllUsers}>
              Všichni uživatelé
            </SideBarMenuListItem>
            <SideBarMenuListItem routeLink={adminRoutes.UserProfile}>
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
            <SideBarMenuListItem routeLink={adminRoutes.Units}>
              Jednotky
            </SideBarMenuListItem>
            <SideBarMenuListItem routeLink={adminRoutes.Ingredients}>
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
      </nav>
    </aside>
  );
};

export default SideBar;
