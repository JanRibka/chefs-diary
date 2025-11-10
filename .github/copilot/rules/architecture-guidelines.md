---
description: Architecture guidelines and refactoring standards
args:
  - name: componentPath
    description: Cesta ke komponentu pro demonstraci
    required: false
---

# 🏗️ Architecture Guidelines & Refactoring Standards

Komplexní pravidla pro refactoring a architekturu React aplikací s detailní folder strukturou.

## 📋 Obsah dokumentu

- **⚡ Performance Best Practices** - Memoizace, lazy loading, optimalizace
- **🏗️ Architecture Patterns** - Pure Orchestration, Data Colocation, Component Splitting
- **📁 Folder Structure** - Multi-file komponenty, hooks, types, styles organizace
- **🎨 Styling Guidelines** - Tailwind CSS first, žádné custom CSS
- **💬 Documentation** - JSDoc komentáře, performance komentáře
- **🛡️ Error Handling** - Error Boundaries, fallback UI
- **♿ Accessibility** - ARIA, semantic HTML, keyboard navigation
- **📦 TypeScript Guidelines** - Strict types, no any, explicit types
- **🌐 Context API** - Typed Context patterns, kdy použít
- **⚛️ Next.js Specific** - Server/Client Components, data fetching
- **🧪 Testing** - Struktura testů podle komponent
- **✅ Checklists** - Před/po refactoringu, performance optimalizace

## ⚠️ **STRIKTNÍ INSTRUKCE - DRŽET SE PRAVIDEL**

**VŽDY se striktně držte těchto pravidel - NEPOUŽÍVEJTE vlastní úsudek nebo zjednodušení!**

- ✅ **Pouze aplikujte pravidla z tohoto dokumentu** - žádné vlastní interpretace
- ✅ **Použijte plnou strukturu** pro všechny komponenty > 30 řádků
- ✅ **Každý typ v samostatném souboru** - žádné `.types.ts` soubory
- ✅ **Všechny adresáře** (hooks/, types/, utils/, constants/) i když jsou prázdné
- ✅ **Žádné zjednodušení** - pravidla platí pro VŠECHNY komponenty
- ✅ **Rekurzivní refactoring** - pokud vytvoříte komponentu > 100 řádků, aplikujte pravidla znovu
- ✅ **Žádná komponenta nesmí být > 100 řádků** - vždy rozdělte na menší části
- ✅ **ŽÁDNÉ PROPS DRILLING KONSTANT** - konstanty VŽDY uvnitř komponenty, která je používá
- ✅ **Data Colocation** - hooks a data tam, kde se používají, ne v orchestrátoru

**Toto platí pro všechny review a refactor pravidla!**

## ⚡ Performance Best Practices

### POVINNÉ performance optimalizace pro VŠECHNY komponenty

**1. React.memo pro VŠECHNY orchestrační komponenty a subkomponenty**

```tsx
import { memo } from "react";

// VŽDY wrap orchestrátor i subkomponenty v React.memo
export const UserProfile = memo(() => {
  // ... orchestrace
});

UserProfile.displayName = "UserProfile"; // VŽDY přidej displayName

export const UserProfileContent = memo(({ user }: Props) => {
  // ... UI
});

UserProfileContent.displayName = "UserProfileContent";
```

**2. useCallback pro VŠECHNY callback props**

```tsx
import { useCallback, memo } from "react";

export const UserProfile = memo(() => {
  const userData = useUserData();

  // PERFORMANCE: useCallback previne re-render child komponent
  const handleUpdate = useCallback((id: string, data: UpdateData) => {
    updateUser(id, data);
  }, []); // stable dependency array

  return <UserProfileContent onUpdate={handleUpdate} />;
});
```

**3. useMemo pro složité výpočty a derived state**

```tsx
import { useMemo, memo } from "react";

export const UserProfile = memo(() => {
  const { users } = useUsers();

  // PERFORMANCE: useMemo pro expensive computation
  const sortedUsers = useMemo(() => {
    return users
      .filter((u) => u.active)
      .sort((a, b) => a.name.localeCompare(b.name));
  }, [users]); // recompute pouze když se změní users

  // PERFORMANCE: useMemo pro derived state
  const stats = useMemo(
    () => ({
      total: users.length,
      active: users.filter((u) => u.active).length,
    }),
    [users]
  );

  return <UserList users={sortedUsers} stats={stats} />;
});
```

**4. Lazy loading pro velké komponenty**

```tsx
import { lazy, Suspense, memo } from "react";

// PERFORMANCE: lazy load heavy components
const HeavyComponent = lazy(() => import("./components/HeavyComponent"));

export const UserProfile = memo(() => {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <HeavyComponent />
    </Suspense>
  );
});
```

**5. Error Boundaries pro production resilience**

```tsx
import { Component, ReactNode } from "react";

// PRODUCTION: error boundary pro graceful error handling
class ErrorBoundary extends Component<
  { children: ReactNode; fallback: ReactNode },
  { hasError: boolean }
> {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("Error caught by boundary:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback;
    }
    return this.props.children;
  }
}

// Použití v orchestrátoru
export const UserProfile = memo(() => {
  return (
    <ErrorBoundary fallback={<ErrorFallback />}>
      <UserProfileContent />
    </ErrorBoundary>
  );
});
```

**6. Composed hooks pattern pro složitou business logiku**

```tsx
// BEST PRACTICE: compose multiple hooks do one
export const useUserProfileState = (userId: string) => {
  const userData = useUserData(userId);
  const userActions = useUserActions();
  const userPermissions = useUserPermissions(userId);

  // PERFORMANCE: return stable object reference
  return useMemo(
    () => ({
      ...userData,
      ...userActions,
      ...userPermissions,
    }),
    [userData, userActions, userPermissions]
  );
};

// Orchestrátor používá composed hook
export const UserProfile = memo(({ userId }: Props) => {
  const state = useUserProfileState(userId);

  return <UserProfileContent {...state} />;
});
```

### Performance checklist pro KAŽDOU komponentu:

- ✅ **React.memo** na orchestrátoru i subkomponentách
- ✅ **displayName** na všech memo() komponentách
- ✅ **useCallback** na všech callbacks předávaných jako props
- ✅ **useMemo** na derived state a expensive výpočtech
- ✅ **lazy()** na velkých/heavy komponentách (> 100 KB)
- ✅ **Error Boundary** okolo kritických částí aplikace
- ✅ **Composed hooks** místo mnoha samostatných hooks v orchestrátoru
- ✅ **Cleanup v useEffect** - prevence memory leaks
- ✅ **Proper dependency arrays** - žádné eslint-disable comments

## �️ Error Handling Guidelines

### Error Boundaries (POVINNÉ pro production aplikace)

**Error Boundary = React komponenta pro zachycení chyb v child komponentách**

**Kdy použít Error Boundaries:**

- ✅ Okolo celé aplikace (top-level)
- ✅ Okolo kritických sekcí (formuláře, checkout, dashboard)
- ✅ Okolo lazy-loaded komponent
- ✅ Okolo third-party komponent

**Standardní Error Boundary pattern:**

```tsx
// components/shared/ErrorBoundary/ErrorBoundary.tsx
import { Component, ReactNode } from "react";

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
  onError?: (error: Error, errorInfo: React.ErrorInfo) => void;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    // PRODUCTION: Log do Sentry/monitoring
    console.error("Error caught by boundary:", error, errorInfo);
    this.props.onError?.(error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback || <ErrorFallback error={this.state.error} />;
    }
    return this.props.children;
  }
}
```

**Fallback UI komponenta:**

```tsx
// components/shared/ErrorBoundary/ErrorFallback.tsx
interface ErrorFallbackProps {
  error: Error | null;
  resetError?: () => void;
}

export const ErrorFallback = ({ error, resetError }: ErrorFallbackProps) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-slate-900">
      <div className="max-w-md w-full bg-white dark:bg-slate-800 rounded-lg shadow-xl p-8">
        <div className="text-center">
          <div className="text-6xl mb-4">⚠️</div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Něco se pokazilo
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Omlouváme se, došlo k neočekávané chybě.
          </p>

          {/* DEV only - zobrazit error */}
          {process.env.NODE_ENV === "development" && error && (
            <pre className="text-left text-xs bg-red-50 dark:bg-red-900/20 p-4 rounded mb-4 overflow-auto">
              {error.message}
            </pre>
          )}

          <button
            onClick={resetError || (() => window.location.reload())}
            className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-primary-dark transition"
          >
            Zkusit znovu
          </button>
        </div>
      </div>
    </div>
  );
};
```

