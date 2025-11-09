---
description: TypeScript type definitions review
args:
  - name: typesPath
    description: Cesta k types souboru
    required: false
---

# 📐 Types Review{{#if typesPath}}: {{typesPath}}{{/if}}

## ⚠️ **STRIKTNÍ INSTRUKCE - DRŽET SE PRAVIDEL**

**VŽDY aplikujte VŠECHNA pravidla z [Architecture Guidelines](../rules/architecture-guidelines.md) - žádné vlastní interpretace nebo zjednodušení!**

- ✅ **Pouze pravidla z guidelines** - ne vlastní úsudek
- ✅ **Žádné zjednodušení** - pravidla platí pro VŠECHNY types

Review {{#if typesPath}}**{{typesPath}}**{{else}}aktuálně otevřeného types souboru{{/if}} podle **architecture guidelines** v `rules/architecture-guidelines.md`.

## 📋 Reference Guidelines

**DŮLEŽITÉ:** Při review TypeScript typů aplikuj **VŠECHNA** pravidla z:

- **[Documentation Guidelines](../rules/architecture-guidelines.md#documentation-guidelines)** - JSDoc dokumentace, property descriptions, examples
- **[Error Handling Patterns](../rules/architecture-guidelines.md#error-handling-patterns)** - Type guards, proper validation, branded types

## 🎯 Kontroluj

**NEOPAKUJ pravidla zde - aplikuj přímo z [Architecture Guidelines](../rules/architecture-guidelines.md)!**

- [ ] **Žádné `any` types** (use `unknown` nebo specifické typy)?
- [ ] **NO `I` prefix** na interfaces (use `User`, not `IUser`)?
- [ ] **Proper type guards** a branded types pro type safety?
- [ ] **JSDoc dokumentace** pro komplexní typy?
- [ ] **Posuzované změny zachovávají existující kontrakty**?
- [ ] Prochází `review-types.md` s 8+/10?

## 📊 Výstup

**Skóre:** [X]/10 (Naming [X], Type/Interface [X], Design [X], Generics [X], Safety [X], Docs [X])

**Problémy:** 🔴 [X] kritické | 🟡 [X] varování | 🔵 [X] návrhy

**TOP 3:**

1. 🔴 [Problém] - [any usage/type safety risk dopad]
2. 🟡 [Problém] - [naming/structure dopad]
3. 🔵 [Návrh] - [utility types/documentation benefit]

**Detaily:** Pro každý problém:

- Co je špatně + proč (type safety, runtime errors, DX)
- Jak opravit (konkrétní kroky)
- Čas na fix
- Kód před/po

**Critical checks:**

- [ ] NO `any` types (count: [X])
- [ ] NO `I` prefix on interfaces
- [ ] Proper union types over string enums
- [ ] Type guards for runtime validation
- [ ] Documentation for complex types

**Akce:**

- 🔴 ASAP: [úkol] - [type safety critical]
- 🟡 Týden: [úkol] - [naming/structure]
- 🔵 Později: [úkol] - [documentation/optimization]

## 💡 Pravidla

Zaměř se na type safety (eliminate `any`), kontroluj naming conventions (NO `I` prefix!), vysvětluj type vs interface choices, prioritizuj podle type safety impact
