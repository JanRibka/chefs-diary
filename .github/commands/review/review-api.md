---
description: API service code review
args:
  - name: servicePath
    description: Cesta k API service souboru
    required: false
---

# 📡 API Service Review{{#if servicePath}}: {{servicePath}}{{/if}}

Review {{#if servicePath}}**{{servicePath}}**{{else}}aktuálně otevřeného API service{{/if}}.

## 🎯 Kontroluj

**Naming:** camelCase service, `get/create/update/delete{Entity}`, CRUD operations, consistent verbs

**TypeScript:** Request DTOs, Response types, Query params, Error types, generic `ApiResponse<T>`, NO `any`

**HTTP Client:** Base URL config, headers, timeout, auth interceptors, error interceptors, retry logic

**Error Handling:** Typed errors, consistent format, status codes, network errors, timeout handling, clear messages

**Request/Response:** Correct HTTP methods, body formatting, query params, data extraction, headers

**Performance:** AbortController, caching strategy, pagination, request deduplication

**Security:** Token handling (ne v URL), HTTPS only, no credentials in code, input validation

**Testing:** Mockable client, test coverage, success + error scenarios

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
