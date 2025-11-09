---
description: Utility function/module review
args:
  - name: utilityPath
    description: Cesta k utility souboru
    required: false
---

# 🔧 Utility Review{{#if utilityPath}}: {{utilityPath}}{{/if}}

## ⚠️ **STRIKTNÍ INSTRUKCE - DRŽET SE PRAVIDEL**

**VŽDY aplikujte VŠECHNA pravidla z [Architecture Guidelines](../rules/architecture-guidelines.md) - žádné vlastní interpretace nebo zjednodušení!**

- ✅ **Pouze pravidla z guidelines** - ne vlastní úsudek
- ✅ **Žádné zjednodušení** - pravidla platí pro VŠECHNY utilities

Review {{#if utilityPath}}**{{utilityPath}}**{{else}}aktuálně otevřené utility funkce{{/if}} podle **architecture guidelines** v `rules/architecture-guidelines.md`.

## 📋 Reference Guidelines

**DŮLEŽITÉ:** Při review utility funkcí aplikuj **VŠECHNA** pravidla z:

- **[Performance Guidelines](../rules/architecture-guidelines.md#performance-guidelines)** - Pure functions, optimal algorithms, efficient data structures
- **[Documentation Guidelines](../rules/architecture-guidelines.md#documentation-guidelines)** - JSDoc dokumentace, clear descriptions, examples
- **[Error Handling Patterns](../rules/architecture-guidelines.md#error-handling-patterns)** - Typed errors, input validation, clear error messages

## 🎯 Kontroluj

**NEOPAKUJ pravidla zde - aplikuj přímo z [Architecture Guidelines](../rules/architecture-guidelines.md)!**

- [ ] **Pure function** (no side effects, predictable)?
- [ ] **Input validation** a error handling přítomny?
- [ ] **NO `any` types** (use `unknown` nebo specifické typy)?
- [ ] **JSDoc dokumentace** s @param/@returns/@throws/@example?
- [ ] **Edge cases handled** a type guards použity?
- [ ] **Posuzované změny zachovávají existující chování** utility?
- [ ] Prochází `review-utility.md` s 8+/10?

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
