---
description: React Context Provider review
args:
  - name: contextPath
    description: Cesta k Context Provider souboru
    required: false
---

# 🌐 Context Provider Review{{#if contextPath}}: {{contextPath}}{{/if}}

Review {{#if contextPath}}**{{contextPath}}**{{else}}aktuálně otevřeného Context Provider{{/if}}.

## 🎯 Kontroluj

**Naming:** PascalCase `{Name}Context`, `{Name}Provider`, `use{Name}` hook, `{Name}ContextValue` type, `{Name}ProviderProps`

**TypeScript:** Context value typed, Provider props typed, NO `any`, optional values with `?`, proper generics

**Design:** Well-structured value, logical grouping, clear responsibility, no unnecessary values, proper state management

**Hook:** Error outside provider, clear message, proper return type, no business logic (only context access)

**Performance:** useMemo for context value, useCallback for functions, no unnecessary re-renders, consider splitting large contexts

**Error Handling:** Error states in value, try-catch for async, clear messages, recovery strategy, no silent failures

**Side Effects:** Proper dependencies, cleanup functions, no memory leaks, subscriptions handled, timers/listeners cleaned

**Scope:** Single responsibility, not too broad/narrow, proper tree placement, multiple instances support if needed

**Testing:** Testable provider, mock provider available, test coverage

## 📊 Výstup

**Skóre:** [X]/10 (Naming [X], TypeScript [X], Design [X], Hook [X], Performance [X], Errors [X], Scope [X])

**Problémy:** 🔴 [X] kritické | 🟡 [X] varování | 🔵 [X] návrhy

**TOP 3:**

1. 🔴 [Problém] - [performance/memory leak/type safety dopad]
2. 🟡 [Problém] - [re-render/maintenance dopad]
3. 🔵 [Návrh] - [optimization benefit]

**Detaily:** Pro každý problém:

- Co je špatně + proč (performance issues, memory leaks, type safety)
- Jak opravit (konkrétní kroky)
- Čas na fix
- Kód před/po

**Performance check:**

- [ ] Context value memoized (useMemo)
- [ ] Functions memoized (useCallback)
- [ ] No object/array creation in render
- [ ] Context not too broad (split if needed)

**Akce:**

- 🔴 ASAP: [úkol] - [critical issue]
- 🟡 Týden: [úkol] - [important]
- 🔵 Později: [úkol] - [optimization]

## 💡 Pravidla

Zaměř se na memoization, kontroluj memory leaks, vysvětluj performance impact, prioritizuj podle severity
