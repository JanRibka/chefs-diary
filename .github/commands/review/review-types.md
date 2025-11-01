---
description: TypeScript type definitions review
args:
  - name: typesPath
    description: Cesta k types souboru
    required: false
---

# 📐 Types Review{{#if typesPath}}: {{typesPath}}{{/if}}

Review {{#if typesPath}}**{{typesPath}}**{{else}}aktuálně otevřeného types souboru{{/if}}.

## 🎯 Kontroluj

**Naming:** PascalCase types/interfaces, NO `I` prefix, proper suffixes (`Props`, `Dto`, `Response`), descriptive generics (`TData` not just `T` for complex)

**Type vs Interface:** Type for unions/intersections/primitives/tuples, Interface for object shapes/props/extendable

**Design:** NO `any` (use `unknown`), proper `?` vs `| undefined`, readonly where immutable, discriminated unions, proper null handling, no overly broad (`object`, `{}`)

**Utility Types:** Use built-ins (Partial, Pick, Omit, Record), custom reusable utilities, type guards

**Generics:** Constraints where needed, default types, descriptive names for complex, no unnecessary generics

**Enums:** Prefer union types (`type Status = 'a' | 'b'`), enums only for numeric/reverse mapping

**Type Safety:** Minimal `as` assertions, NO `as any`, type guards, branded types for important primitives, proper narrowing

**Documentation:** JSDoc for complex types, property descriptions, examples for complex patterns

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
