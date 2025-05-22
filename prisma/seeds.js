import { PrismaClient } from "@prisma/client";
// import { faker } from "@faker-js/faker";

const prisma = new PrismaClient();

async function main() {
  // Vytváření rolí
  const auditor = await prisma.userRoleType.upsert({
    where: { Code: "AUDITOR" },
    update: {
      Value: 7625,
      Description: "Auditor",
    },
    create: {
      Code: "AUDITOR",
      Value: 7625,
      Description: "Auditor",
    },
  });

  const support = await prisma.userRoleType.upsert({
    where: { Code: "SUPPORT" },
    update: {
      Value: 4468,
      Description: "Podpora",
    },
    create: {
      Code: "SUPPORT",
      Value: 4468,
      Description: "Podpora",
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

  const moderator = await prisma.userRoleType.upsert({
    where: { Code: "MODERATOR" },
    update: {
      Value: 3128,
      Description: "Moderátor",
    },
    create: {
      Code: "MODERATOR",
      Value: 3128,
      Description: "Moderátor",
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

  const superAdmin = await prisma.userRoleType.upsert({
    where: { Code: "SUPER_ADMIN" },
    update: {
      Value: 2821,
      Description: "Super administrátor",
    },
    create: {
      Code: "SUPER_ADMIN",
      Value: 2821,
      Description: "Super administrátor",
    },
  });

  console.log({ auditor, support, editor, moderator, admin, superAdmin });

  // Vytváření oprávnění
  const userView = await prisma.permission.upsert({
    where: { Code: "USER_VIEW" },
    update: {
      Value: 1,
      Description: "Zobrazit uživatele",
    },
    create: {
      Code: "USER_VIEW",
      Value: 1,
      Description: "Zobrazit uživatele",
    },
  });
  const userEdit = await prisma.permission.upsert({
    where: { Code: "USER_EDIT" },
    update: {
      Value: 2,
      Description: "Upravit uživatele",
    },
    create: {
      Code: "USER_EDIT",
      Value: 2,
      Description: "Upravit uživatele",
    },
  });
  const userDelete = await prisma.permission.upsert({
    where: { Code: "USER_DELETE" },
    update: {
      Value: 3,
      Description: "Smazat uživatele",
    },
    create: {
      Code: "USER_DELETE",
      Value: 3,
      Description: "Smazat uživatele",
    },
  });
  const roleAssign = await prisma.permission.upsert({
    where: { Code: "ROLE_ASSIGN" },
    update: {
      Value: 10,
      Description: "Přiřazovat role",
    },
    create: {
      Code: "ROLE_ASSIGN",
      Value: 10,
      Description: "Přiřazovat role",
    },
  });
  const permissionEdit = await prisma.permission.upsert({
    where: { Code: "PERMISSION_EDIT" },
    update: {
      Value: 20,
      Description: "Správa oprávnění",
    },
    create: {
      Code: "PERMISSION_EDIT",
      Value: 20,
      Description: "Správa oprávnění",
    },
  });
  const logView = await prisma.permission.upsert({
    where: { Code: "LOG_VIEW" },
    update: {
      Value: 30,
      Description: "Zobrazit systémové logy",
    },
    create: {
      Code: "LOG_VIEW",
      Value: 30,
      Description: "Zobrazit systémové logy",
    },
  });
  const postApprove = await prisma.permission.upsert({
    where: { Code: "POST_APPROVE" },
    update: {
      Value: 40,
      Description: "Schválit příspěvek",
    },
    create: {
      Code: "POST_APPROVE",
      Value: 40,
      Description: "Schválit příspěvek",
    },
  });
  const recipePublish = await prisma.permission.upsert({
    where: { Code: "RECIPE_PUBLISH" },
    update: {
      Value: 50,
      Description: "Publikovat recept",
    },
    create: {
      Code: "RECIPE_PUBLISH",
      Value: 50,
      Description: "Publikovat recept",
    },
  });
  const recipeEdit = await prisma.permission.upsert({
    where: { Code: "RECIPE_EDIT" },
    update: {
      Value: 51,
      Description: "Upravovat recept",
    },
    create: {
      Code: "RECIPE_EDIT",
      Value: 51,
      Description: "Upravovat recept",
    },
  });
  const recipeDelete = await prisma.permission.upsert({
    where: { Code: "RECIPE_DELETE" },
    update: {
      Value: 52,
      Description: "Mazat recept recept",
    },
    create: {
      Code: "RECIPE_DELETE",
      Value: 52,
      Description: "Publikovat recept",
    },
  });
  const imagePublish = await prisma.permission.upsert({
    where: { Code: "IMAGE_PUBLISH" },
    update: {
      Value: 60,
      Description: "Publikovat obrázky",
    },
    create: {
      Code: "IMAGE_PUBLISH",
      Value: 60,
      Description: "Publikovat obrázky",
    },
  });
  const imageDelete = await prisma.permission.upsert({
    where: { Code: "IMAGE_DELETE" },
    update: {
      Value: 61,
      Description: "Mazat obrázky",
    },
    create: {
      Code: "IMAGE_DELETE",
      Value: 61,
      Description: "Mazat obrázky",
    },
  });
  const commentPublish = await prisma.permission.upsert({
    where: { Code: "COMMENT_PUBLISH" },
    update: {
      Value: 70,
      Description: "Publikovat komentáře",
    },
    create: {
      Code: "COMMENT_PUBLISH",
      Value: 70,
      Description: "Publikovat komentáře",
    },
  });
  const commentDelete = await prisma.permission.upsert({
    where: { Code: "COMMENT_DELETE" },
    update: {
      Value: 71,
      Description: "Mazat komentáře",
    },
    create: {
      Code: "COMMENT_DELETE",
      Value: 71,
      Description: "Mazat komentáře",
    },
  });
  const ratingPublish = await prisma.permission.upsert({
    where: { Code: "RATING_PUBLISH" },
    update: {
      Value: 80,
      Description: "Publikovat hodnocení",
    },
    create: {
      Code: "RATING_PUBLISH",
      Value: 80,
      Description: "Publikovat hodnocení",
    },
  });
  const ticketView = await prisma.permission.upsert({
    where: { Code: "TICKET_VIEW" },
    update: {
      Value: 90,
      Description: "Zobrazit tikety podpory",
    },
    create: {
      Code: "TICKET_VIEW",
      Value: 90,
      Description: "Zobrazit tikety podpory",
    },
  });
  const ticketManage = await prisma.permission.upsert({
    where: { Code: "TICKET_MANAGE" },
    update: {
      Value: 91,
      Description: "Spravovat tikety",
    },
    create: {
      Code: "TICKET_MANAGE",
      Value: 91,
      Description: "Spravovat tikety",
    },
  });
  const settingsEdit = await prisma.permission.upsert({
    where: { Code: "SETTINGS_EDIT" },
    update: {
      Value: 100,
      Description: "Spravovat nastavení systému",
    },
    create: {
      Code: "SETTINGS_EDIT",
      Value: 100,
      Description: "Spravovat nastavení systému",
    },
  });
  console.log({
    userView,
    userEdit,
    userDelete,
    roleAssign,
    permissionEdit,
    logView,
    postApprove,
    recipePublish,
    recipeEdit,
    recipeDelete,
    imagePublish,
    imageDelete,
    commentPublish,
    commentDelete,
    ratingPublish,
    ticketView,
    ticketManage,
    settingsEdit,
  });

  // Vytváření RolePermission a přiřazení pro každou roli
  const allRoles = await prisma.userRoleType.findMany();
  const allPermissions = await prisma.permission.findMany();

  const getRoleId = (code) =>
    allRoles.find((r) => r.Code === code)?.IdUserRoleType;

  const getPermissionId = (code) =>
    allPermissions.find((p) => p.Code === code)?.IdPermission;

  // Mapování rolí na oprávnění
  const rolePermissionMap = {
    SUPER_ADMIN: [
      userView.Code,
      userEdit.Code,
      userDelete.Code,
      roleAssign.Code,
      permissionEdit.Code,
      logView.Code,
      postApprove.Code,
      ticketView.Code,
      ticketManage.Code,
      settingsEdit.Code,
    ],
    ADMIN: [
      userView.Code,
      userEdit.Code,
      roleAssign.Code,
      permissionEdit.Code,
      logView.Code,
      ticketView.Code,
      ticketManage.Code,
    ],
    MODERATOR: [
      postApprove.Code,
      ticketView.Code,
      commentDelete.Code,
      recipeDelete.Code,
    ],
    SUPPORT: [ticketView.Code, ticketManage.Code],
    EDITOR: [
      recipePublish.Code,
      recipeEdit.Code,
      recipeDelete.Code,
      imagePublish.Code,
      imageDelete.Code,
      commentPublish.Code,
      ratingPublish.Code,
    ],
    AUDITOR: [userView.Code, logView.Code],
  };

  for (const [roleCode, permissionCodes] of Object.entries(rolePermissionMap)) {
    const roleId = getRoleId(roleCode);
    if (!roleId) {
      console.warn(`Role not found: ${roleCode}`);
      continue;
    }

    for (const permissionCode of permissionCodes) {
      const permissionId = getPermissionId(permissionCode);
      if (!permissionId) {
        console.warn(`Permission not found: ${permissionCode}`);
        continue;
      }

      await prisma.rolePermission.upsert({
        where: {
          IdUserRoleType_IdPermission: {
            IdUserRoleType: roleId,
            IdPermission: permissionId,
          },
        },
        update: {},
        create: {
          IdUserRoleType: roleId,
          IdPermission: permissionId,
        },
      });
    }
  }

  // Naplní tabulku pro 1000 uživatelů
  //   for (let i = 0; i < 1000; i++) {
  //     await prisma.user.create({
  //       data: {
  //         Password: faker.internet.password(12),
  //         IsDisabled: faker.datatype.boolean(),
  //         TwoFactor: faker.datatype.boolean(),

  //         UserInfo: {
  //           create: {
  //             UserName: faker.internet.username(),
  //             Email: faker.internet.email(),
  //             Phone: faker.phone.number(),
  //             FirstName: faker.firstName,
  //             LastName: faker.lastName,
  //             ImageUrl: faker.image.avatar(),
  //             EmailVerifiedAt: faker.date.past(),
  //           },
  //         },
  //       },
  //     });
  //   }
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
