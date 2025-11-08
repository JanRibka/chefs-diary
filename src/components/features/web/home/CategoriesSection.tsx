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
import { IoFastFood } from "react-icons/io5";

import { Button, Card, CardBody } from "@heroui/react";

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
    <section className="py-20 bg-white dark:bg-default-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Kulinářské kategorie
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Najděte recepty podle vašeho vkusu a nálady. Od rychlých snídaní po
            luxusní večeře.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category) => {
            const IconComponent = category.icon;
            return (
              <Card
                key={category.id}
                as={Link}
                href={`/categories/${category.id}`}
                className="group hover:shadow-2xl transition-all duration-300 border-0 shadow-lg cursor-pointer"
              >
                <CardBody className="p-8 text-center">
                  <div
                    className={`w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-br ${category.color} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}
                  >
                    <IconComponent className="w-10 h-10 text-white" />
                  </div>

                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-primary transition-colors">
                    {category.name}
                  </h3>

                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    {category.description}
                  </p>

                  <div className="flex items-center justify-center gap-2 text-sm text-gray-500 dark:text-gray-400 mb-4">
                    <IoFastFood className="w-4 h-4" />
                    <span>{category.recipes} receptů</span>
                  </div>

                  <Button
                    variant="ghost"
                    color="primary"
                    className="font-medium group-hover:bg-primary group-hover:text-white transition-colors"
                  >
                    Prozkoumat
                  </Button>
                </CardBody>
              </Card>
            );
          })}
        </div>

        <div className="text-center mt-12">
          <Button
            as={Link}
            href="/categories"
            size="lg"
            variant="bordered"
            className="font-semibold px-8 py-3 text-lg border-2"
          >
            Zobrazit všechny kategorie
          </Button>
        </div>
      </div>
    </section>
  );
}
