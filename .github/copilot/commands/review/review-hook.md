---
description: Custom React Hook review
args:
  - name: hookPath
    description: Cesta k custom hooku
    required: false
---

# 🪝 Hook Review{{#if hookPath}}: {{hookPath}}{{/if}}

## ⚠️ **STRIKTNÍ INSTRUKCE - DRŽET SE PRAVIDEL**

**VŽDY aplikujte VŠECHNA pravidla z [Architecture Guidelines](../rules/architecture-guidelines.md) - žádné vlastní interpretace nebo zjednodušení!**

- ✅ **Pouze pravidla z guidelines** - ne vlastní úsudek
- ✅ **Žádné zjednodušení** - pravidla platí pro VŠECHNY hooks

Review {{#if hookPath}}**{{hookPath}}**{{else}}aktuálně otevřeného custom hooku{{/if}} podle **architecture guidelines** v `rules/architecture-guidelines.md`.

## 📋 Reference Guidelines

**DŮLEŽITÉ:** Při review hooks aplikuj **VŠECHNA** pravidla z:

- 🎯 **[Data Colocation Principle](../rules/architecture-guidelines.md#data-colocation-principle)** - hooks tam, kde se používají
- 💬 **[Documentation Guidelines](../rules/architecture-guidelines.md#documentation-guidelines)** - JSDoc komentáře
- 📊 **[Performance Guidelines](../rules/architecture-guidelines.md#performance-guidelines)** - useMemo/useCallback optimalizace
- 🛡️ **[Error Handling Patterns](../rules/architecture-guidelines.md#error-handling-patterns)** - proper error handling, cleanup

## 🎯 Kontroluj

**NEOPAKUJ pravidla zde - aplikuj přímo z [Architecture Guidelines](../rules/architecture-guidelines.md)!**

- [ ] **Data colocation** princip aplikován (hook tam, kde se používá)?
- [ ] **JSDoc komentáře** a smysluplné komentáře v kódu přítomny?
- [ ] **Performance optimalizace** aplikovány podle pravidel?
- [ ] **Proper cleanup** (AbortController, listeners, timers)?
- [ ] **Posuzované změny zachovávají existující API/chování** hooku?
- [ ] Prochází `review-hook.md` s 8+/10?

## 📊 Výstup

**Skóre:** [X]/10 (Naming [X], TypeScript [X], Rules [X], Effects [X], Design [X], Performance [X], Errors [X])

**Problémy:** 🔴 [X] kritické | 🟡 [X] varování | 🔵 [X] návrhy

**TOP 3:**

1. 🔴 [Problém] - [memory leak/rules violation/infinite loop dopad]
2. 🟡 [Problém] - [missing deps/performance dopad]
3. 🔵 [Návrh] - [reusability/optimization benefit]

**Detaily:** Pro každý problém:

- Co je špatně + proč (memory leak, rules violation, infinite loop)
- Jak opravit (konkrétní kroky)
- Čas na fix
- Kód před/po

**Critical checks:**

- [ ] All hooks top-level (no conditional calls)
- [ ] Correct dependencies (no missing deps warnings)
- [ ] Cleanup functions present
- [ ] AbortController for async requests
- [ ] No memory leaks

**Akce:**

- 🔴 ASAP: [úkol] - [memory leak/critical bug]
- 🟡 Týden: [úkol] - [important fix]
- 🔵 Později: [úkol] - [optimization]

## 💡 Pravidla

Kontroluj Rules of Hooks compliance, zaměř se na cleanup/memory leaks, vysvětluj dependency issues, prioritizuj podle severity
