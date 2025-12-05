---
description: Refactor stylů podle styling pravidel
args:
  - name: componentPath
    description: Cesta ke komponentu k refactoringu stylů
    required: false
---

# 🎨 Styles Refactoring{{#if componentPath}}: {{componentPath}}{{/if}}

Refactoruj styly v {{#if componentPath}}**{{componentPath}}**{{else}}aktuálně otevřeném komponentu{{/if}} podle **styling guidelines** v `rules/styling-guidelines.md`.

## ⚠️ Scope refactoringu

- Pracuj se stávajícím kódem - pouze reorganizuj styly podle guidelines
- Zachovej původní vizuální výstup - žádné změny v UI
- Převeď složité className na tailwind-variants
- Extrahuj opakující se styly do utils/constants

## ⚠️ **STRIKTNÍ INSTRUKCE - DRŽET SE PRAVIDEL**

**VŽDY aplikujte VŠECHNA pravidla z [Styling Guidelines](../rules/styling-guidelines.md) - žádné vlastní interpretace!**

- ✅ **Pouze pravidla z guidelines** - ne vlastní úsudek
- ✅ **tailwind-variants pro složité styly** - více než 5 tříd nebo podmínky
- ✅ **mergeStyles() pro slučování** - ne string concatenation
- ✅ **Extrahuj opakující se styly** - do konstant nebo utils
- ✅ **Žádné inline object styles** - pouze Tailwind classes

## 📋 Reference Guidelines

**DŮLEŽITÉ:** Při refactoringu stylů aplikuj **VŠECHNA** pravidla z:

- 📖 **[Styling Guidelines](../rules/styling-guidelines.md)** - **VŽDY NAČTI A STRIKTNĚ DODRŽUJ**
- 🎯 **[Kdy použít jaký přístup](../rules/styling-guidelines.md#-kdy-použít-jaký-přístup)** - inline vs tailwind-variants vs utils
- ✨ **[Tailwind Variants](../rules/styling-guidelines.md#-tailwind-variants)** - tv() patterns
- 🔧 **[mergeStyles utility](../rules/styling-guidelines.md#-mergestyles-utility)** - slučování tříd
- ❌ **[Anti-patterns](../rules/styling-guidelines.md#-anti-patterns---co-nedělat)** - co se nesmí dělat
- ✅ **[Best Practices](../rules/styling-guidelines.md#-best-practices)** - doporučené postupy

**STRIKTNÍ POKYNY:**

- **VŽDY NAČTI** celý soubor `rules/styling-guidelines.md` před začátkem refactoringu
- **NEVYMYŠLEJ** vlastní pravidla nebo zjednodušení
- **DODRŽUJ PŘESNĚ** všechny konvence pro tailwind-variants a mergeStyles

## 🎯 Refactoring Checklist

**Aplikuj checklist přímo z [Styling Guidelines](../rules/styling-guidelines.md#-checklist-pro-styling)**

- [ ] **Dlouhé className** (>5 tříd) převedeny na tailwind-variants?
- [ ] **Ternary v className** převedeny na tailwind-variants?
- [ ] **String concatenation** nahrazeno mergeStyles()?
- [ ] **Opakující se styly** extrahovány do konstant?
- [ ] **Inline object styles** odstraněny (nebo zdůvodněny)?
- [ ] **Props className vždy poslední** v mergeStyles()?
- [ ] **defaultVariants definovány** pro všechny tailwind-variants?
- [ ] Prochází všechny body z styling-guidelines.md?

---

## 🔧 Refactoring Steps

### Krok 1: Analyze (Analýza)

Identifikuj problémy podle [Anti-patterns](../rules/styling-guidelines.md#-anti-patterns---co-nedělat):

1. **Dlouhé className** - více než 5 tříd
2. **Podmíněné styly** - ternary, &&, podmínky
3. **String concatenation** - template literals s ${}
4. **Opakující se styly** - stejné patterns
5. **Inline object styles** - style={{ ... }}

### Krok 2: Plan (Plánování)

- **Navrhni tailwind-variants** - pro složité/podmíněné styly
- **Definuj konstanty** - pro opakující se styly
- **Urči umístění** - styles/ nebo constants/
- **Naplánuj mergeStyles** - kde je potřeba slučování

### Krok 3: Implement (Implementace)

Následuj příklady a patterns z [Styling Guidelines](../rules/styling-guidelines.md):

1. **Vytvoř tailwind-variants** v styles/componentVariants.ts
2. **Extrahuj konstanty** do constants/styleConfig.ts
3. **Nahraď className** podle [Best Practices](../rules/styling-guidelines.md#-best-practices)
4. **Použij mergeStyles()** podle [mergeStyles utility](../rules/styling-guidelines.md#-mergestyles-utility)

### Krok 4: Verify (Ověření)

1. **Zkontroluj vizuální výstup** - UI vypadá stejně
2. **Validuj strukturu** proti [Styling Guidelines](../rules/styling-guidelines.md)
3. **Ověř žádné inline styles** - kromě dynamických hodnot
4. **Test interakce** - hover, active, focus states
5. **Projdi checklist** z [Styling Guidelines](../rules/styling-guidelines.md#-checklist-pro-styling)

---

## ✅ Verification

Po refactoringu zkontroluj podle **[Styling Guidelines Checklist](../rules/styling-guidelines.md#-checklist-pro-styling)**:

- [ ] Žádné inline object styles (kromě dynamických hodnot)
- [ ] Žádné dlouhé className (>5 tříd = tailwind-variants)
- [ ] Žádné ternary v className (tailwind-variants)
- [ ] mergeStyles pro slučování - ne string concatenation
- [ ] Props className vždy poslední v mergeStyles()
- [ ] tailwind-variants má defaultVariants
- [ ] Export variant types - VariantProps<typeof ...>
- [ ] Opakující se styly extrahovány
- [ ] Vizuální výstup stejný - UI vypadá identicky
- [ ] Žádné TypeScript errors

**Pokud ANO všude → refactoring HOTOV ✅**

---

## 💡 Rychlý odkaz na příklady

Všechny př íklady transformací najdeš v [Styling Guidelines](../rules/styling-guidelines.md):

- **[Kdy použít jaký přístup](../rules/styling-guidelines.md#-kdy-použít-jaký-přístup)** - rozhodovací kritéria
- **[Tailwind Variants příklady](../rules/styling-guidelines.md#-tailwind-variants)** - kompletní příklady s tv()
- **[Anti-patterns příklady](../rules/styling-guidelines.md#-anti-patterns---co-nedělat)** - co nefunguje
- **[Best Practices příklady](../rules/styling-guidelines.md#-best-practices)** - doporučené postupy
- **[Advanced Patterns](../rules/styling-guidelines.md#-advanced-patterns)** - slots pro komplexní komponenty

---

## 🚨 Časté chyby

**Viz [Styling Guidelines](../rules/styling-guidelines.md#-checklist-pro-styling) pro kompletní seznam**

Nejčastější chyby:

1. Zapomenutí defaultVariants
2. String concatenation místo mergeStyles()
3. Inline styles bez důvodu
4. className není poslední v mergeStyles()
5. Ternary v className místo tailwind-variants

---

## 📚 Další zdroje

- **[Styling Guidelines](../rules/styling-guidelines.md)** - Kompletní pravidla a příklady
- **[tailwind-variants Documentation](https://www.tailwind-variants.org/)** - Oficiální dokumentace
- **[Tailwind CSS](https://tailwindcss.com/docs)** - Tailwind dokumentace
