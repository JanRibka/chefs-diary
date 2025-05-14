import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // Vytváření rolí
  const auditor = await prisma.userRoleType.upsert({
    where: { Code: "AUDITOR" },
    update: {
      Value: 765,
      Description: "Auditor",
    },
    create: {
      Code: "AUDITOR",
      Value: 765,
      Description: "Auditor",
    },
  });

  const support = await prisma.userRoleType.upsert({
    where: { Code: "SUPPORT" },
    update: {
      Value: 1468,
      Description: "Podpora",
    },
    create: {
      Code: "SUPPORT",
      Value: 1468,
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
      Value: 9821,
      Description: "Super administrátor",
    },
    create: {
      Code: "SUPER_ADMIN",
      Value: 9821,
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
      Value: 4,
      Description: "Přiřazovat role",
    },
    create: {
      Code: "ROLE_ASSIGN",
      Value: 4,
      Description: "Přiřazovat role",
    },
  });
  const permissionEdit = await prisma.permission.upsert({
    where: { Code: "PERMISSION_EDIT" },
    update: {
      Value: 5,
      Description: "Správa oprávnění",
    },
    create: {
      Code: "PERMISSION_EDIT",
      Value: 5,
      Description: "Správa oprávnění",
    },
  });
  const logView = await prisma.permission.upsert({
    where: { Code: "LOG_VIEW" },
    update: {
      Value: 6,
      Description: "Zobrazit systémové logy",
    },
    create: {
      Code: "LOG_VIEW",
      Value: 6,
      Description: "Zobrazit systémové logy",
    },
  });
  const postApprove = await prisma.permission.upsert({
    where: { Code: "POST_APPROVE" },
    update: {
      Value: 7,
      Description: "Schválit příspěvek",
    },
    create: {
      Code: "POST_APPROVE",
      Value: 7,
      Description: "Schválit příspěvek",
    },
  });
  const contentEdit = await prisma.permission.upsert({
    where: { Code: "CONTENT_EDIT" },
    update: {
      Value: 8,
      Description: "Upravit obsah (texty, články...)",
    },
    create: {
      Code: "CONTENT_EDIT",
      Value: 8,
      Description: "Upravit obsah (texty, články...)",
    },
  });
  const ticketView = await prisma.permission.upsert({
    where: { Code: "TICKET_VIEW" },
    update: {
      Value: 9,
      Description: "Zobrazit tikety podpory",
    },
    create: {
      Code: "TICKET_VIEW",
      Value: 9,
      Description: "Zobrazit tikety podpory",
    },
  });
  const ticketManage = await prisma.permission.upsert({
    where: { Code: "TICKET_MANAGE" },
    update: {
      Value: 10,
      Description: "Spravovat tikety",
    },
    create: {
      Code: "TICKET_MANAGE",
      Value: 10,
      Description: "Spravovat tikety",
    },
  });
  const settingsEdit = await prisma.permission.upsert({
    where: { Code: "SETTINGS_EDIT" },
    update: {
      Value: 11,
      Description: "Spravovat nastavení systému",
    },
    create: {
      Code: "SETTINGS_EDIT",
      Value: 11,
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
    contentEdit,
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
  //TODO: Pridat vsechny role a opravneni udelat podle userView. a Zkonztrolovat hodnoty v tabulce podle userROle
  //TODO: Pridat dze meho uzivatele a pridat mu superAdmin roli

  // Mapování rolí na oprávnění
  const rolePermissionMap = {
    SUPER_ADMIN: [
      userView.Code,
      "USER_EDIT",
      "USER_DELETE",
      "TICKET_VIEW",
      "TICKET_MANAGE",
      "CONTENT_EDIT",
      "ROLE_ASSIGN",
      "PERMISSION_EDIT",
      "LOG_VIEW",
      "POST_APPROVE",
      "SETTINGS_EDIT",
    ],
    ADMIN: [
      "USER_VIEW",
      "USER_EDIT",
      "ROLE_ASSIGN",
      "CONTENT_EDIT",
      "TICKET_VIEW",
    ],
    SUPPORT: ["TICKET_VIEW", "TICKET_MANAGE"],
    MODERATOR: ["POST_APPROVE", "TICKET_VIEW"],
    EDITOR: ["CONTENT_EDIT"],
    AUDITOR: ["LOG_VIEW", "USER_VIEW"],
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

//   Tady je praktický návrh rolí pro administraci (ADMIN) včetně jejich práv, které můžeš snadno škálovat a integrovat do svého systému pomocí modelů jako UserRoleType, Permission, RolePermission, apod.

// 1. Přehled rolí pro administraci
// Role kód (Code)	Název (Description)	Popis
// SUPER_ADMIN	Super administrátor	Má všechna práva – správa uživatelů, systémová nastavení, logy
// ADMIN	Administrátor	Správa obsahu a běžná správa uživatelů
// MODERATOR	Moderátor	Schvaluje příspěvky, řeší nahlášení
// EDITOR	Editor	Vytváří a upravuje obsah (např. články, popisy)
// SUPPORT	Podpora	Má přístup ke klientům, může řešit tikety
// AUDITOR	Auditor	Jen čte – přístup k logům a přehledům, ale nemůže nic měnit

// 2. Návrh oprávnění (permissions)
// Každé oprávnění (permission) bude záznam v tabulce Permission, např.:

// Kód	Popis
// USER_VIEW	Zobrazit uživatele
// USER_EDIT	Upravit uživatele
// USER_DELETE	Smazat uživatele
// ROLE_ASSIGN	Přiřazovat role
// PERMISSION_EDIT	Správa oprávnění
// LOG_VIEW	Zobrazit systémové logy
// POST_APPROVE	Schválit příspěvek
// CONTENT_EDIT	Upravit obsah (texty, články...)
// TICKET_VIEW	Zobrazit tikety podpory
// TICKET_MANAGE	Spravovat tikety
// SETTINGS_EDIT	Spravovat nastavení systému

//  3. Mapování rolí na oprávnění (RolePermission)
// Např.:

//  SUPER_ADMIN
// Všechna práva

// ADMIN
// USER_VIEW, USER_EDIT, ROLE_ASSIGN, CONTENT_EDIT, TICKET_VIEW

//  MODERATOR
// POST_APPROVE, TICKET_VIEW

// EDITOR
// CONTENT_EDIT

// SUPPORT
// TICKET_VIEW, TICKET_MANAGE

// AUDITOR
// LOG_VIEW, USER_VIEW

// 4. Ukázka seed dat pro UserRoleType
// ts
// Zkopírovat
// Upravit
// [
//   { code: "SUPER_ADMIN", value: 100, description: "Super administrátor" },
//   { code: "ADMIN", value: 90, description: "Administrátor" },
//   { code: "MODERATOR", value: 70, description: "Moderátor" },
//   { code: "EDITOR", value: 60, description: "Editor" },
//   { code: "SUPPORT", value: 50, description: "Podpora" },
//   { code: "AUDITOR", value: 10, description: "Audit" }
// ]
// A pro Permission:

// ts
// Zkopírovat
// Upravit
// [
//   { code: "USER_VIEW", description: "Zobrazit uživatele" },
//   { code: "USER_EDIT", description: "Upravit uživatele" },
//   ...
// ]
// A nakonec pro RolePermission:

// ts
// Zkopírovat
// Upravit
// [
//   { role: "SUPER_ADMIN", permission: "*" }, // nebo vkládat všechny ručně
//   { role: "ADMIN", permission: "USER_VIEW" },
//   { role: "ADMIN", permission: "USER_EDIT" },
//   ...
// ]
// 5. Jak to ověřovat v kódu
// V serverové funkci:

// ts
// Zkopírovat
// Upravit
// const session = await auth();
// const hasPermission = await db.rolePermission.findFirst({
//   where: {
//     permission: { code: "USER_EDIT" },
//     userRoleType: {
//       userRoles: {
//         some: { userId: session.user.id }
//       }
//     }
//   }
// });

// if (!hasPermission) {
//   return new Response("Unauthorized", { status: 403 });
// }

// Pokud je uživatel SUPER_ADMIN má smysl mu přiřazovat i ostatní role?

// ChatGPT řekl:
// Obecně nemá smysl přiřazovat uživateli s rolí SUPER_ADMIN i ostatní role, pokud platí následující:

//  SUPER_ADMIN má absolutní práva (superset všeho)
// Například:

// Vidí a upravuje všechny záznamy.

// Může spravovat uživatele, role, oprávnění.

// Má přístup ke všem modulům a funkcím systému.

// V tom případě je zbytečné přidávat mu například ADMIN, SUPPORT, OWNER apod., protože:

// Role jsou nadbytečné – SUPER_ADMIN vše už pokrývá.

// Zvyšuje to komplexitu – musíš řešit duplicitní záznamy v tabulce UserRole.

// Hrozí chybné chování – pokud kontroluješ více rolí najednou (např. přes .some()), můžeš nechtěně spustit logiku určenou jen pro běžné role.

// Jak to udělat lépe?
// Místo přiřazování více rolí:

// V databázi u UserRoleType nastav SUPER_ADMIN jako roli s nejvyšší prioritou.

// Ve funkci kontroly práv (např. hasPermission(user, "edit_users")) ověř:

// Pokud má roli SUPER_ADMIN → vrátí true pro všechna oprávnění.

// Jinak se kontrolují klasická oprávnění přes RolePermission.

// Výjimka
// Přidávání více rolí k SUPER_ADMIN může mít smysl, pokud role ovlivňují viditelnost nebo filtrování dat, a SUPER_ADMIN má být schopný přepínat kontext (např. chovat se jako SUPPORT pro testování).

// Ale to už je pokročilá logika, a v tom případě by bylo lepší to řešit jiným mechanismem než běžným přiřazením role.

// Chceš-li, můžu ti navrhnout i logiku hasPermission() nebo strukturu UserRoleType a RolePermission.

// Řekl/a jsi:
// Takže administrátorskou roli bych mě kontrolovat pouze při přihlášení do administrace a pro různé akce už pak kontrolovat oprávnění daného uživatele?

// ChatGPT řekl:
// Ano, přesně tak – to je osvědčený přístup. Můžeš to rozdělit následovně:

// 1. Kontrola role při přihlášení do administrace
// Při vstupu do administrace (např. /admin):

// Ověříš, jestli má uživatel alespoň jednu z administračních rolí:

// SUPER_ADMIN

// ADMIN

// OWNER

// SUPPORT

// Pokud žádnou nemá, redirect na login nebo stránku s chybou oprávnění (403).

// Tím omezíš vstup do administrace jen pro vybrané uživatele.

// 2. Kontrola oprávnění (permissions) pro konkrétní akce uvnitř administrace
// U každé citlivé akce nebo komponenty (např. smazání uživatele, export, správa oprávnění):

// Ověříš konkrétní oprávnění – např. user.delete, logs.view, client.manage.

// Tato oprávnění jsou odvozená od přiřazených rolí skrze např. RolePermission tabulku.

// Výhody:

// Můžeš mít jemnozrnnou kontrolu.

// ADMIN může mít jiná práva než SUPPORT, i když oba mohou do adminu.

// SUPER_ADMIN může automaticky dostávat všechna práva bez nutnosti výčtu.

// Příklad v praxi
// ts
// Zkopírovat
// Upravit
// function canAccessAdmin(user: User) {
//   return user.roles.some(role =>
//     ['SUPER_ADMIN', 'ADMIN', 'SUPPORT', 'OWNER'].includes(role.code)
//   );
// }

// function hasPermission(user: User, permissionCode: string) {
//   // Pokud je SUPER_ADMIN, má všechna práva
//   if (user.roles.some(r => r.code === 'SUPER_ADMIN')) return true;

//   // Jinak kontrola přes RolePermission
//   return user.permissions.includes(permissionCode);
// }
// Chceš-li, mohu ti pomoci s návrhem datového modelu nebo helper funkcí (hasRole, hasPermission) podle toho, jak strukturuješ oprávnění.
