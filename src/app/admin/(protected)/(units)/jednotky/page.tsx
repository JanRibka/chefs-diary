import PageContentSection from "@/components/admin/pageContentSection/PageContentSection";
import UnitsTable from "@/components/admin/unitsTable/UnitsTable";
import { UnitsTableContextProvider } from "@/components/admin/unitsTable/UnitsTableContext";
import { getAllUnits } from "@/lib/services/unitsService";

export default function UnitsPage() {
  const dataPromise = getAllUnits();

  return (
    <PageContentSection className="flex-1">
      <UnitsTableContextProvider>
        <UnitsTable dataPromise={dataPromise} />
      </UnitsTableContextProvider>
    </PageContentSection>
  );
}

// Jakm mám potom v administraci tyto jednotky a skupiny plnit?

// ChatGPT řekl:
// Skvělá otázka. Zde je jednoduchý návrh, jak v administraci spravovat jednotky a jejich skupiny (včetně převodů):

// 🔧 1. Modely, se kterými pracujeme
// Z předchozího návrhu:

// prisma
// Zkopírovat
// Upravit
// model UnitGroup {
//   id    Int    @id @default(autoincrement())
//   name  String @unique // např. "Hmotnost", "Objem", "Stroužky"
//   units Unit[]
// }

// model Unit {
//   id          Int         @id @default(autoincrement())
//   name        String      @unique // např. "g", "kg", "stroužek"
//   displayName String      // např. "gramy", "kilogramy", "stroužky"
//   groupId     Int
//   group       UnitGroup   @relation(fields: [groupId], references: [id])
//   fromConversions UnitConversion[] @relation("FromUnit")
//   toConversions   UnitConversion[] @relation("ToUnit")
// }

// model UnitConversion {
//   id         Int    @id @default(autoincrement())
//   fromUnit   Unit   @relation("FromUnit", fields: [fromUnitId], references: [id])
//   fromUnitId Int
//   toUnit     Unit   @relation("ToUnit", fields: [toUnitId], references: [id])
//   toUnitId   Int
//   multiplier Float  // např. 1000 (z kg na g)
// }
// 🧩 2. Jak by měla vypadat administrace
// A. Správa skupin (UnitGroup)
// Stránka: /admin/unit-groups

// Možnosti:

// Seznam existujících skupin

// Tlačítko „Přidat skupinu“ (formulář: název skupiny)

// Možnost „Upravit“ / „Smazat“

// B. Správa jednotek (Unit)
// Stránka: /admin/units

// Formulář:

// Název jednotky (např. kg)

// Zobrazovaný název (např. kilogramy)

// Skupina (select z UnitGroup)

// Možnost „Přidat“ / „Upravit“ / „Smazat“

// C. Správa převodů (UnitConversion)
// Stránka: /admin/unit-conversions

// Formulář:

// Z jednotky (select z Unit)

// Do jednotky (select z Unit)

// Koeficient (float, např. 1000)

// Poznámka: Měl bys kontrolovat, že převod je pouze jednosměrný (nebo automaticky vytvořit opačný převod, pokud to chceš).

// ✅ 3. Možnosti zjednodušení (bonus)
// Můžeš v administraci filtrovat jednotky podle skupiny.

// Můžeš automaticky generovat převody v rámci skupiny (např. 1 kg = 1000 g, 1 g = 0.001 kg).

// Můžeš mít i checkbox „použít při malém množství“ (např. použít „stroužky“ pro množství do 10).

// 📦 Příklad seed dat
// ts
// Zkopírovat
// Upravit
// await prisma.unitGroup.create({
//   data: {
//     name: "Hmotnost",
//     units: {
//       create: [
//         { name: "g", displayName: "gramy" },
//         { name: "kg", displayName: "kilogramy" },
//       ],
//     },
//   },
// });

// await prisma.unitConversion.createMany({
//   data: [
//     { fromUnitId: 1, toUnitId: 2, multiplier: 0.001 },
//     { fromUnitId: 2, toUnitId: 1, multiplier: 1000 },
//   ],
// });
// Chceš, abych ti připravil i základní seed skript nebo admin formulář pro Next.js?

// Řekl/a jsi:
// Ano

// ChatGPT řekl:
// Skvěle, pojďme si nastavit způsob, jak plnit jednotky a jejich skupiny do databáze v administraci (např. pomocí seedu nebo admin UI).

// 🧱 1. Struktura databáze
// Předpokládejme tuto strukturu (vychází z předchozí diskuze):

// prisma
// Zkopírovat
// Upravit
// model UnitGroup {
//   id         Int     @id @default(autoincrement())
//   name       String  @unique
//   units      Unit[]
// }

// model Unit {
//   id              Int        @id @default(autoincrement())
//   name            String     @unique      // např. "g"
//   displayName     String                  // např. "gramy"
//   pluralName      String?                 // např. "gram"
//   conversionToBase Float?                // např. 1, 1000 (g to kg)
//   isBase          Boolean    @default(false)
//   groupId         Int
//   group           UnitGroup  @relation(fields: [groupId], references: [id])
// }
// ⚙️ 2. Seed script v prisma/seed.ts
// Naplnění dat při startu:

// ts
// Zkopírovat
// Upravit
// import { PrismaClient } from "@prisma/client";

// const prisma = new PrismaClient();

// async function seed() {
//   const massGroup = await prisma.unitGroup.upsert({
//     where: { name: "Hmotnost" },
//     update: {},
//     create: {
//       name: "Hmotnost",
//       units: {
//         create: [
//           { name: "g", displayName: "gramy", pluralName: "gram", isBase: true, conversionToBase: 1 },
//           { name: "kg", displayName: "kilogramy", pluralName: "kilogram", conversionToBase: 1000 },
//           { name: "mg", displayName: "miligramy", pluralName: "miligram", conversionToBase: 0.001 },
//         ],
//       },
//     },
//   });

//   const cloveGroup = await prisma.unitGroup.upsert({
//     where: { name: "Stroužky" },
//     update: {},
//     create: {
//       name: "Stroužky",
//       units: {
//         create: [
//           { name: "stroužek", displayName: "stroužek", pluralName: "stroužky", isBase: true, conversionToBase: 1 },
//           { name: "stroužků", displayName: "stroužků", pluralName: "stroužků", conversionToBase: 1 },
//         ],
//       },
//     },
//   });

//   console.log("Jednotky a skupiny úspěšně naplněny.");
// }

// seed()
//   .catch(console.error)
//   .finally(() => prisma.$disconnect());
// 🧑‍💻 3. Plnění z administrace
// V admin UI:

// Měj sekci „Skupiny jednotek“ a „Jednotky“.

// V UI pro jednotku:

// Výběr skupiny (dropdown)

// Název jednotky (name)

// Zobrazovaný název (displayName)

// Plurál (pluralName)

// Checkbox „Je základní“

// Konverze na základní jednotku (conversionToBase)

// Při přidání nové jednotky do skupiny můžeš snadno udělat převodní vztahy.

// Chceš, abych ti připravil React komponentu/formulář pro přidávání těchto jednotek a skupin v administraci?
