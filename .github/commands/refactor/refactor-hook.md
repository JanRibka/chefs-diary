---
description: Refactor custom React hook podle review pravidel
args:
  - name: hookPath
    description: Cesta k hooku k refactoringu
    required: false
---

# 🔨 Hook Refactoring{{#if hookPath}}: {{hookPath}}{{/if}}

Refactoruj {{#if hookPath}}**{{hookPath}}**{{else}}aktuálně otevřený hook{{/if}} podle review best practices.

## 🎯 Refactoring Checklist

### 📁 Naming

- [ ] Hook name: `use{Feature}` (camelCase)
- [ ] Handlers: `handle{Event}`
- [ ] Booleans: `is*/has*/should*`
- [ ] Return: tuple/object/value pattern

### 💎 TypeScript

- [ ] Explicit return type
- [ ] Typed parameters
- [ ] Generics pro reusability
- [ ] NO `any` (use `unknown`)

### ⚙️ Rules of Hooks

- [ ] All hooks top-level (NO conditions/loops)
- [ ] Correct dependencies (exhaustive-deps)
- [ ] Proper cleanup functions

### 🔄 Side Effects

- [ ] Cleanup: AbortController, listeners, timers
- [ ] NO memory leaks
- [ ] Proper dependency array

### 🎯 Design

- [ ] Pure logic (single responsibility)
- [ ] Reusable/parametrized
- [ ] Good defaults
- [ ] Clear API

### ⚡ Performance

- [ ] useMemo pro expensive calculations
- [ ] useCallback pro stable refs
- [ ] Optimal dependencies

### 🛡️ Error Handling

- [ ] Try-catch pro async
- [ ] Error state returned
- [ ] Clear messages
- [ ] NO silent failures

---

## 🔧 Refactoring Steps

**Krok 1:** Fix naming (ensure `use` prefix)  
**Krok 2:** Add types (params + return)  
**Krok 3:** Add cleanup (AbortController, listeners)  
**Krok 4:** Optimize (useMemo/useCallback)  
**Krok 5:** Add error handling  
**Krok 6:** Add JSDoc

---

## 📝 Výstup

Vytvoř hook který má strukturu:

```tsx
/**
 * use{Feature} - popis
 *
 * @param param - popis
 * @returns return value popis
 *
 * @example
 * const { data, isLoading } = use{Feature}(param);
 */
export function use{Feature}<T>(
  param: string
): { data: T | null; isLoading: boolean; error: Error | null } {
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const controller = new AbortController();

    (async () => {
      setIsLoading(true);
      try {
        const result = await fetchData(param, controller.signal);
        setData(result);
      } catch (err) {
        if (err.name !== 'AbortError') {
          setError(err as Error);
        }
      } finally {
        setIsLoading(false);
      }
    })();

    return () => controller.abort(); // Cleanup!
  }, [param]);

  return { data, isLoading, error };
}
```

---

## ✅ Verification

- [ ] Prochází `review-hook.md` s 8+/10?
- [ ] All hooks top-level?
- [ ] Cleanup functions present?
- [ ] NO memory leaks?
- [ ] Typed properly?

**Pokud ANO → refactoring HOTOV ✅**