**Použití v orchestrátoru:**

```tsx
// ✅ SPRÁVNĚ - Error Boundary okolo kritických sekcí
export const UserProfile = memo(() => {
  const userData = useUserData();
  const userActions = useUserActions();

  return (
    <ErrorBoundary fallback={<UserProfileError />}>
      <div className="user-profile">
        <UserProfileHeader user={userData.user} />
        <UserProfileContent onUpdate={userActions.updateUser} />
      </div>
    </ErrorBoundary>
  );
});

// ✅ SPRÁVNĚ - Error Boundary okolo lazy-loaded komponent
const HeavyChart = lazy(() => import("./components/HeavyChart"));

export const Dashboard = memo(() => {
  return (
    <ErrorBoundary fallback={<ChartError />}>
      <Suspense fallback={<ChartLoading />}>
        <HeavyChart />
      </Suspense>
    </ErrorBoundary>
  );
});
```

### Lazy Loading & Code Splitting (DOPORUČENÍ)

**React.lazy() pro code splitting velkých komponent**

**Kdy použít lazy loading:**

- 💡 Komponenty > 50 KB (doporučení)
- 💡 Komponenty používané málokdy (modals, admin pages)
- 💡 Heavy dependencies (charts, editors, maps)
- 💡 Route-based splitting (každá stránka zvlášť)

**Pattern pro lazy loading s Error Boundary:**

```tsx
import { lazy, Suspense, memo } from "react";
import { ErrorBoundary } from "@/components/shared/ErrorBoundary";

// PERFORMANCE: Lazy load heavy components
const HeavyEditor = lazy(() => import("./components/HeavyEditor"));
const HeavyChart = lazy(() => import("./components/HeavyChart"));

export const Dashboard = memo(() => {
  const [showEditor, setShowEditor] = useState(false);

  return (
    <div>
      {/* PERFORMANCE: Load pouze když je potřeba */}
      {showEditor && (
        <ErrorBoundary fallback={<EditorError />}>
          <Suspense fallback={<EditorLoading />}>
            <HeavyEditor />
          </Suspense>
        </ErrorBoundary>
      )}

      <ErrorBoundary fallback={<ChartError />}>
        <Suspense fallback={<ChartLoading />}>
          <HeavyChart />
        </Suspense>
      </ErrorBoundary>
    </div>
  );
});
```

**Code Splitting = automatické rozdělení bundle**

- Webpack/Vite automaticky vytvoří separátní chunk pro lazy() komponenty
- Snižuje initial bundle size
- Rychlejší first load
- Komponenty se načtou až když jsou potřeba

## �📁 Folder Structure Standards

### Komponenty (Components)

**Každá komponenta má svůj vlastní adresář s následující strukturou:**

```
ComponentName/
├── ComponentName.tsx          # 🎯 HLAVNÍ komponenta - POUZE orchestrace a koordinace
├── components/                # Subkomponenty (vždy rozdělit UI logiku)
│   ├── ComponentContent.tsx   # UI pro obsah
│   ├── ComponentLoading.tsx   # Loading states
│   ├── ComponentError.tsx     # Error states
│   └── ComponentItem.tsx      # Jednotlivé položky/seznam
├── hooks/                     # Každý hook v samostatném souboru
│   ├── useComponentData.ts
│   └── useComponentActions.ts
├── types/                     # KAŽDÝ typ v samostatném souboru
│   ├── Item.ts                # Interface Item
│   ├── BadComponentProps.ts   # Interface BadComponentProps
│   └── BadComponentRole.ts    # Enum BadComponentRole
├── utils/                     # Utility funkce specifické pro komponentu
│   ├── formatters.ts
│   └── validators.ts
├── constants/                 # Konstanty specifické pro komponentu
│   └── config.ts
├── ComponentName.test.tsx     # Hlavní test soubor
└── ComponentName.stories.tsx  # Storybook stories
```

**❌ NEPOUŽÍVAT index.ts soubory** - importovat přímo z konkrétních souborů.

### Příklady konkrétních struktur

**Jednoduchá komponenta (< 50 řádků):**

```
Button/
├── Button.tsx                 # Hlavní orchestrace
├── types/
│   └── Button.ts
└── Button.test.tsx
```

**Komplexní komponenta s business logic:**

```
UserProfile/
├── UserProfile.tsx            # 🎯 POUZE orchestrace - koordinuje hooks a subkomponenty
├── components/
│   ├── UserProfileContent.tsx # UI pro obsah
│   ├── UserProfileLoading.tsx # Loading state
│   ├── UserProfileError.tsx   # Error state
│   └── UserProfileAvatar.tsx  # Subkomponenty
├── hooks/
│   ├── useUserData.ts
│   └── useUserActions.ts
├── types/
│   ├── User.ts
│   ├── UserRole.ts
│   └── index.ts
├── utils/
│   ├── userValidators.ts
└── constants/
    └── userConfig.ts
```

**Komponenta s API integrací:**

```
DataTable/
├── DataTable.tsx              # 🎯 POUZE orchestrace - řídí fetching, sorting, pagination
├── components/
│   ├── DataTableContent.tsx   # UI pro tabulku
│   ├── DataTableHeader.tsx    # Header s sorting
│   ├── DataTableRow.tsx       # Řádky
│   ├── DataTablePagination.tsx # Pagination
│   ├── DataTableLoading.tsx   # Loading state
│   └── DataTableError.tsx     # Error state
├── hooks/
│   ├── useTableData.ts        # API fetching
│   ├── useTableSorting.ts     # Sorting logika
│   └── useTablePagination.ts  # Pagination logika
├── types/
│   ├── Table.ts
│   └── TableSort.ts
├── utils/
│   ├── tableFormatters.ts
│   └── tableValidators.ts
└── constants/
    └── tableConfig.ts
```

## 🏛️ Architecture Patterns

### 1. Pure Orchestration Pattern (HLAVNÍ princip)

**Hlavní komponenta (ComponentName.tsx) je VŽDY čistý orchestrátor:**

- ❌ **NEobsahuje** žádnou UI logiku (renderItem, handleClick)
- ❌ **NEobsahuje** žádné hooks (useState, useEffect) - pouze vlastní custom hooks
- ❌ **NEobsahuje** konstanty (NAV_ITEMS, CONFIG) - ty patří do subkomponent (Data Colocation)
- ❌ **NEobsahuje** složité conditional rendering - to patří do subkomponent
- ✅ **Pouze koordinuje** hooks a subkomponenty
- ✅ **Pouze předává** data z hooks do subkomponent
- ✅ **Může obsahovat** jednoduché conditional rendering (mounted check, ternary pro user/guest)
- ✅ **Může obsahovat** useMemo/useCallback pro derived state a callbacks
- ✅ **Může obsahovat** UI strukturu (nav, div, sections) - orchestrace layout
- ✅ **VŽDY používá React.memo** pro prevenci zbytečných re-renderů
- ✅ **VŽDY má displayName** pro React DevTools

```tsx
// ✅ UserProfile.tsx - ČISTÝ ORCHESTRÁTOR S BEST PRACTICES
import { memo, useCallback, useMemo } from "react";
import Logo from "@/components/shared/logo/Logo";
import { UserProfileHeader } from "./components/UserProfileHeader";
import { UserProfileStats } from "./components/UserProfileStats";
import { UserProfileActions } from "./components/UserProfileActions";
import { useUserData } from "./hooks/useUserData";
import { useUserActions } from "./hooks/useUserActions";
import { useUserTheme } from "./hooks/useUserTheme";

export const UserProfile = memo(() => {
  // 1. Custom hooks - business logic
  const userData = useUserData();
  const userActions = useUserActions();
  const themeState = useUserTheme();

  // 2. useMemo pro derived state (PERFORMANCE: vypočítáme jednou)
  const userStats = useMemo(
    () => ({
      totalPosts: userData.user?.posts.length ?? 0,
      joinedDate: userData.user?.createdAt
        ? new Date(userData.user.createdAt)
        : null,
    }),
    [userData.user?.posts.length, userData.user?.createdAt]
  );

  // 3. useCallback pro stable function reference (PERFORMANCE: předejdeme re-renderům dětí)
  const handleUpdate = useCallback(
    (userId: string, data: UpdateData) => {
      userActions.updateUser(userId, data);
    },
    [userActions.updateUser]
  );

  // 4. UI orchestration - struktura a koordinace subkomponent
  // Konstanty (NAV_ITEMS) jsou UVNITŘ subkomponent podle Data Colocation
  return (
    <div className="user-profile">
      <header>
        <Logo />
        <UserProfileHeader user={userData.user} />
      </header>

      <main>
        <UserProfileStats stats={userStats} />

        {/* Jednoduchý conditional rendering je OK */}
        {themeState.mounted && (
          <UserProfileActions
            onUpdate={handleUpdate}
            theme={themeState.theme}
          />
        )}
      </main>
    </div>
  );
});

// displayName pro React DevTools
UserProfile.displayName = "UserProfile";
```

