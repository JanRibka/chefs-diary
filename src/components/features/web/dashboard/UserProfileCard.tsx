"use client";

import Link from "next/link";
import { IoCamera, IoPencil } from "react-icons/io5";

import { Avatar, Button, Card } from "@heroui/react";

import { useUserContext } from "@/lib/context/UserContext";

export default function UserProfileCard() {
  const { user } = useUserContext();

  if (!user) return null;

  return (
    <Card className="relative overflow-hidden border-0 bg-gradient-to-br from-primary/10 via-background/50 to-secondary/10 backdrop-blur-xl">
      {/* Decorative background elements */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-0 left-0 w-48 h-48 bg-secondary/20 rounded-full blur-3xl -z-10" />

      <div className="p-8">
        <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
          {/* Avatar with upload overlay */}
          <div className="relative group">
            <Avatar
              src={user.image || ""}
              name={user.name || user.email}
              className="w-24 h-24 text-large ring-4 ring-primary/20 transition-all group-hover:ring-primary/40"
            />
            <button className="absolute inset-0 flex items-center justify-center bg-black/60 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
              <IoCamera className="w-8 h-8 text-white" />
            </button>
          </div>

          {/* User Info */}
          <div className="flex-1">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-foreground to-foreground/60 bg-clip-text text-transparent mb-2">
              {user.name || "Uživatel"}
            </h1>
            <p className="text-muted-foreground mb-4">{user.email}</p>
            <div className="flex flex-wrap gap-2">
              <Button
                as={Link}
                href="/prehled/nastaveni"
                color="primary"
                variant="flat"
                startContent={<IoPencil />}
                className="font-semibold"
              >
                Upravit profil
              </Button>
            </div>
          </div>

          {/* Member badge */}
          <div className="hidden lg:block">
            <div className="px-6 py-3 rounded-2xl bg-gradient-to-r from-primary/20 to-secondary/20 border border-primary/30">
              <p className="text-sm text-muted-foreground">Člen od</p>
              <p className="text-lg font-bold">
                {new Date(user.emailVerified || Date.now()).toLocaleDateString(
                  "cs-CZ",
                  {
                    month: "long",
                    year: "numeric",
                  }
                )}
              </p>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}
