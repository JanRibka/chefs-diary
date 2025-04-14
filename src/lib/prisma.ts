// lib/prisma.ts
import { PrismaClient } from "@prisma/client";
import { withAccelerate } from "@prisma/extension-accelerate";
import { withOptimize } from "@prisma/extension-optimize";

const prismaClientSingleton = () => {
  return new PrismaClient()
    .$extends(
      withOptimize({
        enable: process.env.OPTIMIZE_ENABLE === "true",
        apiKey: process.env.OPTIMIZE_API_KEY!,
      })
    )
    .$extends(withAccelerate());
};
//TODO: S optimize m;6u cachovat queries s cacheStrategy:{ttl: 60, swr:60 - toto na pozad9 p5enacte data do cache a nem8m loading, tags:["test"] - tag m;6u znevalidnit} a cacheStrategy:{ttl: 0} pro query, ktere se nemaji cachovat
//Prisma accelerate https://www.youtube.com/watch?v=L2tWhQYiun4&t=81s&ab_channel=ByteGrad
const globalForPrisma = global as unknown as { prisma: PrismaClient };

export const prisma = globalForPrisma.prisma || prismaClientSingleton();

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
