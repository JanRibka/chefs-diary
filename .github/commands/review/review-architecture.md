---
description: Monorepo architecture review
args:
  - name: projectPath
    description: Cesta k root monorepo
    required: false
---

# 🏗️ Monorepo Architecture Review

High-level review architektury monorepo projektu.

## 🎯 Kontroluj

**Struktura:** apps/ packages/ tooling/, kebab-case apps, @scope/package naming, logická organizace, scalable

**Dependency Graph:** Apps→Packages (ne opačně), žádné circulars, clear hierarchy, loose coupling, proper layering

**Package.json:** Workspace config (pnpm/yarn), version consistency, NO duplicates, proper dev/peer deps, scripts organization

**Shared Code:** @repo/ui, @repo/utils, @repo/types, správná granularita (ne god/micro packages), clear public API, barrel exports

**TypeScript:** Root tsconfig, project references, path aliases, strict mode, consistency

**Build System:** Turbo/Nx config, dependency-aware execution, caching strategy, parallel builds, fast dev experience

**Boundaries:** Clear public APIs, internal code hidden, no ../../../ imports, workspace protocol, export maps

**Anti-patterns:** God packages, shallow packages, mixed concerns, duplicitní logika, cross-app deps, tight coupling, version drift

**Scalability:** Easy to add package/app, good docs, fast feedback, clear onboarding, testing strategy

## 📊 Výstup

**Skóre:** [X]/10 (Struktura [X], Dependencies [X], Packages [X], Sharing [X], TS [X], Build [X], Boundaries [X], DX [X])

**Problémy:** 🔴 [X] kritické | 🟡 [X] varování | 🔵 [X] návrhy

**Executive Summary:**

- Silné stránky: [3 věci co fungují dobře]
- TOP 3 problémy: [co blokuje/zpomaluje]

**Dependency Diagram:**

```
Vytvoř textový/Mermaid diagram:
apps/web → @repo/ui, @repo/utils
apps/admin → @repo/ui
@repo/ui → @repo/utils
```

**Stats:**

- Apps: [X], Packages: [X]
- Max depth: [X]
- Circulars: [X] ⚠️

**Detaily:** Pro každý problém:

- Co je špatně + proč kritické/blokující
- Dopad na development/scale
- Jak opravit (konkrétní kroky)
- Effort (hours/days)
- Kód/struktura před/po

**Doporučení:**

- Packages: sloučit [A+B], rozdělit [C→D+E], vytvořit [nový]
- Dependencies: odstranit [X→Y], přidat [A→B], refactor
- Build: caching, parallel, incremental - očekávaný speedup
- Docs: co chybí (ADRs, onboarding, contributing)

**Akční plán:**

- 🔴 Týden 1: [akce] - [důvod blokování]
- 🟡 Tento sprint: [akce] - [benefit]
- 🔵 Long-term: [refactoring] - [ROI]

**Metrics:**

```
Build time: [X]min → target [Y]min
Cache hit: [X]%
Circulars: [X] → target 0
Duplicates: [X]% → target <5%
```

## 💡 Pravidla

Zaměř se na strukturu ne detaily, hledej patterns/anti-patterns, buď konkrétní v doporučeních, prioritizuj podle business impactu
