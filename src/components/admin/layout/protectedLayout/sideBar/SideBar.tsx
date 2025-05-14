"use client";

import { useState } from "react";
import { FaRegUser } from "react-icons/fa";
import { MdDashboard } from "react-icons/md";

import { useSideBarContext } from "@/context/SideBarContext";
import { Accordion, AccordionItem } from "@heroui/react";

import NavLinksUser from "./navLinks/user/NavLinksUser";
import { sideBarVariants } from "./sideBarVariants";

const SideBar = () => {
  // Sidebar context
  const { opened } = useSideBarContext();

  // Sidebar state
  // TODO: Toto by asi mohlo byt v contextu
  const [selectedKeys, setSelectedKeys] = useState(new Set(["dashboard"]));

  return (
    <aside className={sideBarVariants({ opened })}>
      <div className="my-4 flex w-full h-full">
        <Accordion
          variant="bordered"
          selectedKeys={selectedKeys}
          onSelectionChange={setSelectedKeys}
        >
          <AccordionItem
            key="dashboard"
            aria-label="Dashboard"
            title="Dashboard"
            value="dashboard"
            startContent={<MdDashboard />}
          >
            asfdsdfsdf
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
