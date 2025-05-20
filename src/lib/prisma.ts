// lib/prisma.ts
import { PrismaClient } from "@prisma/client";
import { withAccelerate } from "@prisma/extension-accelerate";
import { withOptimize } from "@prisma/extension-optimize";

// //TODO: S optimize m;6u cachovat queries s cacheStrategy:{ttl: 60, swr:60 - toto na pozad9 p5enacte data do cache a nem8m loading, tags:["test"] - tag m;6u znevalidnit} a cacheStrategy:{ttl: 0} pro query, ktere se nemaji cachovat
export const prisma = new PrismaClient()
  .$extends(
    withOptimize({
      enable: process.env.OPTIMIZE_ENABLE === "true",
      apiKey: process.env.OPTIMIZE_API_KEY!,
    })
  )
  .$extends(withAccelerate());
