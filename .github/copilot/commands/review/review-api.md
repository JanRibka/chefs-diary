---
description: API service code review
args:
  - name: servicePath
    description: Cesta k API service souboru
    required: false
---

# 📡 API Service Review{{#if servicePath}}: {{servicePath}}{{/if}}

## ⚠️ **STRIKTNÍ INSTRUKCE - DRŽET SE PRAVIDEL**

**VŽDY aplikujte VŠECHNA pravidla z [Architecture Guidelines](../rules/architecture-guidelines.md) - žádné vlastní interpretace nebo zjednodušení!**

- ✅ **Pouze pravidla z guidelines** - ne vlastní úsudek
- ✅ **Žádné zjednodušení** - pravidla platí pro VŠECHNY API services

Review {{#if servicePath}}**{{servicePath}}**{{else}}aktuálně otevřeného API service{{/if}} podle **architecture guidelines** v `rules/architecture-guidelines.md`.

## 📋 Reference Guidelines

**DŮLEŽITÉ:** Při review API services aplikuj **VŠECHNA** pravidla z:

- **[Error Handling Patterns](../rules/architecture-guidelines.md#error-handling-patterns)** - Typed errors, status codes, interceptors
- **[Performance Guidelines](../rules/architecture-guidelines.md#performance-guidelines)** - AbortController support, timeout handling
- **[Documentation Guidelines](../rules/architecture-guidelines.md#documentation-guidelines)** - JSDoc dokumentace pro API metody

## 🎯 Kontroluj

**NEOPAKUJ pravidla zde - aplikuj přímo z [Architecture Guidelines](../rules/architecture-guidelines.md)!**

- [ ] **Typed errors** a proper error handling?
- [ ] **AbortController support** pro request cancellation?
- [ ] **Auth/error interceptors** implementovány?
- [ ] **JSDoc dokumentace** pro API metody?
- [ ] **Posuzované změny zachovávají existující chování** (žádné přepisování od nuly)?
- [ ] Prochází `review-api.md` s 8+/10?

## 📊 Výstup

**Skóre:** [X]/10 (Naming [X], TypeScript [X], HTTP Config [X], Errors [X], Requests [X], Performance [X], Security [X])

**Problémy:** 🔴 [X] kritické | 🟡 [X] varování | 🔵 [X] návrhy

**TOP 3:**

1. 🔴 [Problém] - [security/reliability dopad]
2. 🟡 [Problém] - [performance/typing dopad]
3. 🔵 [Návrh] - [DX/maintainability benefit]

**Detaily:** Pro každý problém:

- Co je špatně + proč (security risk, data loss, errors)
- Jak opravit (konkrétní kroky)
- Čas na fix
- Kód před/po

**Struktura check:**

- [ ] Správná struktura (services/, types/, client/)
- [ ] Client properly configured
- [ ] Interceptors implemented
- [ ] Error transformation
- [ ] Type safety

**Akce:**

- 🔴 ASAP: [úkol] - [security/critical]
- 🟡 Týden: [úkol] - [important]
- 🔵 Později: [úkol] - [nice-to-have]

## 💡 Pravidla

Buď konkrétní, kontroluj security, vysvětluj risks, prioritizuj podle severity
