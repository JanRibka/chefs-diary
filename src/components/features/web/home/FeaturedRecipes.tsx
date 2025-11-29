"use client";

import Image from "next/image";

import { IoStar, IoTime } from "react-icons/io5";

import { Card, Chip } from "@heroui/react";

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
    <section className="py-24 bg-secondary/30 relative overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Trending <span className="text-primary">Now</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            To nejlepší z naší kuchyně, co musíte vyzkoušet.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[400px]">
          {/* Main Feature - Large Card */}
          <Card className="md:col-span-2 row-span-1 md:row-span-2 group relative overflow-hidden border-0 bg-black/5 dark:bg-white/5 backdrop-blur-lg">
            <Image
              src={featuredRecipes[0].image}
              alt={featuredRecipes[0].title}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-110 opacity-80 group-hover:opacity-60"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
            <div className="absolute bottom-0 left-0 p-8 w-full">
              <div className="flex gap-2 mb-4">
                {featuredRecipes[0].tags.map((tag) => (
                  <Chip
                    key={tag}
                    color="primary"
                    variant="solid"
                    className="uppercase font-bold tracking-wider text-xs"
                  >
                    {tag}
                  </Chip>
                ))}
              </div>
              <h3 className="text-3xl md:text-4xl font-bold text-white mb-4 group-hover:text-primary transition-colors">
                {featuredRecipes[0].title}
              </h3>
              <div className="flex items-center gap-6 text-white/80">
                <div className="flex items-center gap-2">
                  <IoTime /> {featuredRecipes[0].cookTime}
                </div>
                <div className="flex items-center gap-2">
                  <IoStar className="text-yellow-400" />{" "}
                  {featuredRecipes[0].rating}
                </div>
              </div>
            </div>
          </Card>

          {/* Secondary Cards */}
          {featuredRecipes.slice(1).map((recipe) => (
            <Card
              key={recipe.id}
              className="group relative overflow-hidden border-0 bg-black/5 dark:bg-white/5 backdrop-blur-lg"
            >
              <Image
                src={recipe.image}
                alt={recipe.title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110 opacity-80 group-hover:opacity-60"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
              <div className="absolute bottom-0 left-0 p-6 w-full">
                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-primary transition-colors line-clamp-2">
                  {recipe.title}
                </h3>
                <div className="flex justify-between items-center text-white/80 text-sm">
                  <span>{recipe.cookTime}</span>
                  <div className="flex items-center gap-1">
                    <IoStar className="text-yellow-400" /> {recipe.rating}
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
