"use client";

import { FaRegUser } from 'react-icons/fa';
import { LuLayoutDashboard } from 'react-icons/lu';

import Accordion from '@/components/shared/accordion/Accordion';
import AccordionItem from '@/components/shared/accordionItem/AccordionItem';
import SideBarMenuListItem from '@/components/shared/sideBarMenuListItem/SideBarMenuListItem';
import { useSideBarContext } from '@/context/SideBarContext';
import adminRoutes from '@/lib/routes/adminRoutes';

import { sideBarVariants } from './sideBarVariants';

const SideBar = () => {
  // Sidebar context
  const { opened } = useSideBarContext();

  // Sidebar state
  // TODO: Toto by asi mohlo byt v contextu

  return (
    <aside className={sideBarVariants({ opened })}>
      <div className="my-4 flex w-full h-full">
        <Accordion>
          <AccordionItem
            key="dashboard"
            aria-label="Dashboard"
            value="dashboard"
            label="Dashboard"
            labelIcon={LuLayoutDashboard}
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
          {/* <AccordionItem
            actualValue={sideBar.actualValue}
            content={<NavLinksUser />}
            label="Uživatel"
            labelIcon={FaRegUser}
            onClick={handleOnClick}
            value="user"
          /> */}
        </Accordion>
      </div>
    </aside>
  );
};

export default SideBar;