### 2. Subkomponenty pro všechny UI stavy

**Každý UI stav má vlastní subkomponentu:**
**Všechny subkomponenty VŽDY používají React.memo:**
**DŮLEŽITÉ: Subkomponenty mají vlastní konstanty - ŽÁDNÉ props drilling!**

```tsx
// components/UserProfileContent.tsx - UI pro obsah
import { memo } from "react";
import { USER_MENU_ITEMS } from "../constants/menuItems"; // ✅ Konstanta UVNITŘ

export const UserProfileContent = memo(
  ({ user, stats, onUpdate }: ContentProps) => {
    return (
      <div>
        <h1>{user.name}</h1>
        <p>Posts: {stats.totalPosts}</p>

        {/* ✅ Konstanta použita přímo - ŽÁDNÝ props drilling */}
        <nav>
          {USER_MENU_ITEMS.map((item) => (
            <a key={item.href} href={item.href}>
              {item.label}
            </a>
          ))}
        </nav>

        <button onClick={() => onUpdate(user.id, { name: "Updated" })}>
          Update
        </button>
      </div>
    );
  }
);

UserProfileContent.displayName = "UserProfileContent";

// components/UserProfileLoading.tsx - Loading state
export const UserProfileLoading = memo(() => {
  return <div>Loading user profile...</div>;
});

UserProfileLoading.displayName = "UserProfileLoading";

// components/UserProfileError.tsx - Error state
export const UserProfileError = memo(({ error, onRetry }: ErrorProps) => {
  return (
    <div>
      <p>Error: {error}</p>
      <button onClick={onRetry}>Retry</button>
    </div>
  );
});

UserProfileError.displayName = "UserProfileError";
```

### 3. Hooks jako Business Logic Layer

**Každý hook má POUZE JEDNU specifickou zodpovědnost:**
**Hooks VŽDY používají useCallback a useMemo pro stabilní reference:**

#### ✅ useFeatureData.ts - Pouze DATA fetching a state management

```tsx
// hooks/useUserData.ts - JEN data fetching
import { useState, useEffect, useMemo } from "react";

export const useUserData = (userId: string) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // PERFORMANCE: cleanup pro prevenci memory leaks
    let isMounted = true;

    setLoading(true);
    fetchUser(userId)
      .then((data) => {
        if (isMounted) setUser(data);
      })
      .catch((err) => {
        if (isMounted) setError(err.message);
      })
      .finally(() => {
        if (isMounted) setLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, [userId]);

  // PERFORMANCE: stabilní objektová reference (prevence re-renderů)
  return useMemo(() => ({ user, loading, error }), [user, loading, error]);
};
```

#### ✅ useFeatureActions.ts - Pouze USER INTERACTIONS a event handlers

```tsx
// hooks/useUserActions.ts - JEN user actions
import { useCallback } from "react";

export const useUserActions = (onChange?: (value: string) => void) => {
  // PERFORMANCE: useCallback pro stable function reference
  const handleClick = useCallback(() => {
    console.log("clicked");
    onChange?.("new value");
  }, [onChange]);

  // PERFORMANCE: useCallback s proper dependency array
  const handleSubmit = useCallback((data: FormData) => {
    // API call pro submit
    submitData(data);
  }, []); // žádné dependencies - stable reference

  // PERFORMANCE: stabilní objektová reference
  return useMemo(
    () => ({
      handleClick,
      handleSubmit,
    }),
    [handleClick, handleSubmit]
  );
};
```

#### ✅ useFeatureState.ts - Pouze LOCAL state management

```tsx
// hooks/useFormState.ts - JEN local state
export const useFormState = (initialValues: FormValues) => {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState<FieldErrors>({});

  const updateField = (field: string, value: any) => {
    setValues((prev) => ({ ...prev, [field]: value }));
  };

  return { values, errors, updateField };
};
```

**❌ NEPOUŽÍVEJ hooks pro více zodpovědností:**

```tsx
// ❌ ŠPATNĚ - hook dělá fetching + actions + state
export const useUserEverything = () => {
  // Data fetching
  const [user, setUser] = useState(null);
  useEffect(() => fetchUser(), []);

  // Actions
  const handleUpdate = () => {
    /* ... */
  };

  // Local state
  const [isEditing, setIsEditing] = useState(false);

  return { user, handleUpdate, isEditing, setIsEditing };
};
```

**✅ SPRÁVNĚ - oddělené hooks podle zodpovědnosti:**

```tsx
// hooks/useUserData.ts - pouze data
export const useUserData = () => {
  /* fetching logic */
};

// hooks/useUserActions.ts - pouze actions
export const useUserActions = () => {
  /* event handlers */
};

// hooks/useUserState.ts - pouze local state
export const useUserState = () => {
  /* state management */
};
```

### 4. Types jako Contracts

**Každý typ v samostatném souboru:**

```tsx
// types/User.ts - Interface User
export interface User {
  id: string;
  name: string;
  email: string;
}

// types/UserRole.ts - Enum UserRole
export enum UserRole {
  ADMIN = "admin",
  USER = "user",
}
```

## 📋 Kdy Použít Jakou Strukturu

### ✅ Vždy použij adresářovou strukturu když:

- **Komponenta má > 30 řádků**
- **Obsahuje business logic** (API calls, complex state)
- **Má vlastní hooks**
- **Potřebuje unit testy**
- **Je reusable** v různých částech aplikace

### ✅ Vždy rozděl do subkomponent když:

- **Komponenta má > 1 return statement** → rozdělit na subkomponenty
- **Komponenta má conditional rendering** → každý stav má vlastní subkomponentu
- **Komponenta má > 1 event handler** → rozdělit logiku
- **Komponenta má komplexní JSX** → rozdělit na menší komponenty

### ⚠️ **RECURSIVE REFACTORING RULE - STŘÍDNÍ INSTRUKCE**

**Pokud při refactoringu vytvoříš velkou komponentu (> 100 řádků), která je potřeba také zrefaktorovat:**

- ✅ **AUTOMATICKY aplikuj stejná pravidla** jako na původní komponentu
- ✅ **Spusť refactor-component** znovu pro nově vytvořenou komponentu
- ✅ **Rozděl velkou subkomponentu** na další subkomponenty podle stejných principů
- ✅ **Zachovej Pure Orchestration Pattern** - žádná komponenta nesmí být > 100 řádků
- ✅ **Rekurzivní aplikace pravidel** - pokračuj dokud všechny komponenty nejsou < 100 řádků

**Příklad rekurzivního refactoringu:**

```
ComponentName/
├── ComponentName.tsx              # 🎯 HLAVNÍ orchestrátor - koordinuje hooks a subkomponenty
├── components/                    # Subkomponenty (vždy rozdělit UI logiku)
│   ├── ComponentContent.tsx       # UI pro obsah (80 řádků) ✅ OK
│   ├── ComponentLoading.tsx       # Loading states (40 řádků) ✅ OK
│   ├── ComponentError.tsx         # Error states (30 řádků) ✅ OK
│   ├── ComponentItem.tsx          # Jednotlivé položky (50 řádků) ✅ OK
│   └── LargeSubComponent.tsx      # VELKÁ SUBKOMPONENTA (150 řádků) → REFACTOR ZNOVU
│       ├── LargeSubComponent.tsx  # 🎯 HLAVNÍ orchestrátor pro subkomponentu
│       ├── components/            # Další úroveň subkomponent
│       │   ├── SubContent.tsx     # UI pro obsah (60 řádků) ✅ OK
│       │   ├── SubActions.tsx     # Akce (50 řádků) ✅ OK
│       │   └── SubDetails.tsx     # Detaily (30 řádků) ✅ OK
│       ├── hooks/                 # Hooks specifické pro subkomponentu
│       │   ├── useSubData.ts
│       │   └── useSubActions.ts
│       ├── types/                 # Types specifické pro subkomponentu
│       │   ├── SubItem.ts
│       │   └── SubAction.ts
│       ├── utils/                 # Utility funkce
│       │   └── subValidators.ts
│       └── constants/             # Konstanty
│           └── subConfig.ts
├── hooks/                         # Hooks pro hlavní komponentu
│   ├── useComponentData.ts
│   └── useComponentActions.ts
├── types/                         # Types pro hlavní komponentu
│   ├── Component.ts
│   └── ComponentState.ts
├── utils/                         # Utility funkce
│   ├── formatters.ts
│   └── validators.ts
├── constants/                     # Konstanty
│   └── config.ts
├── ComponentName.test.tsx         # Hlavní test soubor
└── ComponentName.stories.tsx      # Storybook stories
```

