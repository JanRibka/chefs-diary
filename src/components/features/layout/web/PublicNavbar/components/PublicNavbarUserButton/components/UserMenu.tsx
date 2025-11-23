"use client";

import { memo } from "react";

import { Button } from "@heroui/react";

/**
 * UserMenu - User dropdown menu with logout button
 */
export const UserMenu = memo(() => {
  const handleLogout = () => {
    // TODO: Implement logout logic
    // console.log('Logout clicked');
  };

  return (
    <div className="p-4 min-w-[200px] bg-transparent">
      <div className="space-y-2">
        <Button
          variant="ghost"
          color="danger"
          size="sm"
          onPress={handleLogout}
          className="w-full justify-start"
        >
          Odhlásit se
        </Button>
      </div>
    </div>
  );
});

UserMenu.displayName = "UserMenu";
