---
description: Utility function/module review
args:
  - name: utilityPath
    description: Cesta k utility souboru
    required: false
---

# 🔧 Utility Review{{#if utilityPath}}: {{utilityPath}}{{/if}}

Review {{#if utilityPath}}**{{utilityPath}}**{{else}}aktuálně otevřené utility funkce{{/if}}.

## 🎯 Kontroluj

**Naming:** camelCase, verb-based (`formatDate`, `validateEmail`), booleans `is/has/can*`, transformers `to*/parse*/convert*`, NO abbreviations

**TypeScript:** Explicit param types, explicit return types, generics for reusable, type guards, NO `any` (use `unknown`), JSDoc comments

**Design:** Pure functions (no side effects), same input = same output, single responsibility, no external state mutations, predictable

**Error Handling:** Input validation, try-catch where needed, clear error messages, typed errors, NO silent failures, edge cases handled

**Performance:** Optimal algorithm complexity, no unnecessary loops, early returns, efficient data structures, large data considered

**Testability:** Pure = easy to test, predictable I/O, test file exists, edge cases identified, mock-free testing

**Documentation:** JSDoc with @param/@returns/@throws/@example, clear descriptions, complex logic explained

**Reusability:** Flexible params, good defaults, no hard-coded values, composable, well-defined API

## 📊 Výstup

**Skóre:** [X]/10 (Naming [X], TypeScript [X], Design [X], Errors [X], Performance [X], Tests [X], Docs [X])

**Problémy:** 🔴 [X] kritické | 🟡 [X] varování | 🔵 [X] návrhy

**TOP 3:**

1. 🔴 [Problém] - [bugs/security/performance dopad]
2. 🟡 [Problém] - [type safety/maintainability dopad]
3. 🔵 [Návrh] - [reusability/optimization benefit]

**Detaily:** Pro každý problém:

- Co je špatně + proč (bugs, security, performance)
- Jak opravit (konkrétní kroky)
- Čas na fix
- Kód před/po

**Critical checks:**

- [ ] Function is pure (no side effects)
- [ ] Input validation present
- [ ] NO `any` types
- [ ] Edge cases handled
- [ ] JSDoc documentation

**Akce:**

- 🔴 ASAP: [úkol] - [bug/security critical]
- 🟡 Týden: [úkol] - [important fix]
- 🔵 Později: [úkol] - [optimization/docs]

## 💡 Pravidla

Zaměř se na purity (no side effects), kontroluj input validation, vysvětluj performance impact, prioritizuj podle severity (bugs > performance > docs)
