---
description: Zustand store review
args:
  - name: storePath
    description: Cesta k Zustand store souboru
    required: false
---

# 🐻 Zustand Store Review{{#if storePath}}: {{storePath}}{{/if}}

## ⚠️ **STRIKTNÍ INSTRUKCE - DRŽET SE PRAVIDEL**

**VŽDY aplikujte VŠECHNA pravidla z [Architecture Guidelines](../rules/architecture-guidelines.md) - žádné vlastní interpretace nebo zjednodušení!**

- ✅ **Pouze pravidla z guidelines** - ne vlastní úsudek
- ✅ **Žádné zjednodušení** - pravidla platí pro VŠECHNY Zustand stores

Review {{#if storePath}}**{{storePath}}**{{else}}aktuálně otevřeného Zustand store{{/if}} podle **architecture guidelines** v `rules/architecture-guidelines.md`.

## 📋 Reference Guidelines

**DŮLEŽITÉ:** Při review Zustand stores aplikuj **VŠECHNA** pravidla z:

- **[Performance Guidelines](../rules/architecture-guidelines.md#performance-guidelines)** - Selective subscriptions, shallow selectors, useShallow
- **[Error Handling Patterns](../rules/architecture-guidelines.md#error-handling-patterns)** - Typed errors, loading states, proper async handling
- **[Documentation Guidelines](../rules/architecture-guidelines.md#documentation-guidelines)** - JSDoc dokumentace pro store a selectors

## 🎯 Kontroluj

**NEOPAKUJ pravidla zde - aplikuj přímo z [Architecture Guidelines](../rules/architecture-guidelines.md)!**

- [ ] **Immutable updates** (spread operator, no direct mutations)?
- [ ] **Selective subscriptions** a shallow selectors?
- [ ] **Proper error handling** a loading states?
- [ ] **Persist only non-sensitive data**?
- [ ] **DevTools configured properly** (dev only)?
- [ ] **Posuzované změny zachovávají existující chování** store?
- [ ] Prochází `review-zustand.md` s 8+/10?

## 📊 Výstup

**Skóre:** [X]/10 (Naming [X], TypeScript [X], Structure [X], Actions [X], Selectors [X], Performance [X], Side Effects [X])

**Problémy:** 🔴 [X] kritické | 🟡 [X] varování | 🔵 [X] návrhy

**TOP 3:**

1. 🔴 [Problém] - [state mutation/memory leak/performance dopad]
2. 🟡 [Problém] - [inefficient selectors/missing types dopad]
3. 🔵 [Návrh] - [slicing/middleware benefit]

**Detaily:** Pro každý problém:

- Co je špatně + proč (mutations, re-renders, type safety)
- Jak opravit (konkrétní kroky)
- Čas na fix
- Kód před/po

**Critical checks:**

- [ ] NO direct state mutations (always use `set`)
- [ ] Immutable updates (spread operator)
- [ ] Typed state interface
- [ ] Selective subscriptions (not entire state)
- [ ] Async actions with error handling
- [ ] Persist only non-sensitive data

**Performance:**

- [ ] Shallow selectors used
- [ ] `useShallow` for multiple values
- [ ] Slice pattern for large stores
- [ ] Minimal re-renders

**Akce:**

- 🔴 ASAP: [úkol] - [state mutation/memory leak]
- 🟡 Týden: [úkol] - [performance/types]
- 🔵 Později: [úkol] - [optimization/devtools]

## 💡 Pravidla

Kontroluj immutability (NO mutations!), zaměř se na selective subscriptions (performance), vysvětluj re-render impact, prioritizuj podle severity
