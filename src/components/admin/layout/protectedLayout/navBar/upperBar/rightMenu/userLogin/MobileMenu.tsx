"use client";

import { useState } from 'react';

import { useUserContext } from '@/context/UserContext';
import { mergeStyles } from '@/lib/utils/styles';
import { Avatar, Navbar, NavbarContent, NavbarProps } from '@heroui/react';

import MobileMenuContent from './MobileMenuContent';

const UserLogin = ({ className, ...restProps }: NavbarProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const { user } = useUserContext();

  const handleClickOpen = () => {
    setIsMenuOpen((prev) => !prev);
  };

  return (
    <Navbar
      isMenuOpen={isMenuOpen}
      className={mergeStyles("", className)}
      {...restProps}
    >
      <NavbarContent>
        <Avatar
          isBordered={!!user?.image}
          as="button"
          className="md:hidden"
          onClick={handleClickOpen}
        />
      </NavbarContent>

      <MobileMenuContent user={user} />
    </Navbar>
  );
};

export default UserLogin;
