"use client";

import User from '@/components/shared/user/User';
import { useUserContext } from '@/context/UserContext';
import { mergeStyles } from '@/lib/utils/styles';
import { Dropdown, DropdownTrigger, DropdownTriggerProps } from '@heroui/react';

import DesktopMenuContent from './DesktopMenuContent';

const DesktopMenu = ({ className, ...restProps }: DropdownTriggerProps) => {
  const { user } = useUserContext();

  return (
    <Dropdown placement="bottom" backdrop="opaque">
      <DropdownTrigger className={mergeStyles("", className)} {...restProps}>
        <User
          as="button"
          avatarProps={{
            isBordered: !!user?.image,
            src: user?.image ?? "",
          }}
          description={user?.email ?? ""}
          name={user?.name ?? ""}
        />
      </DropdownTrigger>
      <DesktopMenuContent />
    </Dropdown>
  );
};

export default DesktopMenu;
