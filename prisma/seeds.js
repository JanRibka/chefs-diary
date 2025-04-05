import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const user = await prisma.userRoleType.upsert({
    where: { Code: "USER" },
    update: {
      Value: 2001,
      Description: "Uživatel",
    },
    create: {
      Code: "USER",
      Value: 2001,
      Description: "Uživatel",
    },
  });

  const editor = await prisma.userRoleType.upsert({
    where: { Code: "EDITOR" },
    update: {
      Value: 1984,
      Description: "Editor",
    },
    create: {
      Code: "EDITOR",
      Value: 1984,
      Description: "Editor",
    },
  });

  const admin = await prisma.userRoleType.upsert({
    where: { Code: "ADMIN" },
    update: {
      Value: 5150,
      Description: "Administrátor",
    },
    create: {
      Code: "ADMIN",
      Value: 5150,
      Description: "Administrátor",
    },
  });

  console.log({ user, editor, admin });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
