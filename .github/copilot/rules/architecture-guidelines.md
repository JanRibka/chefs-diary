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

- **🏗️ Architecture Patterns** - Pure Orchestration, Data Colocation, Component Splitting
- **📁 Folder Structure** - Multi-file komponenty, hooks, types, styles organizace
- **🎨 Styling Guidelines** - Tailwind CSS first, žádné custom CSS
- **💬 Documentation** - JSDoc komentáře, performance komentáře
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

**Toto platí pro všechny review a refactor pravidla!**

## 📁 Folder Structure Standards

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

- ❌ **NEobsahuje** žádnou UI logiku (renderItem, handleClick, return statements)
- ❌ **NEobsahuje** žádné hooks (useState, useEffect)
- ❌ **NEobsahuje** žádné conditional rendering (if loading, if error)
- ✅ **Pouze koordinuje** hooks a subkomponenty
- ✅ **Pouze předává** props subkomponentám

```tsx
// ✅ UserProfile.tsx - ČISTÝ ORCHESTRÁTOR
export const UserProfile = () => {
  // 1. Používá hooks pro business logic
  const userData = useUserData();
  const userActions = useUserActions();

  // 2. ŽÁDNÁ vlastní logika - pouze orchestrace
  return (
    <UserProfileContent
      user={userData.user}
      loading={userData.loading}
      error={userData.error}
      onUpdate={userActions.updateUser}
    />
  );
};
```

### 2. Subkomponenty pro všechny UI stavy

**Každý UI stav má vlastní subkomponentu:**

```tsx
// components/UserProfileContent.tsx - UI pro obsah
export const UserProfileContent = ({ user, onUpdate }: ContentProps) => {
  return (
    <div>
      <h1>{user.name}</h1>
      <button onClick={() => onUpdate(user)}>Update</button>
    </div>
  );
};

// components/UserProfileLoading.tsx - Loading state
export const UserProfileLoading = () => {
  return <div>Loading user profile...</div>;
};

// components/UserProfileError.tsx - Error state
export const UserProfileError = ({ error, onRetry }: ErrorProps) => {
  return (
    <div>
      <p>Error: {error}</p>
      <button onClick={onRetry}>Retry</button>
    </div>
  );
};
```

### 3. Hooks jako Business Logic Layer

**Každý hook má POUZE JEDNU specifickou zodpovědnost:**

#### ✅ useFeatureData.ts - Pouze DATA fetching a state management

```tsx
// hooks/useUserData.ts - JEN data fetching
export const useUserData = (userId: string) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Pouze fetching dat
    fetchUser(userId).then(setUser).catch(setError);
  }, [userId]);

  return { user, loading, error };
};
```

#### ✅ useFeatureActions.ts - Pouze USER INTERACTIONS a event handlers

```tsx
// hooks/useUserActions.ts - JEN user actions
export const useUserActions = (onChange?: (value: string) => void) => {
  const handleClick = () => {
    console.log("clicked");
    onChange?.("new value");
  };

  const handleSubmit = (data: FormData) => {
    // API call pro submit
    submitData(data);
  };

  return { handleClick, handleSubmit };
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
- **Props drilling** → minimalizovat, předávat pouze nezbytné callbacky
- **Performance** → méně re-renderů díky lokálním hooks

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

**Přidávej komentáře pro performance optimalizace:**

```tsx
// ✅ useMemo - přepočítávat pouze při změně dependencies
const expensiveValue = useMemo(() => {
  return heavyCalculation(data);
}, [data]);

// ✅ useCallback - zabránit zbytečným re-renderům child komponent
const handleClick = useCallback(() => {
  setCount((c) => c + 1);
}, []);
```

## 🧪 Testing Guidelines

### Struktura testů odpovídá komponentám

```
ComponentName/
├── ComponentName.test.tsx      # Test orchestrátora
├── components/
│   ├── ComponentContent.test.tsx
│   ├── ComponentLoading.test.tsx
│   └── ComponentItem.test.tsx
├── hooks/
│   ├── useFeature.test.ts
└── __mocks__/
    ├── api.ts
    └── data.ts
```

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
