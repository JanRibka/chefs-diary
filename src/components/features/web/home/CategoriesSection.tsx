"use client";

import Link from "next/link";
import {
  GiCakeSlice,
  GiCoffeeCup,
  GiCroissant,
  GiFruitBowl,
  GiMeat,
  GiNoodles,
} from "react-icons/gi";

import { Button } from "@heroui/react";

const categories = [
  {
    id: "breakfast",
    name: "Snídaně",
    description: "Začněte den správně",
    icon: GiCroissant,
    color: "from-yellow-400 to-orange-500",
    recipes: 245,
  },
  {
    id: "main-course",
    name: "Hlavní chody",
    description: "Křehké maso a delikátní přílohy",
    icon: GiMeat,
    color: "from-red-400 to-red-600",
    recipes: 892,
  },
  {
    id: "desserts",
    name: "Dezerty",
    description: "Sladké pokušení pro všechny",
    icon: GiCakeSlice,
    color: "from-pink-400 to-pink-600",
    recipes: 456,
  },
  {
    id: "pasta",
    name: "Těstoviny",
    description: "Italská klasika různými způsoby",
    icon: GiNoodles,
    color: "from-orange-400 to-red-500",
    recipes: 234,
  },
  {
    id: "healthy",
    name: "Zdravé",
    description: "Výživné a zdravé recepty",
    icon: GiFruitBowl,
    color: "from-green-400 to-green-600",
    recipes: 378,
  },
  {
    id: "drinks",
    name: "Nápoje",
    description: "Koktejly, smoothies a čaje",
    icon: GiCoffeeCup,
    color: "from-blue-400 to-blue-600",
    recipes: 167,
  },
];

export default function CategoriesSection() {
  return (
    <section className="py-24 bg-background relative">
      {/* Subtle Pattern Overlay */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(#000 1px, transparent 1px)`,
          backgroundSize: "24px 24px",
        }}
      />
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex justify-between items-end mb-12">
          <div>
            <h2 className="text-4xl font-bold mb-2">Kategorie</h2>
            <p className="text-muted-foreground">Prozkoumejte chutě světa</p>
          </div>
          <Button variant="light" color="primary" className="font-semibold">
            Všechny kategorie
          </Button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {categories.map((category) => {
            const IconComponent = category.icon;
            return (
              <Link
                key={category.id}
                href={`/categories/${category.id}`}
                className="group relative h-48 rounded-3xl overflow-hidden bg-secondary/30 hover:bg-primary transition-colors duration-500"
              >
                <div className="absolute inset-0 flex flex-col items-center justify-center p-4 z-10">
                  <div
                    className={`p-4 rounded-2xl bg-background/50 backdrop-blur-md mb-4 group-hover:bg-white/20 transition-colors duration-300`}
                  >
                    <IconComponent className="w-8 h-8 text-foreground group-hover:text-white transition-colors" />
                  </div>
                  <span className="font-bold text-foreground group-hover:text-white transition-colors">
                    {category.name}
                  </span>
                  <span className="text-xs text-muted-foreground group-hover:text-white/80 mt-1">
                    {category.recipes} receptů
                  </span>
                </div>

                {/* Decorative blob */}
                <div
                  className={`absolute -bottom-8 -right-8 w-24 h-24 rounded-full bg-gradient-to-br ${category.color} blur-2xl opacity-40 group-hover:opacity-100 transition-opacity duration-500`}
                />
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
