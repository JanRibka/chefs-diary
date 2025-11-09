---
description: Refactor React component podle review pravidel
args:
  - name: componentPath
    description: Cesta ke komponentu k refactoringu
    required: false
---

# 🔨 Component Refactoring{{#if componentPath}}: {{componentPath}}{{/if}}

Refactoruj {{#if componentPath}}**{{componentPath}}**{{else}}aktuálně otevřený komponent{{/if}} podle **architecture guidelines** v `rules/architecture-guidelines.md`.

## ⚠️ Scope refactoringu

- Pracuj se stávajícím kódem komponenty a pouze ho reorganizuj podle guidelines.
- Zachovej původní funkcionalitu; nepřidávej nové feature ani nepiš komponentu od nuly.
- Pokud je potřeba multi-file struktura, rozsekej existující logiku do souborů místo psaní nové implementace.

## ⚠️ **STRIKTNÍ INSTRUKCE - DRŽET SE PRAVIDEL**

**VŽDY aplikujte VŠECHNA pravidla z [Architecture Guidelines](../rules/architecture-guidelines.md) - žádné vlastní interpretace nebo zjednodušení!**

- ✅ **Pouze pravidla z guidelines** - ne vlastní úsudek
- ✅ **Plná multi-file struktura** pro všechny komponenty > 30 řádků
- ✅ **Každý typ v samostatném souboru** - žádné `.types.ts` soubory
- ✅ **Všechny adresáře** (hooks/, types/, utils/, constants/) i prázdné
- ✅ **Žádné zjednodušení** - pravidla platí pro VŠECHNY komponenty

## 📋 Reference Guidelines

**DŮLEŽITÉ:** Při refactoringu komponent aplikuj **VŠECHNA** pravidla z:

- 📖 **[Architecture Guidelines](../rules/architecture-guidelines.md)** - **VŽDY NAČTI A STRIKTNĚ DODRŽUJ VŠECHNA PRAVIDLA**
- 🎯 **[Data Colocation Principle](../rules/architecture-guidelines.md#data-colocation-principle)** - hooks a data tam, kde se používají
- 💬 **[Documentation Guidelines](../rules/architecture-guidelines.md#documentation-guidelines)** - JSDoc komentáře a komentáře v kódu
- 🎨 **[Styling Guidelines](../rules/architecture-guidelines.md#styling-guidelines)** - Tailwind CSS, žádné inline styles
- 🧪 **[Testing Guidelines](../rules/architecture-guidelines.md#testing-guidelines)** - struktura testů
- ⚡ **[Performance Guidelines](../rules/architecture-guidelines.md#performance-guidelines)** - memoization, optimalizace

**STRIKTNÍ POKYNY:**

- **VŽDY NAČTI** celý soubor `rules/architecture-guidelines.md` před začátkem refactoringu
- **NEVYMYŠLEJ** vlastní pravidla nebo zjednodušení
- **DODRŽUJ PŘESNĚ** všechny konvence pro názvy souborů a složek
- **KONTROUJ** proti checklistu v guidelines

## 🎯 Refactoring Checklist

**NEOPAKUJ pravidla zde - aplikuj přímo z [Architecture Guidelines](../rules/architecture-guidelines.md#checklist-pro-refactoring)!**

- [ ] **Multi-file struktura** implementována podle Pure Orchestration Pattern?
- [ ] **Data colocation** princip aplikován (hooks tam, kde se používají)?
- [ ] **JSDoc komentáře** a smysluplné komentáře v kódu přítomny?
- [ ] **Performance optimalizace** aplikovány podle pravidel?
- [ ] Prochází `review-component.md` s 8+/10?

---

## 📁 Multi-file Architecture

**Podrobné pravidla viz [Architecture Guidelines](../rules/architecture-guidelines.md#pure-orchestration-pattern-hlavn-princip)**

**NEOPAKUJ pravidla zde - aplikuj přímo z [Architecture Guidelines](../rules/architecture-guidelines.md)!**

---

## 🔧 Refactoring Steps

**Krok 1: Analyze** - identifikuj všechny problémy z review  
**Krok 2: Fix Naming** - přejmenuj podle konvencí  
**Krok 3: Add Types** - doplň všechny missing types  
**Krok 4: Optimize** - přidej memoization kde potřeba  
**Krok 5: Clean** - odstraň duplicity a mrtvý kód  
**Krok 6: Verify** - zkontroluj proti checklistu

---

## 📝 Výstup

Vytvoř refactorovaný komponent který **splňuje všechna pravidla z [Architecture Guidelines](../rules/architecture-guidelines.md)**:

1. **Splňuje všechny body checklistu**
2. **Má multi-file strukturu podle guidelines** (viz [Architecture Guidelines](../rules/architecture-guidelines.md#folder-structure-standards))

**NEUVÁDĚJ konkrétní strukturu zde - použij přímo z [Architecture Guidelines](../rules/architecture-guidelines.md)!**

3. **Každý soubor má specifickou zodpovědnost** (viz [Architecture Guidelines](../rules/architecture-guidelines.md#single-responsibility-principle))

**NEUVÁDĚJ příklady kódu zde - použij přímo z [Architecture Guidelines](../rules/architecture-guidelines.md)!**

4. **Má dokumentaci:**

```tsx
/**
 * BadComponent - popis komponenty
 *
 * @example
 * <BadComponent onChange={handleChange} title="Items" />
 */
```

5. **Splňuje performance kritéria:**
   - React.memo pokud má props
   - useMemo pro výpočty
   - useCallback pro funkce
   - Žádné objekty v renderu

---

## ✅ Verification

Po refactoringu zkontroluj podle **[Architecture Guidelines](../rules/architecture-guidelines.md#checklist-pro-refactoring)**:

- [ ] **Multi-file struktura** implementována podle guidelines?
- [ ] **Data colocation** princip aplikován (hooks tam, kde se používají)?
- [ ] **JSDoc komentáře** a smysluplné komentáře v kódu?
- [ ] **Performance optimalizace** aplikovány podle pravidel?
- [ ] Prochází `review-component.md` s 8+/10?
- [ ] Žádné ESLint warnings?
- [ ] Žádné TypeScript errors?

**Pokud ANO všude → refactoring HOTOV ✅**
