---
description: Refactor React Context podle review pravidel
args:
  - name: contextPath
    description: Cesta k Context k refactoringu
    required: false
---

# 🔨 Context Refactoring{{#if contextPath}}: {{contextPath}}{{/if}}

Refactoruj {{#if contextPath}}**{{contextPath}}**{{else}}aktuálně otevřený Context{{/if}} podle review best practices.

## 🎯 Refactoring Checklist

**DŮLEŽITÉ:** Aplikuj VŠECHNA následující pravidla:

### 📁 Naming

- [ ] Context: `{Name}Context`
- [ ] Provider: `{Name}Provider`
- [ ] Hook: `use{Name}`

### 💎 TypeScript

- [ ] Context value interface explicitní
- [ ] Provider props typované
- [ ] Hook return type explicitní
- [ ] NO `any`

### ⚙️ React

- [ ] Context value memoized (useMemo)
- [ ] Functions memoized (useCallback)
- [ ] Provider children typované
- [ ] Error handling v hooku

### 🚀 Performance

- [ ] Context value memoized (useMemo)
- [ ] Functions memoized (useCallback)
- [ ] NO objekty/arrays v value
- [ ] Selective re-renders

### �️ Architecture

- [ ] Single responsibility
- [ ] Provider separovaný
- [ ] Hook pro consumption
- [ ] Testable

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