**❌ Nepoužívej adresářovou strukturu když:**

- **Jednoduchá presentational komponenta**
- **< 20 řádků**
- **Žádná business logic**
- **Lokální typy**

## 🔄 Refactoring Steps

### Fáze 1: Analysis (Analýza)

1. **Spočítej return statements** - každý = kandidát na subkomponentu
2. **Identifikuj conditional rendering** - každý if = nová subkomponenta
3. **Najdi event handlers** - každý handle\* = potenciální rozdělení
4. **Vyhodnoť UI complexity** - složité JSX = rozdělit

### Fáze 2: Planning (Plánování)

1. **Navrhni subkomponenty** pro každý UI stav
2. **Identifikuj props** potřebné pro každou subkomponentu
3. **Naplánuj orchestraci** - hlavní komponenta pouze koordinuje
4. **Definuj contracts** mezi komponentami

### Fáze 3: Implementation (Implementace)

1. **Vytvoř components/ adresář**
2. **Přesuň UI logiku** do subkomponent (jeden return statement = jedna subkomponenta)
3. **Refaktoruj hlavní komponentu** na čistého orchestrátora
4. **Aktualizuj importy** - přímo z konkrétních souborů

### ⚠️ **Fáze 3.5: Recursive Refactoring (REKURZIVNÍ REFACTORING)**

**Po vytvoření subkomponent automaticky zkontroluj každou novou komponentu:**

1. **Změř velikost** každé nově vytvořené komponenty
2. **Pokud > 100 řádků** → aplikuj refactoring znovu na tuto komponentu
3. **Rozděl velkou subkomponentu** na další subkomponenty
4. **Opakuj rekurzivně** dokud všechny komponenty nejsou < 100 řádků
5. **Zachovej Pure Orchestration Pattern** v každé úrovni

**Příklad rekurzivního postupu:**

```
1. ComponentName.tsx (985 řádků) → REFACTOR
   ├── Vytvořeny: ComponentContent, ComponentLoading, ComponentError, LargeSubComponent...

2. Zkontroluj velikosti nových komponent:
   ├── ComponentContent.tsx (80 řádků) ✅ OK
   ├── ComponentLoading.tsx (40 řádků) ✅ OK
   ├── ComponentError.tsx (30 řádků) ✅ OK
   ├── LargeSubComponent.tsx (150 řádků) → REFACTOR ZNOVU

3. Refaktoruj LargeSubComponent.tsx:
   ├── Vytvořeny: SubContent, SubActions, SubDetails
   └── Zkontroluj velikosti → vše < 100 řádků ✅

4. Konec - všechny komponenty < 100 řádků
```

### Fáze 4: Verification (Ověření)

1. **Zkontroluj orchestraci** - hlavní komponenta bez UI logiky
2. **Ověř subkomponenty** - každá má single responsibility
3. **Ověř rekurzivní refactoring** - žádná komponenta > 100 řádků
4. **Testuj funkcionalitu** - vše funguje jako předtím
5. **Validuj strukturu** proti guidelines

## 📏 Naming Conventions

### Soubory a adresáře

```bash
# Komponenty
ComponentName.tsx              # PascalCase - orchestrátor
ComponentNameContent.tsx       # PascalCase + Content - hlavní UI
ComponentNameLoading.tsx       # PascalCase + Loading - loading state
ComponentNameError.tsx         # PascalCase + Error - error state
ComponentNameItem.tsx          # PascalCase + Item - jednotlivé položky

# Hooks
useFeatureName.ts              # camelCase s use prefix

# Types
Feature.ts                     # PascalCase - hlavní interface
FeatureRole.ts                 # PascalCase - enums (bez .enums.ts přípony)

# Utils
featureUtils.ts                # camelCase + Utils
featureValidators.ts           # camelCase + Validators

# Constants
featureConfig.ts               # camelCase + Config
```

### Import Patterns

**Přímé importy z konkrétních souborů:**

```tsx
// ✅ Přímé importy z konkrétních souborů
import { UserProfileContent } from "./components/UserProfileContent";
import { UserProfileLoading } from "./components/UserProfileLoading";
import { useUserData } from "./hooks/useUserData";
import type { User } from "./types/User";

// ❌ Nepoužívej barrel exports nebo index.ts soubory
import { UserProfileContent, UserProfileLoading } from "./components";
```

## 🔧 Code Organization Principles

### Single Responsibility Principle (SRP)

```tsx
// ❌ ŠPATNĚ - handle funkce v komponentě (míchání UI a business logic)
const UserProfile = () => {
  const { user, loading, error } = useUserData();

  const handleUpdate = () => {
    // ❌ Business logic v UI komponentě
    console.log("updating user");
    updateUserAPI(user);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h1>{user.name}</h1>
      <button onClick={handleUpdate}>Update</button> // ❌ UI používá business logic
    </div>
  );
};

// ✅ DOBRĚ - oddělené hooks podle zodpovědnosti
const UserProfile = () => {
  const userData = useUserData(); // ✅ Data fetching hook
  const userActions = useUserActions(); // ✅ Actions hook

  return (
    // ✅ Pouze orchestrace
    <UserProfileContent
      user={userData.user}
      loading={userData.loading}
      error={userData.error}
      actions={userActions} // ✅ Předávání actions objektu
    />
  );
};
```

### Constants Usage

**Nevytvářej zbytečné konstanty - pokud se hodnota používá pouze jednou, použij ji inline:**

```tsx
// ❌ ŠPATNĚ - zbytečná konstanta pro jednorázové použití
const BUTTON_TEXT = "Submit";
const BUTTON_CLASS = "btn-primary";

return <button className={BUTTON_CLASS}>{BUTTON_TEXT}</button>;

// ✅ DOBRĚ - inline hodnoty pro jednorázové použití
return <button className="btn-primary">Submit</button>;

// ✅ DOBRĚ - konstanta pouze pokud se používá vícekrát
const API_BASE_URL = "https://api.example.com";

const fetchUser = () => fetch(`${API_BASE_URL}/user`);
const fetchPosts = () => fetch(`${API_BASE_URL}/posts`);
```

**Kdy použít konstanty:**

- ✅ **Vícekrát používané hodnoty** (API URLs, config objekty, opakující se texty)
- ✅ **Konfigurační hodnoty** (thresholds, limits, default values)
- ✅ **Sdílené hodnoty** mezi komponentami

**Kdy NEpoužívat konstanty:**

- ❌ **Jednorázové hodnoty** (text tlačítka, CSS třídy)
- ❌ **Inline styly** nebo jednoduché řetězce
- ❌ **Hodnoty specifické pouze pro jednu komponentu** bez opětovného použití

## 🎯 Data Colocation Principle

**Data a hooks se načítají tam, kde se používají** - colocation zlepšuje výkon a snižuje nepotřebné props drilling.

### 📜 Pravidla pro zamezení props drilling:

1. **❌ NIKDY nepředávat konstanty jako props** - konstanty patří dovnitř komponenty
2. **❌ NIKDY nepředávat data, která komponenta nepoužívá** - jen pro drilling dál
3. **✅ Hooks tam, kde se používají** - ne v orchestrátoru
4. **✅ Konstanty uvnitř komponent** - kde se čtou
5. **✅ Pouze callbacks a primitive values** - přes props

```tsx
// ❌ ŠPATNĚ - Props drilling konstant
export const NavbarOrchestrator = () => {
  return (
    <NavbarContent
      items={NAV_ITEMS}        // ❌ Konstanta jako prop
      tags={SEARCH_TAGS}       // ❌ Konstanta jako prop
      config={CONFIG}          // ❌ Konstanta jako prop
    />
  );
};

// ✅ SPRÁVNĚ - Konstanty uvnitř komponent
export const NavbarOrchestrator = () => {
  return <NavbarContent />;  // ✅ Žádné konstanty
};

// NavbarContent.tsx
import { NAV_ITEMS } from '../constants/navItems';

export const NavbarContent = () => {
  return (
    <div>
      {NAV_ITEMS.map(item => ...)}  // ✅ Konstanta použita přímo
    </div>
  );
};
```

### ✅ SPRÁVNĚ - Každý hook tam, kde se používá

