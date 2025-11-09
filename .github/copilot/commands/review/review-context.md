---
description: React Context Provider review
args:
  - name: contextPath
    description: Cesta k Context Provider souboru
    required: false
---

# 🌐 Context Provider Review{{#if contextPath}}: {{contextPath}}{{/if}}

## ⚠️ **STRIKTNÍ INSTRUKCE - DRŽET SE PRAVIDEL**

**VŽDY aplikujte VŠECHNA pravidla z [Architecture Guidelines](../rules/architecture-guidelines.md) - žádné vlastní interpretace nebo zjednodušení!**

- ✅ **Pouze pravidla z guidelines** - ne vlastní úsudek
- ✅ **Žádné zjednodušení** - pravidla platí pro VŠECHNY Context Providers

Review {{#if contextPath}}**{{contextPath}}**{{else}}aktuálně otevřeného Context Provider{{/if}} podle **architecture guidelines** v `rules/architecture-guidelines.md`.

## 📋 Reference Guidelines

**DŮLEŽITÉ:** Při review Context Providers aplikuj **VŠECHNA** pravidla z:

- **[Performance Guidelines](../rules/architecture-guidelines.md#performance-guidelines)** - useMemo/useCallback memoization, selective re-renders
- **[Documentation Guidelines](../rules/architecture-guidelines.md#documentation-guidelines)** - JSDoc dokumentace pro Provider a hook
- **[Error Handling Patterns](../rules/architecture-guidelines.md#error-handling-patterns)** - Error handling v hooku pro missing Provider

## 🎯 Kontroluj

**NEOPAKUJ pravidla zde - aplikuj přímo z [Architecture Guidelines](../rules/architecture-guidelines.md)!**

- [ ] **Context value memoized** (useMemo)?
- [ ] **Functions memoized** (useCallback)?
- [ ] **Error handling v hooku** pro missing Provider?
- [ ] **JSDoc dokumentace** pro Provider a hook?
- [ ] **Posuzované změny zachovávají existující chování** contextu?
- [ ] Prochází `review-context.md` s 8+/10?

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
