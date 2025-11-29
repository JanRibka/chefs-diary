"use client";

import { IoAdd, IoArrowForward } from "react-icons/io5";

import { Button, Card } from "@heroui/react";

export default function RecentRecipes() {
  // Placeholder - later will fetch real data
  const hasRecipes = false;

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">Poslední recepty</h2>
        <Button
          color="primary"
          variant="flat"
          endContent={<IoArrowForward />}
          className="font-semibold"
        >
          Zobrazit vše
        </Button>
      </div>

      {!hasRecipes ? (
        <Card className="border-0 bg-background/50 backdrop-blur-xl">
          <div className="p-12 text-center">
            {/* Empty state illustration */}
            <div className="mb-6 inline-block">
              <div className="w-24 h-24 rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
                <IoAdd className="w-12 h-12 text-primary" />
              </div>
            </div>

            <h3 className="text-2xl font-bold mb-3">
              Zatím jsi nepřidal žádný recept
            </h3>
            <p className="text-muted-foreground mb-6 max-w-md mx-auto">
              Začni sdílet své oblíbené recepty a staň se součástí naší
              kulinářské komunity!
            </p>

            <Button
              color="primary"
              size="lg"
              startContent={<IoAdd />}
              className="font-bold"
            >
              Přidat první recept
            </Button>
          </div>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Recipe cards will go here */}
        </div>
      )}
    </div>
  );
}
