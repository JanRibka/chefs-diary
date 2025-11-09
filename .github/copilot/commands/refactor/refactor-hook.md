---
description: Refactor custom React hook podle review pravidel
args:
  - name: hookPath
    description: Cesta k hooku k refactoringu
    required: false
---

# 🔨 Hook Refactoring{{#if hookPath}}: {{hookPath}}{{/if}}

## ⚠️ **STRIKTNÍ INSTRUKCE - DRŽET SE PRAVIDEL**

**VŽDY aplikujte VŠECHNA pravidla z [Architecture Guidelines](../rules/architecture-guidelines.md) - žádné vlastní interpretace nebo zjednodušení!**

- ✅ **Pouze pravidla z guidelines** - ne vlastní úsudek
- ✅ **Žádné zjednodušení** - pravidla platí pro VŠECHNY hooks

Refactoruj {{#if hookPath}}**{{hookPath}}**{{else}}aktuálně otevřený hook{{/if}} podle **architecture guidelines** v `rules/architecture-guidelines.md`.

## ⚠️ Scope refactoringu

- Vycházej z aktuální implementace hooku; zachovej jeho veřejné API i chování.
- Nepřidávej nové side-effecty ani externí závislosti, pokud to nevyplývá z review.
- Úpravy dělej reorganizací a zpřehledněním existující logiky, ne přepisem od nuly.

## 📋 Reference Guidelines

**DŮLEŽITÉ:** Při refactoringu hooks aplikuj **VŠECHNA** pravidla z:

- 🎯 **[Data Colocation Principle](../rules/architecture-guidelines.md#data-colocation-principle)** - hooks tam, kde se používají
- 💬 **[Documentation Guidelines](../rules/architecture-guidelines.md#documentation-guidelines)** - JSDoc komentáře
- 📊 **[Performance Guidelines](../rules/architecture-guidelines.md#performance-guidelines)** - useMemo/useCallback optimalizace
- 🛡️ **[Error Handling Patterns](../rules/architecture-guidelines.md#error-handling-patterns)** - proper error handling, cleanup

## 🎯 Refactoring Checklist

**NEOPAKUJ pravidla zde - aplikuj přímo z [Architecture Guidelines](../rules/architecture-guidelines.md)!**

- [ ] **Data colocation** princip aplikován (hook tam, kde se používá)?
- [ ] **JSDoc komentáře** a smysluplné komentáře v kódu přítomny?
- [ ] **Performance optimalizace** aplikovány podle pravidel?
- [ ] **Proper cleanup** (AbortController, listeners, timers)?
- [ ] Prochází `review-hook.md` s 8+/10?

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
