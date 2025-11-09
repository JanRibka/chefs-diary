---
description: Refactor React Context podle review pravidel
args:
  - name: contextPath
    description: Cesta k Context k refactoringu
    required: false
---

# 🔨 Context Refactoring{{#if contextPath}}: {{contextPath}}{{/if}}

## ⚠️ **STRIKTNÍ INSTRUKCE - DRŽET SE PRAVIDEL**

**VŽDY aplikujte VŠECHNA pravidla z [Architecture Guidelines](../rules/architecture-guidelines.md) - žádné vlastní interpretace nebo zjednodušení!**

- ✅ **Pouze pravidla z guidelines** - ne vlastní úsudek
- ✅ **Žádné zjednodušení** - pravidla platí pro VŠECHNY Contexts

Refactoruj {{#if contextPath}}**{{contextPath}}**{{else}}aktuálně otevřený Context{{/if}} podle review best practices.

## ⚠️ Scope refactoringu

- Pracuj s existujícím contextem, pouze ho reorganizuj; neměň veřejné API ani chování.
- Nepřidávej nové hodnoty nebo efekty, pokud to nevyplývá z review.
- Dodrž guidelines úpravou stávající logiky, ne přepisem kontextu od nuly.

## 📋 Reference Guidelines

**DŮLEŽITÉ:** Tento příkaz implementuje **VŠECHNA** pravidla z [Architecture Guidelines](../rules/architecture-guidelines.md):

- **[Performance Guidelines](../rules/architecture-guidelines.md#performance-guidelines)** - useMemo/useCallback memoization, selective re-renders
- **[Documentation Guidelines](../rules/architecture-guidelines.md#documentation-guidelines)** - JSDoc dokumentace pro Provider a hook
- **[Error Handling Patterns](../rules/architecture-guidelines.md#error-handling-patterns)** - Error handling v hooku pro missing Provider

## 🎯 Refactoring Checklist

**NEOPAKUJ pravidla zde - aplikuj přímo z [Architecture Guidelines](../rules/architecture-guidelines.md)!**

- [ ] **Context value memoized** (useMemo)?
- [ ] **Functions memoized** (useCallback)?
- [ ] **Error handling v hooku** pro missing Provider?
- [ ] **JSDoc dokumentace** pro Provider a hook?
- [ ] Prochází `review-context.md` s 8+/10?

---

## 🔧 Refactoring Steps

**Krok 1: Analyze** - identifikuj všechny problémy z review  
**Krok 2: Fix Naming** - přejmenuj podle konvencí  
**Krok 3: Add Types** - doplň všechny missing types  
**Krok 4: Optimize** - přidej memoization kde potřeba  
**Krok 5: Clean** - odstraň duplicity a mrtvý kód  
**Krok 6: Verify** - zkontroluj proti checklistu

---

## 📝 Výstup

Vytvoř refactorovaný Context který:

1. **Splňuje všechny body checklistu**
2. **Má strukturu:**

```tsx
// Imports
import React, { createContext, useContext, useState, useCallback, useMemo } from 'react';

// Types
interface {Name}ContextValue {
  // typed context value
}

interface {Name}ProviderProps {
  children: React.ReactNode;
}

// Context
const {Name}Context = createContext<{Name}ContextValue | undefined>(undefined);

// Provider
export function {Name}Provider({ children }: {Name}ProviderProps) {
  // 1. State hooks

  // 2. Memoized callbacks
  const handleAction = useCallback(() => {
    // logic
  }, [deps]);

  // 3. Memoized context value
  const value = useMemo<{Name}ContextValue>(() => ({
    // context value
  }), [deps]);

  // 4. Render
  return (
    <{Name}Context.Provider value={value}>
      {children}
    </{Name}Context.Provider>
  );
}

// Hook
export function use{Name}(): {Name}ContextValue {
  const context = useContext({Name}Context);
  if (context === undefined) {
    throw new Error('use{Name} must be used within {Name}Provider');
  }
  return context;
}
```

3. **Má dokumentaci:**

```tsx
/**
 * {Name}Provider - poskytuje kontext pro {description}
 *
 * @example
 * <{Name}Provider>
 *   <App />
 * </{Name}Provider>
 */

/**
 * use{Name} - hook pro přístup k {Name} kontextu
 *
 * @returns {Name}ContextValue
 * @throws Error pokud není použit v Provideru
 */
```

4. **Splňuje performance kritéria:**

- useMemo pro context value
- useCallback pro funkce
- Žádné objekty v renderu

---

## ✅ Verification

Po refactoringu zkontroluj:

- [ ] Prochází `review-context.md` s 8+/10?
- [ ] Žádné ESLint warnings?
- [ ] Žádné TypeScript errors?
- [ ] Context je memoized?
- [ ] Hook má error handling?

**Pokud ANO všude → refactoring HOTOV ✅**