```tsx
// ComponentName.tsx - HLAVNÍ ORCHESTRÁTOR (pouze data fetching)
export const ComponentName = ({ onChange, title }) => {
  const { data, loading, error } = useComponentData(); // ✅ Data fetching zde

  if (loading) return <ComponentLoading />;
  if (error) return <ComponentError error={error} />;

  return (
    <ComponentContent
      title={title}
      data={data} // ✅ Data předána pouze sem
      onChange={onChange} // ✅ Callback předán pouze sem
    />
  );
};

// ComponentContent.tsx - ACTIONS HOOK ZDE (kde se používá)
export const ComponentContent = ({ title, data, onChange }) => {
  const actions = useComponentActions(onChange); // ✅ Actions hook zde

  return (
    <div>
      <h1>{title}</h1>
      <button onClick={actions.handleClick}>Click me</button> // ✅ Actions se používají
      zde
      {data.map((item) => (
        <ComponentItem key={item.id} item={item} />
      ))}
    </div>
  );
};
```

### ❌ ŠPATNĚ - Hooks v hlavní komponentě, zbytečné props drilling

```tsx
// ❌ Actions hook v hlavní komponentě
const ComponentName = ({ onChange, title }) => {
  const { data, loading, error } = useComponentData();
  const actions = useComponentActions(onChange); // ❌ Hook daleko od použití

  return (
    <ComponentContent
      title={title}
      data={data}
      actions={actions} // ❌ Zbytečné props drilling
    />
  );
};
```

```tsx
// BadComponent.tsx - HLAVNÍ ORCHESTRÁTOR (pouze data fetching)
export const BadComponent = ({ onChange, title }) => {
  const { items, loading, error } = useBadComponentData(); // ✅ Data fetching zde

  if (loading) return <BadComponentLoading />;
  if (error) return <BadComponentError error={error} />;

  return (
    <BadComponentContent
      title={title}
      items={items} // ✅ Data předána pouze sem
      onChange={onChange} // ✅ Callback předán pouze sem
    />
  );
};

// BadComponentContent.tsx - ACTIONS HOOK ZDE (kde se používá)
export const BadComponentContent = ({ title, items, onChange }) => {
  const actions = useBadComponentActions(onChange); // ✅ Actions hook zde

  return (
    <div>
      <h1>{title}</h1>
      <button onClick={actions.handleClick}>Click me</button> // ✅ Actions se používají
      zde
      {items.map((item) => (
        <BadComponentItem key={item.id} item={item} />
      ))}
    </div>
  );
};
```

### ❌ ŠPATNĚ - Hooks v hlavní komponentě, zbytečné props drilling

```tsx
// ❌ Actions hook v hlavní komponentě
const BadComponent = ({ onChange, title }) => {
  const { items, loading, error } = useBadComponentData();
  const actions = useBadComponentActions(onChange); // ❌ Hook daleko od použití

  return (
    <BadComponentContent
      title={title}
      items={items}
      actions={actions} // ❌ Zbytečné props drilling
    />
  );
};
```

### Princip colocation:

- **Data fetching** → v hlavní komponentě (jedno místo pro všechna data)
- **Actions/User interactions** → v komponentě, která je používá
- **Conditional rendering** → v hlavní komponentě (loading/error stavy)
- **Konstanty (NAV_ITEMS, CONFIG)** → uvnitř komponenty, která je používá (NIKDY jako props!)
- **Props drilling** → minimalizovat, předávat pouze nezbytné callbacky a primitive values
- **Performance** → méně re-renderů díky lokálním hooks a žádnému props drilling

### 🚫 Anti-pattern: Props Drilling konstant

```tsx
// ❌ ŠPATNĚ - Konstanty jako props (props drilling)
export const Navbar = () => {
  return (
    <NavbarContent
      navItems={NAV_ITEMS}           // ❌ Props drilling
      mobileItems={MOBILE_NAV_ITEMS} // ❌ Props drilling (NEPOUŽÍVAT - slučovat konstanty)
      searchTags={SEARCH_TAGS}       // ❌ Props drilling
    />
  );
};

// ✅ SPRÁVNĚ - Konstanty uvnitř komponent (Data Colocation)
export const Navbar = () => {
  return <NavbarContent />;  // ✅ Žádné props drilling
};

// NavbarContent.tsx
import { NAV_ITEMS } from '../constants/navItems';

export const NavbarContent = () => {
  return <nav>{NAV_ITEMS.map(item => ...)}</nav>;  // ✅ Konstanta přímo zde
};
```

## 📊 Performance Guidelines

### Component Splitting pro lepší performance

```tsx
// ✅ Každý UI stav = samostatná komponenta = lepší re-rendering
const ComponentName = ({ data, loading, error }) => {
  if (loading) return <ComponentLoading />;
  if (error) return <ComponentError error={error} />;
  return <ComponentContent data={data} />;
};

// ✅ Každá položka = samostatná komponenta = lepší memoization
const ComponentContent = ({ data }) => (
  <ul>
    {data.map((item) => (
      <ComponentItem key={item.id} item={item} />
    ))}
  </ul>
);
```

## 📦 TypeScript Guidelines

### STRIKTNÍ pravidla pro TypeScript (POVINNÉ)

**TypeScript má být maximálně strict - žádné "any" shortcuts!**

#### 1. ❌ ZAKÁZAT `any` type

```tsx
// ❌ ŠPATNĚ - any je zakázáno
const handleData = (data: any) => {
  return data.value;
};

// ✅ SPRÁVNĚ - Explicitní type/interface
interface UserData {
  value: string;
  id: number;
}

const handleData = (data: UserData) => {
  return data.value;
};

// ✅ SPRÁVNĚ - Generic pro flexibilitu
const handleData = <T extends { value: string }>(data: T) => {
  return data.value;
};
```

#### 2. ✅ Preferovat explicitní typy/modely (interface, type)

```tsx
// ✅ SPRÁVNĚ - Vytvoř model pro data
interface User {
  id: number;
  name: string;
  email: string;
  role: UserRole;
}

enum UserRole {
  ADMIN = "admin",
  USER = "user",
  GUEST = "guest",
}

// ✅ SPRÁVNĚ - Type pro props
interface UserProfileProps {
  user: User;
  onUpdate: (userId: number, data: Partial<User>) => void;
}

// ❌ ŠPATNĚ - Inline types bez modelů
const UserProfile = ({ user, onUpdate }: { user: any; onUpdate: Function }) => {
  // ...
};
```

#### 3. ✅ `unknown` pouze jako POSLEDNÍ možnost

```tsx
// ✅ SPRÁVNĚ - unknown když typ opravdu neznáme (API response)
const parseApiResponse = (response: unknown) => {
  // Type guard pro safe parsing
  if (typeof response === "object" && response !== null && "data" in response) {
    return response.data;
  }
  throw new Error("Invalid response");
};

// ✅ LEPŠÍ - Definuj expected type
interface ApiResponse<T> {
  data: T;
  status: number;
}

const parseApiResponse = <T,>(response: ApiResponse<T>): T => {
  return response.data;
};

// ❌ ŠPATNĚ - unknown když známe typ
const handleUser = (user: unknown) => {
  // měli bychom znát User interface!
};
```

#### 4. ✅ Explicitní return types u funkcí

```tsx
// ✅ SPRÁVNĚ - Explicitní return type
const calculateTotal = (items: Item[]): number => {
  return items.reduce((sum, item) => sum + item.price, 0);
};

// ✅ SPRÁVNĚ - Explicitní return type pro async
const fetchUser = async (id: number): Promise<User> => {
  const response = await fetch(`/api/users/${id}`);
  return response.json();
};

// ✅ SPRÁVNĚ - Explicitní void pro side effects
const logUser = (user: User): void => {
  console.log(user.name);
};

// ❌ ŠPATNĚ - Implicitní return type
const calculateTotal = (items: Item[]) => {
  return items.reduce((sum, item) => sum + item.price, 0);
};
```

#### 5. TypeScript strict mode v tsconfig.json

```json
{
  "compilerOptions": {
    "strict": true,
    "noImplicitAny": true,
    "strictNullChecks": true,
    "strictFunctionTypes": true,
    "strictPropertyInitialization": true,
    "noImplicitThis": true,
    "alwaysStrict": true
  }
}
```

### TypeScript checklist:

- ✅ **Žádné `any`** - vždy explicitní type nebo generic
- ✅ **Modely pro data** - interface/type pro všechny entity
- ✅ **Props interfaces** - každá komponenta má Props interface
- ✅ **Return types** - explicitní return type u všech funkcí
- ✅ **Type guards** - pro unknown/union types
- ✅ **Enums** - pro konstantní sady hodnot (UserRole, Status)
- ✅ **Generics** - pro reusable komponenty/funkce
- ❌ **Žádné @ts-ignore** - vždy fix problém, ne suppress

