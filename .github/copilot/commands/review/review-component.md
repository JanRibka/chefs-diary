---
description: React component code review
args:
  - name: componentPath
    description: Cesta ke komponentu
    required: false
---

# 🔍 Component Review{{#if componentPath}}: {{componentPath}}{{/if}}

Review {{#if componentPath}}**{{componentPath}}**{{else}}aktuálně otevřeného souboru{{/if}} podle **architecture guidelines** v `rules/architecture-guidelines.md`.

## ⚠️ **STRIKTNÍ INSTRUKCE - DRŽET SE PRAVIDEL**

**VŽDY aplikujte VŠECHNA pravidla z [Architecture Guidelines](../rules/architecture-guidelines.md) - žádné vlastní interpretace nebo zjednodušení!**

- ✅ **Pouze pravidla z guidelines** - ne vlastní úsudek
- ✅ **Plná multi-file struktura** pro všechny komponenty > 30 řádků
- ✅ **Každý typ v samostatném souboru** - žádné `.types.ts` soubory
- ✅ **Všechny adresáře** (hooks/, types/, utils/, constants/) i prázdné
- ✅ **Žádné zjednodušení** - pravidla platí pro VŠECHNY komponenty

## 📋 Reference Guidelines

**DŮLEŽITÉ:** Při review komponent aplikuj **VŠECHNA** pravidla z:

- 📖 **[Architecture Guidelines](../rules/architecture-guidelines.md)** - **VŽDY NAČTI A STRIKTNĚ DODRŽUJ VŠECHNA PRAVIDLA**
- 🎯 **[Data Colocation Principle](../rules/architecture-guidelines.md#data-colocation-principle)** - hooks a data tam, kde se používají
- 💬 **[Documentation Guidelines](../rules/architecture-guidelines.md#documentation-guidelines)** - JSDoc komentáře a komentáře v kódu
- 🎨 **[Styling Guidelines](../rules/architecture-guidelines.md#styling-guidelines)** - Tailwind CSS, žádné inline styles
- 🧪 **[Testing Guidelines](../rules/architecture-guidelines.md#testing-guidelines)** - struktura testů
- ⚡ **[Performance Guidelines](../rules/architecture-guidelines.md#performance-guidelines)** - memoization, optimalizace

**STRIKTNÍ POKYNY:**

- **VŽDY NAČTI** celý soubor `rules/architecture-guidelines.md` před začátkem review
- **NEVYMYŠLEJ** vlastní pravidla nebo zjednodušení
- **DODRŽUJ PŘESNĚ** všechny konvence pro názvy souborů a složek
- **KONTROUJ** proti checklistu v guidelines

## 🎯 Kontroluj

**NEOPAKUJ pravidla zde - aplikuj přímo z [Architecture Guidelines](../rules/architecture-guidelines.md)!**

- [ ] **Multi-file struktura** implementována podle Pure Orchestration Pattern?
- [ ] **Data colocation** princip aplikován (hooks tam, kde se používají)?
- [ ] **JSDoc komentáře** a smysluplné komentáře v kódu přítomny?
- [ ] **Performance optimalizace** aplikovány podle pravidel?
- [ ] **Posuzované změny zachovávají existující chování** (žádné přepisování od nuly)?
- [ ] Prochází `review-component.md` s 8+/10?

## 📊 Výstup

**Skóre:** [X]/10 (Naming [X], TypeScript [X], React [X], Performance [X], UI [X], Architecture [X])

**Problémy:** 🔴 [X] kritické | 🟡 [X] varování | 🔵 [X] návrhy

**TOP 3:**

1. 🔴 [Problém] - [dopad]
2. 🟡 [Problém] - [dopad]
3. 🔵 [Návrh] - [benefit]
4. 🏗️ [Architecture] - [multi-file structure needed?]

**Detaily:** Pro každý problém uveď:

- Co je špatně + proč to vadí
- Jak opravit (konkrétní kroky)
- Čas na fix
- Kód před/po

**Memoization:**

- [ ] React.memo kde? priorita?
- [ ] useMemo kde? priorita?
- [ ] useCallback kde? priorita?

**Akce:**

- 🔴 ASAP: [úkol] - [čas]
- 🟡 Týden: [úkol] - [čas]
- 🔵 Později: [úkol] - [čas]

**Architecture Check:**

- [ ] Komponenta > 100 řádků? → rozdělit do multi-file struktury
- [ ] Business logic v custom hooks?
- [ ] Každý typ v samostatném souboru v types/ adresáři?
- [ ] Single responsibility per file?

## 💡 Pravidla

Buď konkrétní, ukazuj kód, vysvětluj proč, prioritizuj, měř dopad

**NEOPAKUJ pravidla zde - aplikuj přímo z [Architecture Guidelines](../rules/architecture-guidelines.md)!**
