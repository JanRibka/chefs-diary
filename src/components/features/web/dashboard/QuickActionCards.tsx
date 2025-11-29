"use client";

import Link from "next/link";
import {
  IoAdd,
  IoCalendar,
  IoHeart,
  IoRestaurant,
  IoSearch,
} from "react-icons/io5";

import { Card } from "@heroui/react";

const quickActions = [
  {
    title: "Přidat recept",
    description: "Sdílej svůj oblíbený recept",
    icon: IoAdd,
    href: "/recepty/novy",
    gradient: "from-emerald-500/20 to-green-500/20",
    iconColor: "text-emerald-500",
  },
  {
    title: "Hledat recepty",
    description: "Najdi inspiraci",
    icon: IoSearch,
    href: "/recepty",
    gradient: "from-blue-500/20 to-cyan-500/20",
    iconColor: "text-blue-500",
  },
  {
    title: "Moje recepty",
    description: "Zobraz své recepty",
    icon: IoRestaurant,
    href: "/prehled/moje-recepty",
    gradient: "from-orange-500/20 to-amber-500/20",
    iconColor: "text-orange-500",
  },
  {
    title: "Oblíbené",
    description: "Tvé uložené recepty",
    icon: IoHeart,
    href: "/prehled/oblibene",
    gradient: "from-pink-500/20 to-rose-500/20",
    iconColor: "text-pink-500",
  },
  {
    title: "Jídelní plán",
    description: "Naplánuj týden",
    icon: IoCalendar,
    href: "/jidelni-plan",
    gradient: "from-purple-500/20 to-violet-500/20",
    iconColor: "text-purple-500",
  },
];

export default function QuickActionCards() {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Rychlé akce</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
        {quickActions.map((action) => (
          <Link key={action.title} href={action.href}>
            <Card className="group relative overflow-hidden border-0 bg-background/50 backdrop-blur-xl hover:scale-105 transition-all duration-300 cursor-pointer h-full">
              {/* Gradient background */}
              <div
                className={`absolute inset-0 bg-gradient-to-br ${action.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
              />

              {/* Content */}
              <div className="relative p-6 flex flex-col items-center text-center space-y-3">
                <div
                  className={`p-4 rounded-2xl bg-gradient-to-br ${action.gradient} group-hover:scale-110 transition-transform duration-300`}
                >
                  <action.icon
                    className={`w-8 h-8 ${action.iconColor} group-hover:text-white transition-colors`}
                  />
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-1">{action.title}</h3>
                  <p className="text-sm text-muted-foreground">
                    {action.description}
                  </p>
                </div>
              </div>

              {/* Shine effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
