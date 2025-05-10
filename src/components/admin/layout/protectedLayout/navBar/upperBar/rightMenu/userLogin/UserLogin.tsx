"use client";

import User from "@/components/shared/user/User";
import { useUserContext } from "@/context/UserContext";
import {
  Avatar,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@heroui/react";

const UserLogin = () => {
  const { user } = useUserContext();

  return (
    <div className="cursor-pointer flex items-center">
      <Dropdown placement="bottom" backdrop="opaque">
        <DropdownTrigger>
          <div>
            <Avatar
              isBordered={!!user?.image}
              as="button"
              className="md:hidden"
            />
            <User
              className="hidden md:inline-flex"
              as="button"
              avatarProps={{
                isBordered: !!user?.image,
                src: user?.image ?? "",
              }}
              description={user?.email ?? ""}
              name={user?.name ?? ""}
            />
          </div>
        </DropdownTrigger>
        <DropdownMenu>
          <DropdownItem key="content">content</DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </div>
  );
};

export default UserLogin;