## ♿ Accessibility (a11y) Guidelines

### POVINNÉ accessibility požadavky

**Web musí být přístupný všem uživatelům - klávesnice, screen readers, zrakově postižení**

#### 1. ✅ ARIA labels POVINNÉ pro interaktivní elementy

```tsx
// ✅ SPRÁVNĚ - ARIA label pro button bez textu
<button
  onClick={handleClose}
  aria-label="Zavřít dialog"
  className="p-2 rounded-full hover:bg-gray-100"
>
  <IoClose className="w-6 h-6" />
</button>

// ✅ SPRÁVNĚ - ARIA label pro search input
<input
  type="search"
  aria-label="Hledat recepty"
  placeholder="Zadejte název receptu..."
  className="w-full px-4 py-2"
/>

// ❌ ŠPATNĚ - Chybí aria-label
<button onClick={handleClose}>
  <IoClose className="w-6 h-6" />
</button>
```

#### 2. ✅ Semantic HTML (button ne div onClick)

```tsx
// ✅ SPRÁVNĚ - Semantic button
<button
  onClick={handleSubmit}
  disabled={loading}
  className="bg-primary text-white px-6 py-2 rounded"
>
  Odeslat
</button>

// ✅ SPRÁVNĚ - Link pro navigaci
<Link href="/recipes" className="text-primary hover:underline">
  Všechny recepty
</Link>

// ❌ ŠPATNĚ - div s onClick (není přístupné klávesnicí)
<div onClick={handleSubmit} className="bg-primary text-white px-6 py-2 rounded">
  Odeslat
</div>

// ❌ ŠPATNĚ - span jako button
<span onClick={handleClose} className="cursor-pointer">
  Zavřít
</span>
```

#### 3. ✅ Keyboard navigation support

```tsx
// ✅ SPRÁVNĚ - Keyboard support (Enter, Escape)
export const Modal = ({ isOpen, onClose, children }: ModalProps) => {
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  return (
    <div role="dialog" aria-modal="true">
      {children}
    </div>
  );
};

// ✅ SPRÁVNĚ - Tab navigation pro dropdown
export const Dropdown = ({ items }: DropdownProps) => {
  const [focusedIndex, setFocusedIndex] = useState(0);

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setFocusedIndex((prev) => (prev + 1) % items.length);
    }
    if (e.key === "ArrowUp") {
      e.preventDefault();
      setFocusedIndex((prev) => (prev - 1 + items.length) % items.length);
    }
    if (e.key === "Enter") {
      items[focusedIndex].onClick();
    }
  };

  return (
    <div role="menu" onKeyDown={handleKeyDown}>
      {items.map((item, index) => (
        <div
          key={item.id}
          role="menuitem"
          tabIndex={index === focusedIndex ? 0 : -1}
        >
          {item.label}
        </div>
      ))}
    </div>
  );
};
```

#### 4. ✅ Focus management

```tsx
// ✅ SPRÁVNĚ - Focus první input po otevření modalu
export const LoginModal = ({ isOpen, onClose }: ModalProps) => {
  const emailInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      // PERFORMANCE: Focus po otevření
      setTimeout(() => emailInputRef.current?.focus(), 50);
    }
  }, [isOpen]);

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <input
        ref={emailInputRef}
        type="email"
        aria-label="Email"
        placeholder="váš@email.cz"
      />
    </Modal>
  );
};

// ✅ SPRÁVNĚ - Trap focus uvnitř modalu
export const Modal = ({ isOpen, children, onClose }: ModalProps) => {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return;

    const focusableElements = modalRef.current?.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );

    const firstElement = focusableElements?.[0] as HTMLElement;
    const lastElement = focusableElements?.[
      focusableElements.length - 1
    ] as HTMLElement;

    const handleTabKey = (e: KeyboardEvent) => {
      if (e.key !== "Tab") return;

      if (e.shiftKey && document.activeElement === firstElement) {
        e.preventDefault();
        lastElement?.focus();
      } else if (!e.shiftKey && document.activeElement === lastElement) {
        e.preventDefault();
        firstElement?.focus();
      }
    };

    document.addEventListener("keydown", handleTabKey);
    return () => document.removeEventListener("keydown", handleTabKey);
  }, [isOpen]);

  return (
    <div ref={modalRef} role="dialog" aria-modal="true">
      {children}
    </div>
  );
};
```

### Accessibility checklist:

- ✅ **ARIA labels** - na všech buttons bez textu, inputs, interaktivních elementech
- ✅ **Semantic HTML** - button/a/input místo div/span s onClick
- ✅ **Keyboard navigation** - Tab, Enter, Escape, Arrow keys
- ✅ **Focus management** - focus první element v modalu, trap focus
- ✅ **Color contrast** - min 4.5:1 pro text, 3:1 pro UI elementy
- ✅ **Alt text** - pro všechny images
- ✅ **Role attributes** - dialog, menu, menuitem, navigation
- ✅ **aria-hidden** - pro dekorativní elementy
- ✅ **Skip links** - pro přeskočení navigace

## 🎨 Styling Guidelines

### ⚠️ **STRIKTNÍ STYLING PRAVIDLA**

**VÝHRADNĚ styluj pomocí Tailwind CSS - žádné custom CSS nebo inline styles!**

- ✅ **Pouze Tailwind CSS** - žádné custom CSS soubory
- ✅ **Styly patří do `styles/` složky** - každý styl v samostatném souboru
- ✅ **Vždy použij existující styly** - nekopíruj, použij stávající Tailwind třídy
- ✅ **Tailwind first** - pokud lze styl nadefinovat v Tailwind, použij ho
- ✅ **Global styles do `src/styles/global.css`** nebo `src/app/global.css`

### CSS Architecture

**Vždy používej Tailwind CSS třídy místo custom CSS:**

```tsx
// ✅ DOBRĚ - Pouze Tailwind utility classes
<div className="bg-white dark:bg-slate-900 p-4 rounded-lg shadow-md">
  <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
    Title
  </h2>
</div>

// ❌ ŠPATNĚ - Žádné custom CSS nebo inline styles
<div style={{ backgroundColor: 'white', padding: '16px' }}>
  <h2 style={{ color: 'gray' }}>Title</h2>
</div>
```

### Používání existujících stylů

**VŽDY se dívej, jestli už styl existuje - nekopíruj, použij stávající!**

```tsx
// ✅ DOBRĚ - Použij existující Tailwind třídy
<div className="bg-white dark:bg-slate-900 p-4 rounded-lg shadow-md">
  <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
    Title
  </h2>
</div>

// ❌ ŠPATNĚ - Nekopíruj styly, použij existující
<div className="bg-white p-4 rounded shadow-md">
  <h2 className="text-xl font-semibold text-gray-800">
    Title
  </h2>
</div>
```

### Struktura stylů v komponentách

```
ComponentName/
├── ComponentName.tsx          # Hlavní komponenta - pouze Tailwind classes
├── styles/                    # 🎨 STYLY patří do styles/ složky
│   ├── ComponentName.ts       # Custom CSS jen pokud nelze použít Tailwind
│   └── animations.ts          # Animace a keyframes
├── components/                # Subkomponenty
├── types/                     # Types
├── hooks/                     # Hooks
├── utils/                     # Utility funkce (ne styly)
└── constants/                 # Konstanty
```

**Název souboru musí odpovídat názvu exportované proměnné (camelCase - malé písmeno):**

```typescript
// styles/componentNameStyles.ts
export const componentNameStyles = `...`;

// ❌ ŠPATNĚ - název souboru ≠ název proměnné
// styles/ComponentName.ts
export const myCustomStyles = `...`;

// ✅ DOBRĚ - název souboru odpovídá názvu proměnné (camelCase)
// styles/componentNameStyles.ts
export const componentNameStyles = `...`;
```

### Kdy použít custom CSS vs Tailwind

**✅ Vždy preferuj Tailwind CSS:**

- Layout, spacing, typography, colors
- Responsive design (`sm:`, `md:`, `lg:`)
- Dark mode (`dark:`)
- Hover/active states
- Animations via Tailwind classes

**✅ Pouze custom CSS pro:**

- Complex animations (keyframes)
- CSS custom properties
- Browser-specific fixes
- Global styles (scrollbar, focus, etc.)

**❌ Nikdy nepoužívej:**

