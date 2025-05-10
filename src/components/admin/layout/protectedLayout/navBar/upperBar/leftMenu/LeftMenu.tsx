"use client";

import HamburgerIcon from "@/components/shared/hamburgerIcon/HamburgerIcon";
import { useSideBarContext } from "@/context/SideBarContext";

import HomeIcon from "./home/HomeIcon";

const LeftMenu = () => {
  const { opened, setOpen } = useSideBarContext();

  return (
    <div className="flex flex-row items-center">
      <HomeIcon />
      <div className="ml-7 md:hidden xl:block">
        <HamburgerIcon opened={opened} setOpen={setOpen} />
      </div>
    </div>
  );
};

export default LeftMenu;
