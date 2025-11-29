"use client";

import { IoEye, IoHeart, IoRestaurant, IoStar } from "react-icons/io5";

import { Card } from "@heroui/react";

const stats = [
  {
    label: "Moje recepty",
    value: "0",
    icon: IoRestaurant,
    gradient: "from-orange-500 to-amber-500",
    bgGradient: "from-orange-500/10 to-amber-500/10",
  },
  {
    label: "Oblíbené",
    value: "0",
    icon: IoHeart,
    gradient: "from-pink-500 to-rose-500",
    bgGradient: "from-pink-500/10 to-rose-500/10",
  },
  {
    label: "Zobrazení",
    value: "0",
    icon: IoEye,
    gradient: "from-blue-500 to-cyan-500",
    bgGradient: "from-blue-500/10 to-cyan-500/10",
  },
  {
    label: "Průměrné hodnocení",
    value: "0.0",
    icon: IoStar,
    gradient: "from-yellow-500 to-amber-500",
    bgGradient: "from-yellow-500/10 to-amber-500/10",
  },
];

export default function UserStats() {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Tvoje statistiky</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <Card
            key={stat.label}
            className="relative overflow-hidden border-0 bg-background/50 backdrop-blur-xl group hover:scale-105 transition-all duration-300"
          >
            {/* Background gradient */}
            <div
              className={`absolute inset-0 bg-gradient-to-br ${stat.bgGradient} opacity-50 group-hover:opacity-100 transition-opacity`}
            />

            {/* Decorative circle */}
            <div
              className={`absolute -top-8 -right-8 w-32 h-32 bg-gradient-to-br ${stat.gradient} rounded-full blur-2xl opacity-20 group-hover:opacity-40 transition-opacity`}
            />

            {/* Content */}
            <div className="relative p-6">
              <div className="flex items-start justify-between mb-4">
                <div
                  className={`p-3 rounded-xl bg-gradient-to-br ${stat.gradient} shadow-lg group-hover:scale-110 transition-transform`}
                >
                  <stat.icon className="w-6 h-6 text-white" />
                </div>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">
                  {stat.label}
                </p>
                <p className="text-3xl font-bold bg-gradient-to-r from-foreground to-foreground/60 bg-clip-text text-transparent">
                  {stat.value}
                </p>
              </div>
            </div>

            {/* Shine effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
          </Card>
        ))}
      </div>
    </div>
  );
}
