"use client";

import { ReactNode } from "react";

import Accordion from "@/components/shared/accordion/Accordion";
import { useSideBarContext } from "@/context/SideBarContext";

import { sideBarVariants } from "./sideBarVariants";

type Props = {
  children: ReactNode;
};

const SideBar = ({ children }: Props) => {
  // Sidebar context
  const { opened } = useSideBarContext();

  return (
    <aside className={sideBarVariants({ opened })}>
      <nav
        aria-label="Navigace v postranním panelu"
        className="flex w-full h-full"
      >
        {/* TODO: Mel bych i n2jak osetri, ze kdyz do prohlizece zadam url na stranku kde nemam opravneni musi mi to vyhodit stranku s textem, ze nemam opraveni. ASi bych to mohl dat do layout dane stranky. BUdu m9t komponentu, ktera bude vyhodnocovat opravn2ni v reactu */}
        <Accordion>{children}</Accordion>
      </nav>
    </aside>
  );
};

export default SideBar;
