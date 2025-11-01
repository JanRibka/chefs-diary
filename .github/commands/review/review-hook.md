---
description: Custom React Hook review
args:
  - name: hookPath
    description: Cesta k custom hooku
    required: false
---

# 🪝 Hook Review{{#if hookPath}}: {{hookPath}}{{/if}}

Review {{#if hookPath}}**{{hookPath}}**{{else}}aktuálně otevřeného custom hooku{{/if}}.

## 🎯 Kontroluj

**Naming:** camelCase `use{Feature}`, return patterns (tuple/object/value), handlers `handle*`, booleans `is/has/should*`

**TypeScript:** Explicitní return type, generics for reusability, typed parameters, type guards, NO `any` (use `unknown`)

**Rules of Hooks:** All hooks top-level (NO conditions/loops), correct hook call order, proper dependencies (exhaustive-deps)

**Side Effects:** Cleanup functions (abort controllers, event listeners, timers, subscriptions), no memory leaks

**Design:** Single responsibility, reusable/parametrized, clear API, good defaults, not over-complicated

**Performance:** useMemo for expensive calculations, useCallback for stable refs, optimal dependencies

**Error Handling:** Try-catch for async, error state returned, clear messages, proper error types, no silent failures

**Testing:** Testable, mockable dependencies, test file exists, edge cases covered

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
