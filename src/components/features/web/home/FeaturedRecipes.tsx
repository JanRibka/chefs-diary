"use client";

import Image from "next/image";
import Link from "next/link";
import { IoHeart, IoStar, IoTime } from "react-icons/io5";

import { Avatar, Button, Card, CardBody, Chip } from "@heroui/react";

const featuredRecipes = [
  {
    id: 1,
    title: "Křupavá kuřecí prsa s bylinkovou krustou",
    description:
      "Křehké kuřecí maso obalené v bylinkách a pečené dokřupava. Servírujte s bramborovou kaší.",
    image: "/api/placeholder/400/300",
    cookTime: "35 min",
    difficulty: "Střední",
    rating: 4.8,
    author: {
      name: "Marie Nováková",
      avatar: "/api/placeholder/40/40",
    },
    tags: ["kuřecí", "hlavní chod", "pečivo"],
  },
  {
    id: 2,
    title: "Čokoládový dort s malinami",
    description:
      "Luxusní čokoládový dort s čerstvými malinami a vanilkovou polevou. Pro všechny milovníky sladkého.",
    image: "/api/placeholder/400/300",
    cookTime: "90 min",
    difficulty: "Pokročilý",
    rating: 4.9,
    author: {
      name: "Petr Svoboda",
      avatar: "/api/placeholder/40/40",
    },
    tags: ["dezert", "čokoláda", "maliny"],
  },
  {
    id: 3,
    title: "Zdravá avokádová toasty",
    description:
      "Rychlá a zdravá snídaně plná vitamínů. Perfektní start do dne.",
    image: "/api/placeholder/400/300",
    cookTime: "10 min",
    difficulty: "Jednoduché",
    rating: 4.6,
    author: {
      name: "Anna Kovářová",
      avatar: "/api/placeholder/40/40",
    },
    tags: ["snídaně", "zdravé", "rychlé"],
  },
];

export default function FeaturedRecipes() {
  return (
    <section className="py-20 bg-gray-50 dark:bg-default-900">
      <div className="max-w-main mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Nejoblíbenější recepty
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Objevte recepty, které si zamilovali tisíce kuchařů. Každý recept je
            pečlivě vybrán pro svou kvalitu a chuť.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {featuredRecipes.map((recipe) => (
            <Card
              key={recipe.id}
              className="group hover:shadow-2xl transition-all duration-300 border-0 shadow-lg"
            >
              <CardBody className="p-0">
                <div className="relative overflow-hidden rounded-t-xl">
                  <Image
                    src={recipe.image}
                    alt={recipe.title}
                    width={400}
                    height={300}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-4 right-4">
                    <Button
                      isIconOnly
                      size="sm"
                      variant="solid"
                      className="bg-white/90 hover:bg-white text-red-500 hover:text-red-600 shadow-lg"
                    >
                      <IoHeart className="w-4 h-4" />
                    </Button>
                  </div>
                  <div className="absolute top-4 left-4">
                    <Chip
                      color={
                        recipe.difficulty === "Jednoduché"
                          ? "success"
                          : recipe.difficulty === "Střední"
                          ? "warning"
                          : "danger"
                      }
                      variant="solid"
                      className="text-white font-medium"
                    >
                      {recipe.difficulty}
                    </Chip>
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                    {recipe.title}
                  </h3>

                  <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-2">
                    {recipe.description}
                  </p>

                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <IoTime className="w-4 h-4 text-gray-500" />
                      <span className="text-sm text-gray-600 dark:text-gray-400">
                        {recipe.cookTime}
                      </span>
                    </div>
                    <div className="flex items-center gap-1">
                      <IoStar className="w-4 h-4 text-yellow-500 fill-current" />
                      <span className="text-sm text-gray-600 dark:text-gray-400">
                        {recipe.rating}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <Avatar
                        src={recipe.author.avatar}
                        size="sm"
                        name={recipe.author.name}
                      />
                      <span className="text-sm text-gray-600 dark:text-gray-400">
                        {recipe.author.name}
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {recipe.tags.slice(0, 3).map((tag) => (
                      <Chip
                        key={tag}
                        size="sm"
                        variant="flat"
                        className="text-xs"
                      >
                        {tag}
                      </Chip>
                    ))}
                  </div>

                  <Button
                    as={Link}
                    href={`/recipes/${recipe.id}`}
                    color="primary"
                    variant="solid"
                    className="w-full font-medium"
                  >
                    Zobrazit recept
                  </Button>
                </div>
              </CardBody>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <Button
            as={Link}
            href="/recipes"
            size="lg"
            variant="bordered"
            className="font-semibold px-8 py-3 text-lg border-2"
          >
            Zobrazit všechny recepty
          </Button>
        </div>
      </div>
    </section>
  );
}