- Inline styles (`style={{...}}`)
- Margin-top (`mt-*`) - použij `space-y-*` nebo `gap-*`
- Negative margins
- PX hodnoty mimo Tailwind utilities

### Conditional Styling - tailwind-variants (DOPORUČENO)

**Pro dynamické styly použij `tailwind-variants` knihovnu místo JavaScript funkcí:**

**Instalace:**

```bash
pnpm add tailwind-variants
```

**Příklad použití:**

```tsx
// ❌ ŠPATNĚ - JavaScript funkce pro podmíněné styly
export const getNavbarStyles = (scrolled: boolean) => ({
  nav: `fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
    scrolled
      ? "backdrop-blur-2xl bg-white/95 dark:bg-slate-900/95 shadow-2xl h-16"
      : "backdrop-blur-md bg-white/80 dark:bg-slate-900/80 shadow-lg h-20"
  }`,
});

// Komponenta
const styles = getNavbarStyles(scrolled);
return <nav className={styles.nav}>...</nav>;

// ✅ SPRÁVNĚ - tailwind-variants
import { tv } from "tailwind-variants";

const navbar = tv({
  base: "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
  variants: {
    scrolled: {
      true: "backdrop-blur-2xl bg-white/95 dark:bg-slate-900/95 shadow-2xl h-16 lg:h-20",
      false:
        "backdrop-blur-md bg-white/80 dark:bg-slate-900/80 shadow-lg h-20 lg:h-24",
    },
  },
  defaultVariants: {
    scrolled: false,
  },
});

// Komponenta
export const PublicNavbar = () => {
  const { scrolled } = useNavbarScroll();

  return <nav className={navbar({ scrolled })}>...</nav>;
};

// ✅ SPRÁVNĚ - Více variants
const button = tv({
  base: "px-4 py-2 rounded-lg font-medium transition-colors",
  variants: {
    variant: {
      primary: "bg-blue-500 text-white hover:bg-blue-600",
      secondary: "bg-gray-500 text-white hover:bg-gray-600",
      outline: "border border-blue-500 text-blue-500 hover:bg-blue-50",
    },
    size: {
      sm: "text-sm px-3 py-1.5",
      md: "text-base px-4 py-2",
      lg: "text-lg px-6 py-3",
    },
    disabled: {
      true: "opacity-50 cursor-not-allowed pointer-events-none",
    },
  },
  defaultVariants: {
    variant: "primary",
    size: "md",
  },
});

// Použití
<button className={button({ variant: "primary", size: "lg" })}>
  Click me
</button>;

// ✅ SPRÁVNĚ - Compound variants (kombinace variant)
const card = tv({
  base: "rounded-lg p-4",
  variants: {
    variant: {
      default: "bg-white dark:bg-slate-800",
      bordered: "border border-gray-200 dark:border-slate-700",
    },
    shadow: {
      sm: "shadow-sm",
      md: "shadow-md",
      lg: "shadow-lg",
    },
  },
  compoundVariants: [
    {
      variant: "bordered",
      shadow: "lg",
      class: "shadow-xl border-2",
    },
  ],
});
```

**Kdy použít tailwind-variants:**

- ✅ **Dynamické styly** - scrolled, open, active, variant
- ✅ **Více stavů** - kombinace variant (size + variant + disabled)
- ✅ **Compound variants** - speciální kombinace variant
- ✅ **Responsive variants** - různé styly na různých breakpointech
- ✅ **Reusable styles** - sdílené styly napříč komponentami

**Proč tailwind-variants:**

- ✅ **Type safety** - automatická TypeScript inference pro variants
- ✅ **IntelliSense** - autocomplete pro všechny variants
- ✅ **Performance** - optimalizované generování class names
- ✅ **Čitelnost** - jasná struktura base + variants
- ✅ **DRY** - žádné opakování podmínek
- ✅ **Purge CSS** - automatické odstranění nepoužitých tříd
- ✅ **Tailwind config** - respektuje theme, breakpoints

**❌ NEPOUŽÍVAT:**

- Samostatné funkce vracející styly (`getNavbarStyles()`)
- Template literals s podmínkami (`${scrolled ? '...' : '...'}`)
- `clsx/cn` pro složité varianty (použij tailwind-variants)

### Global Styles

**Global styles patří do `src/styles/global.css` nebo `src/app/global.css` podle best practices:**

```css
/* src/styles/global.css nebo src/app/global.css */
@tailwind base;
@tailwind components;
@tailwind utilities;

/* Custom scrollbar */
::-webkit-scrollbar {
  width: 6px;
}

/* Focus styles */
*:focus-visible {
  outline: 2px solid theme(colors.primary.DEFAULT);
}

/* CSS custom properties pro komplexní animace */
:root {
  --animation-duration: 300ms;
  --animation-easing: cubic-bezier(0.4, 0, 0.2, 1);
}
```

### Dark Mode

**Vždy podporuj dark mode:**

```tsx
// ✅ DOBRĚ - Dark mode variants
<div className="bg-white dark:bg-slate-900 text-gray-900 dark:text-gray-100">
  Content
</div>

// ❌ ŠPATNĚ - Bez dark mode
<div className="bg-white text-gray-900">
  Content
</div>
```

### Animations

**Používej Tailwind animace nebo Framer Motion:**

```tsx
// ✅ DOBRĚ - Tailwind animations
<div className="animate-pulse transition-all duration-300 hover:scale-105">
  Animated content
</div>

// ✅ DOBRĚ - Framer Motion pro komplexní animace
<motion.div
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  transition={{ duration: 0.5 }}
>
  Animated content
</motion.div>
```

### Best Practices

- **Mobile first** - začni simple, přidej responsive variants
- **Consistent spacing** - používej `gap-*` místo margins
- **Semantic colors** - používej theme colors, ne hardcoded hodnoty
- **Performance** - vyhýbej se expensive CSS properties
- **Accessibility** - testuj contrast ratios, focus states
- **Používej pravidla z copilot-instructions** pro konzistentní stylování

## 💬 Documentation Guidelines

### JSDoc komentáře pro komponenty a hooks

**Každá komponenta a hook musí mít JSDoc komentář:**

```tsx
/**
 * ComponentName - krátký popis co komponenta dělá
 *
 * @param title - titulek komponenty zobrazený v UI
 * @param onChange - callback volaný při změně (volitelný)
 *
 * @example
 * <ComponentName title="Items" onChange={handleChange} />
 */
export const ComponentName = ({ title, onChange }) => {
  // ...
};

/**
 * useComponentActions - hook pro správu akcí komponenty
 * Obsahuje business logic pro user interactions a event handlers
 *
 * @param onChange - callback pro externí změny (volitelný)
 * @returns objekt s action funkcemi { handleClick, handleSubmit }
 *
 * @example
 * const actions = useComponentActions(onChange);
 * actions.handleClick(); // zavolá onChange s "new value"
 */
export const useComponentActions = (onChange) => {
  // ...
};
```

### Komentáře v kódu

**Přidávej komentáře pouze pro komplexní logiku:**

```tsx
// ✅ DOBRĚ - komentář vysvětluje proč, ne co
const filteredData = data.filter((item) => {
  // Filtrovat pouze aktivní položky - neukazovat smazané v UI
  return item.status === "active" && !item.deleted;
});

// ❌ ŠPATNĚ - komentář opakuje co kód dělá
const filteredData = data.filter((item) => {
  // Filtrovat data podle statusu
  return item.status === "active";
});
```

### Performance komentáře

**Přidávaj komentáře pro performance optimalizace:**

```tsx
// PERFORMANCE: useMemo - přepočítávat pouze při změně dependencies
const expensiveValue = useMemo(() => {
  return heavyCalculation(data);
}, [data]);

// PERFORMANCE: useCallback - stable function reference (prevence re-renderů child komponent)
const handleClick = useCallback(() => {
  onChange?.(newValue);
}, [onChange]);

// PERFORMANCE: React.memo - component re-renderuje pouze při změně props
export const MyComponent = memo(({ data }: Props) => {
  return <div>{data}</div>;
});

// PERFORMANCE: cleanup v useEffect - prevence memory leaks
useEffect(() => {
  let isMounted = true;

  fetchData().then((result) => {
    if (isMounted) setData(result);
  });

  return () => {
    isMounted = false;
  };
}, []);
```

// ✅ useCallback - zabránit zbytečným re-renderům child komponent
const handleClick = useCallback(() => {
setCount((c) => c + 1);
}, []);

```

## 🧪 Testing Guidelines

### Struktura testů odpovídá komponentám

```

