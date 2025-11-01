---
description: Zustand store review
args:
  - name: storePath
    description: Cesta k Zustand store souboru
    required: false
---

# 🐻 Zustand Store Review{{#if storePath}}: {{storePath}}{{/if}}

Review {{#if storePath}}**{{storePath}}**{{else}}aktuálně otevřeného Zustand store{{/if}}.

## 🎯 Kontroluj

**Naming:** camelCase `use{Feature}Store`, state properties descriptive, actions verb-based (`setUser`, `updateSettings`, `resetStore`), selectors `select{Property}`

**TypeScript:** Strongly typed state interface, typed actions, proper return types, generic `StoreApi<T>`, NO `any`

**Structure:** Flat state (avoid deep nesting), actions co-located with state, selectors separate or inline, proper state shape

**Actions:** Pure updates via `set/get`, immutable updates (spread operator), batch updates where needed, async actions properly handled

**Selectors:** Shallow selectors for performance, computed values via selectors, memoization with `useShallow`, avoid selecting entire state

**Performance:** Slice pattern for large stores, selective subscriptions, `persist` middleware properly configured, devtools in dev only

**Side Effects:** Async actions in store actions (not components), proper error handling, loading states, optimistic updates where appropriate

**Persistence:** `persist` middleware config (storage, partialize, merge), migration strategy, sensitive data NOT persisted

**DevTools:** `devtools` middleware in dev, meaningful action names, proper store name

**Testing:** Store testable without React, actions unit testable, state transformations predictable

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
