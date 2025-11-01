---
description: Refactor React component podle review pravidel
args:
  - name: componentPath
    description: Cesta ke komponentu k refactoringu
    required: false
---

# 🔨 Component Refactoring{{#if componentPath}}: {{componentPath}}{{/if}}

Refactoruj {{#if componentPath}}**{{componentPath}}**{{else}}aktuálně otevřený komponent{{/if}} podle review best practices.

## 🎯 Refactoring Checklist

**DŮLEŽITÉ:** Aplikuj VŠECHNA následující pravidla:

### 📁 Naming

- [ ] Komponenta: PascalCase
- [ ] Props interface: `{Component}Props`
- [ ] Handlers: `handle{Event}`
- [ ] Callbacks: `on{Event}`
- [ ] Booleans: `is*/has*/should*`
- [ ] State vars: camelCase

### 💎 TypeScript

- [ ] Props interface explicitní
- [ ] Všechny props typované
- [ ] Optional props s `?`
- [ ] Správné React typy (`ReactNode`, `CSSProperties`)
- [ ] NO `any`

### ⚙️ React

- [ ] Hooks na začátku (top-level)
- [ ] Správné dependencies
- [ ] Early returns pro conditions
- [ ] Error handling
- [ ] Loading states

### 🚀 Performance

- [ ] `React.memo` pokud komponenta má props + často re-renderuje
- [ ] `useMemo` pro složité výpočty (filter/map/reduce)
- [ ] `useCallback` pro funkce jako props
- [ ] NO objekty/arrays v renderu

### 🎨 UI

- [ ] Tailwind core utilities (NO arbitrary values)
- [ ] Semantic HTML
- [ ] ARIA attributes
- [ ] Keyboard navigation

### 🏗️ Architecture

- [ ] Single responsibility
- [ ] Reusable
- [ ] Testable
- [ ] Separated concerns

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

Vytvoř refactorovaný komponent který:

1. **Splňuje všechny body checklistu**
2. **Má strukturu:**

```tsx
// Imports
import React, { useState, useCallback, useMemo } from 'react';

// Types
interface {Component}Props {
  // typed props
}

// Component
export const {Component} = React.memo(({ ...props }: {Component}Props) => {
  // 1. Hooks (useState, useEffect, custom hooks)

  // 2. Memoized callbacks
  const handleEvent = useCallback(() => {
    // logic
  }, [deps]);

  // 3. Memoized computations
  const computed = useMemo(() => {
    // calculation
  }, [deps]);

  // 4. Early returns
  if (condition) return <Loading />;

  // 5. Render
  return (
    <div>
      {/* JSX */}
    </div>
  );
});

{Component}.displayName = '{Component}';
```

3. **Má dokumentaci:**

```tsx
/**
 * {Component} - stručný popis
 *
 * @example
 * <{Component} prop={value} />
 */
```

4. **Splňuje performance kritéria:**

- React.memo pokud má props
- useMemo pro výpočty
- useCallback pro funkce
- Žádné objekty v renderu

---

## ✅ Verification

Po refactoringu zkontroluj:

- [ ] Prochází `review-component.md` s 8+/10?
- [ ] Žádné ESLint warnings?
- [ ] Žádné TypeScript errors?
- [ ] Komponenta je reusable?
- [ ] Performance optimalizace aplikovány?

**Pokud ANO všude → refactoring HOTOV ✅**