ComponentName/
├── ComponentName.test.tsx # Test orchestrátora
├── components/
│ ├── ComponentContent.test.tsx
│ ├── ComponentLoading.test.tsx
│ └── ComponentItem.test.tsx
├── hooks/
│ ├── useFeature.test.ts
└── **mocks**/
├── api.ts
└── data.ts

````

## ✅ Checklist pro Refactoring

**Před refactoringem:**

- [ ] Mám testy pro existující funkcionalitu?
- [ ] Spočítal jsem return statements?
- [ ] Identifikoval jsem conditional rendering?

**Během refactoringu:**

- [ ] Hlavní komponenta obsahuje POUZE orchestraci?
- [ ] Každý return statement je v samostatné subkomponentě?
- [ ] Žádné hooks v hlavní komponentě?
- [ ] Žádné conditional rendering v hlavní komponentě?

**Po refactoringu:**

- [ ] Hlavní komponenta má pouze 1 return statement?
- [ ] Všechny subkomponenty jsou v components/ adresáři?
- [ ] Importy jsou přímé z konkrétních souborů (bez index.ts)?
- [ ] Funkcionalita zůstala stejná?

**⚠️ Rekurzivní refactoring kontrola:**

- [ ] Zkontroloval jsem velikost všech nově vytvořených komponent?
- [ ] Žádná komponenta nemá > 100 řádků?
- [ ] Aplikoval jsem refactoring rekurzivně na velké subkomponenty?
- [ ] Všechny komponenty v hierarchii dodržují Pure Orchestration Pattern?

## 🌐 Context API Guidelines

### Kdy použít Context API

**Context API = globální state management pro data sdílená napříč mnoha komponentami**

#### ✅ Kdy použít Context:

- **Theme/Dark mode** - sdílený napříč celou aplikací
- **User authentication** - current user, permissions
- **Language/i18n** - aktuální jazyk
- **App-level settings** - preferences, config
- **Complex state** - shopping cart, form wizard

#### ❌ Kdy NEPOUŽÍVAT Context:

- **Konstanty** - použij Data Colocation (konstanty přímo v komponentě)
- **Props drilling 1-2 levels** - normální props jsou OK
- **Frequently changing data** - způsobí re-render všech consumers
- **Performance-critical data** - raději local state nebo React Query

### Typed Context Pattern (DOPORUČENÝ)

```tsx
// contexts/ThemeContext.tsx
import { createContext, useContext, useState, ReactNode } from 'react';

// 1. Definuj type pro context value
interface ThemeContextValue {
  theme: 'light' | 'dark';
  setTheme: (theme: 'light' | 'dark') => void;
  toggleTheme: () => void;
}

// 2. Vytvoř context s undefined (bude set v Provider)
const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

// 3. Provider komponenta s business logic
interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider = ({ children }: ThemeProviderProps) => {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  const value: ThemeContextValue = {
    theme,
    setTheme,
    toggleTheme,
  };

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};

// 4. Custom hook s type safety
export const useTheme = (): ThemeContextValue => {
  const context = useContext(ThemeContext);

  if (context === undefined) {
    throw new Error('useTheme must be used within ThemeProvider');
  }

  return context;
};
````

### Použití Typed Context:

```tsx
// App.tsx - Wrap aplikaci v Provider
export const App = () => {
  return (
    <ThemeProvider>
      <Router>
        <Layout />
      </Router>
    </ThemeProvider>
  );
};

// Layout.tsx - Použij custom hook
export const Layout = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className={theme === "dark" ? "dark" : ""}>
      <button onClick={toggleTheme}>Toggle Theme</button>
    </div>
  );
};
```

### Context pro app state, NE pro konstanty

```tsx
// ❌ ŠPATNĚ - Konstanty v Context (props drilling přes Context)
const NavContext = createContext({ navItems: NAV_ITEMS });

export const Navbar = () => {
  return (
    <NavContext.Provider value={{ navItems: NAV_ITEMS }}>
      <NavbarContent />
    </NavContext.Provider>
  );
};

// ✅ SPRÁVNĚ - Konstanty přímo v komponentě (Data Colocation)
import { NAV_ITEMS } from '../constants/navItems';

export const NavbarContent = () => {
  return (
    <nav>
      {NAV_ITEMS.map(item => ...)}
    </nav>
  );
};

// ✅ SPRÁVNĚ - Context pro app state
const AuthContext = createContext<AuthContextValue>();

export const App = () => {
  return (
    <AuthProvider>
      {/* user, permissions dostupné všude */}
      <Router />
    </AuthProvider>
  );
};
```

### Context checklist:

- ✅ **Typed Context** - vždy s TypeScript interface
- ✅ **Custom hook** - useTheme(), useAuth() místo přímého useContext
- ✅ **Error handling** - throw error pokud použito mimo Provider
- ✅ **Memoization** - useMemo pro context value pokud obsahuje objekty
- ❌ **Žádné konstanty** - konstanty patří do komponent (Data Colocation)
- ❌ **Žádný props drilling fix** - Context není náhrada za správnou architekturu

## ⚛️ Next.js Specific Guidelines

### Pouze pro Next.js projekty (app router)

**Next.js 13+ používá Server a Client Components - zásadní rozdíl!**

#### Server Components (default)

**Server Components = renderují se na serveru, žádný JavaScript na klientovi**

```tsx
// app/recipes/page.tsx - Server Component (default)
// ❌ ŽÁDNÁ "use client" directive
import { getRecipes } from "@/lib/api";

export default async function RecipesPage() {
  // ✅ SPRÁVNĚ - Data fetching přímo v komponentě (async/await)
  const recipes = await getRecipes();

  return (
    <div>
      <h1>Recepty</h1>
      {recipes.map((recipe) => (
        <RecipeCard key={recipe.id} recipe={recipe} />
      ))}
    </div>
  );
}

// components/RecipeCard.tsx - Server Component
interface RecipeCardProps {
  recipe: Recipe;
}

export const RecipeCard = ({ recipe }: RecipeCardProps) => {
  // ✅ Žádné hooks, žádné interactivity
  return (
    <div>
      <h2>{recipe.title}</h2>
      <p>{recipe.description}</p>
    </div>
  );
};
```

#### Client Components ("use client")

**Client Components = interaktivní, hooks, event handlers**

```tsx
// components/RecipeSearch.tsx - Client Component
"use client"; // ✅ POVINNÁ directive pro interaktivitu

import { useState } from "react";

export const RecipeSearch = () => {
  // ✅ SPRÁVNĚ - useState funguje jen v Client Components
  const [query, setQuery] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Search logic
  };

  return (
    <form onSubmit={handleSearch}>
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Hledat..."
      />
      <button type="submit">Hledat</button>
    </form>
  );
};
```

### Kdy použít "use client":

- ✅ **Hooks** - useState, useEffect, useCallback, useMemo, custom hooks
- ✅ **Event handlers** - onClick, onChange, onSubmit
- ✅ **Browser APIs** - window, localStorage, document
- ✅ **Third-party libraries** - většina React knihoven (ne všechny)
- ✅ **Interaktivita** - formuláře, dropdowns, modals

### Kdy NEPOUŽÍVAT "use client":

- ❌ **Static content** - jen zobrazení dat bez interaktivity
- ❌ **Data fetching** - lépe na serveru (async Server Component)
- ❌ **SEO-critical content** - Server Components jsou lepší pro SEO

### Data fetching patterns:

```tsx
// ✅ SPRÁVNĚ - Server Component s async/await
export default async function UserProfile({ params }: Props) {
  const user = await getUser(params.id);

  return <UserProfileClient user={user} />;
}

// ✅ SPRÁVNĚ - Client Component dostane data jako props
("use client");

export const UserProfileClient = ({ user }: { user: User }) => {
  const [editing, setEditing] = useState(false);

  return (
    <div>
      <h1>{user.name}</h1>
      <button onClick={() => setEditing(!editing)}>Edit</button>
    </div>
  );
};

// ❌ ŠPATNĚ - useEffect v Server Component (nefunguje)
export default function UserProfile({ params }: Props) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    getUser(params.id).then(setUser); // ❌ Server Component nemůže mít hooks
  }, []);

  return <div>{user?.name}</div>;
}
```

### Next.js checklist:

- ✅ **Server Components default** - nepoužívej "use client" pokud nepotřebuješ
- ✅ **Data fetching na serveru** - async Server Components místo useEffect
- ✅ **"use client" jen pro interaktivitu** - hooks, event handlers
- ✅ **Props z Server → Client** - předej data jako props
- ✅ **Metadata** - použij generateMetadata pro SEO
- ❌ **Žádné hooks v Server Components** - jen v Client Components
