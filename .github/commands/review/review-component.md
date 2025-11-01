---
description: React component code review
args:
  - name: componentPath
    description: Cesta ke komponentu
    required: false
---

# 🔍 Component Review{{#if componentPath}}: {{componentPath}}{{/if}}

Review {{#if componentPath}}**{{componentPath}}**{{else}}aktuálně otevřeného souboru{{/if}}.

## 🎯 Kontroluj

**Naming:** PascalCase komponenty, camelCase hooks/utils, `handle*` handlers, `on*` callbacks, `is*/has*` booleans, `-Props` suffix

**TypeScript:** Explicitní typy, správné React typy, optional `?`, správná deklarace komponent (function vs const arrow)

**React:** Hooks na začátku, správné dependencies, early returns, error handling

**Performance:** Detekuj potřebu `React.memo` (komponenta s props), `useMemo` (výpočty/transformace), `useCallback` (funkce jako props)

**UI:** Tailwind core utilities, semantic HTML, ARIA, keyboard nav

**Architecture:** Single responsibility, reusable, testable

## 📊 Výstup

**Skóre:** [X]/10 (Naming [X], TypeScript [X], React [X], Performance [X], UI [X])

**Problémy:** 🔴 [X] kritické | 🟡 [X] varování | 🔵 [X] návrhy

**TOP 3:**

1. 🔴 [Problém] - [dopad]
2. 🟡 [Problém] - [dopad]
3. 🔵 [Návrh] - [benefit]

**Detaily:** Pro každý problém uveď:

- Co je špatně + proč to vadí
- Jak opravit (konkrétní kroky)
- Čas na fix
- Kód před/po

**Memoization:**

- [ ] React.memo kde? priorita?
- [ ] useMemo kde? priorita?
- [ ] useCallback kde? priorita?

**Akce:**

- 🔴 ASAP: [úkol] - [čas]
- 🟡 Týden: [úkol] - [čas]
- 🔵 Později: [úkol] - [čas]

## 💡 Pravidla

Buď konkrétní, ukazuj kód, vysvětluj proč, prioritizuj, měř dopad
