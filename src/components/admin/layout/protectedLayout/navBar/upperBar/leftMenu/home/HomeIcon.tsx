import Link from "next/link";
import { HiMiniHome } from "react-icons/hi2";

import Icon from "@/components/shared/icon/Icon";
import adminRoutes from "@/lib/routes/adminRoutes";

const HomeIcon = () => {
  return (
    <div className="flex justify-center md:-ml-9 md:w-24 xl:w-44 transition-all duration-200 ease-linear">
      <Link href={adminRoutes.Dashboard}>
        <Icon>
          <HiMiniHome className="text-3xl xl:text-4xl" />
        </Icon>
      </Link>
    </div>
  );
};

export default HomeIcon;
