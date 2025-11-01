---
description: Refactor Zustand store podle review pravidel
args:
  - name: storePath
    description: Cesta k store k refactoringu
    required: false
---

# 🔨 Zustand Store Refactoring{{#if storePath}}: {{storePath}}{{/if}}

Refactoruj {{#if storePath}}**{{storePath}}**{{else}}aktuálně otevřený Zustand store{{/if}} podle review best practices.

## 🎯 Refactoring Checklist

**DŮLEŽITÉ:** Aplikuj VŠECHNA následující pravidla:

### 📁 Naming

- [ ] Store hook: `use{Feature}Store`
- [ ] State properties: descriptive
- [ ] Actions: verb-based (`setUser`, `updateSettings`, `resetStore`)
- [ ] Selectors: `select{Property}`

### 💎 TypeScript

- [ ] Strongly typed state interface
- [ ] Typed actions
- [ ] Proper return types
- [ ] Generic `StoreApi<T>`
- [ ] NO `any`

### 🏗️ Structure

- [ ] Flat state (avoid deep nesting)
- [ ] Actions co-located with state
- [ ] Selectors separate or inline
- [ ] Proper state shape

### ⚙️ Actions

- [ ] Pure updates via `set/get`
- [ ] Immutable updates (spread operator)
- [ ] Batch updates where needed
- [ ] Async actions properly handled

### 🎣 Selectors

- [ ] Shallow selectors for performance
- [ ] Computed values via selectors
- [ ] `useShallow` for multiple values
- [ ] Avoid selecting entire state

### 🚀 Performance

- [ ] Slice pattern for large stores
- [ ] Selective subscriptions
- [ ] `persist` middleware properly configured
- [ ] Devtools in dev only

### 🔄 Side Effects

- [ ] Async actions in store actions (not components)
- [ ] Proper error handling
- [ ] Loading states
- [ ] Optimistic updates where appropriate

### 💾 Persistence

- [ ] `persist` middleware config (storage, partialize, merge)
- [ ] Migration strategy
- [ ] Sensitive data NOT persisted

### 🐛 DevTools

- [ ] `devtools` middleware in dev
- [ ] Meaningful action names
- [ ] Proper store name

### 🧪 Testing

- [ ] Store testable without React
- [ ] Actions unit testable
- [ ] State transformations predictable

---

## 🔧 Refactoring Steps

**Krok 1: Analyze** - identifikuj všechny problémy z review  
**Krok 2: Fix Naming** - přejmenuj podle konvencí  
**Krok 3: Add Types** - doplň všechny missing types  
**Krok 4: Fix Structure** - zploště state, přesuň actions  
**Krok 5: Optimize Performance** - přidej selectors, useShallow  
**Krok 6: Add Persistence** - nakonfiguruj persist správně  
**Krok 7: Add DevTools** - přidej devtools middleware

---

## 📝 Výstup

Vytvoř refactorovaný Zustand store který:

1. **Splňuje všechny body checklistu**
2. **Má strukturu:**

```typescript
// Imports
import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import type { User, ApiError } from "../types";

// Types
interface UserState {
  // State
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: ApiError | null;
  lastLoginAt: Date | null;

  // Actions
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  updateUser: (updates: Partial<User>) => void;
  clearError: () => void;
  refreshUser: () => Promise<void>;
}

// Store implementation
export const useUserStore = create<UserState>()(
  devtools(
    persist(
      (set, get) => ({
        // Initial state
        user: null,
        isAuthenticated: false,
        isLoading: false,
        error: null,
        lastLoginAt: null,

        // Actions
        login: async (email: string, password: string) => {
          set({ isLoading: true, error: null }, false, "user/login/start");

          try {
            const response = await api.login({ email, password });
            const user = response.data;

            set(
              {
                user,
                isAuthenticated: true,
                isLoading: false,
                lastLoginAt: new Date(),
              },
              false,
              "user/login/success"
            );
          } catch (error) {
            const apiError = error as ApiError;
            set(
              {
                error: apiError,
                isLoading: false,
                isAuthenticated: false,
              },
              false,
              "user/login/error"
            );
          }
        },

        logout: () => {
          set(
            {
              user: null,
              isAuthenticated: false,
              error: null,
              lastLoginAt: null,
            },
            false,
            "user/logout"
          );
        },

        updateUser: (updates) => {
          const currentUser = get().user;
          if (currentUser) {
            const updatedUser = { ...currentUser, ...updates };
            set({ user: updatedUser }, false, "user/update");
          }
        },

        clearError: () => {
          set({ error: null }, false, "user/clearError");
        },

        refreshUser: async () => {
          const currentUser = get().user;
          if (!currentUser) return;

          set({ isLoading: true }, false, "user/refresh/start");

          try {
            const response = await api.getUser(currentUser.id);
            set(
              {
                user: response.data,
                isLoading: false,
              },
              false,
              "user/refresh/success"
            );
          } catch (error) {
            set(
              {
                error: error as ApiError,
                isLoading: false,
              },
              false,
              "user/refresh/error"
            );
          }
        },
      }),
      {
        name: "user-store",
        version: 1,
        partialize: (state) => ({
          // Only persist non-sensitive data
          user: state.user
            ? {
                ...state.user,
                // Remove sensitive fields like tokens
                sessionToken: undefined,
              }
            : null,
          lastLoginAt: state.lastLoginAt,
        }),
        // Migration for future versions
        migrate: (persistedState: any, version: number) => {
          if (version === 0) {
            // Migration logic for version 0 to 1
            return {
              ...persistedState,
              lastLoginAt: persistedState.lastLoginAt || null,
            };
          }
          return persistedState;
        },
      }
    ),
    {
      name: "user-store",
      enabled: process.env.NODE_ENV === "development",
    }
  )
);

// Selectors
export const selectUser = (state: UserState) => state.user;
export const selectIsAuthenticated = (state: UserState) =>
  state.isAuthenticated;
export const selectUserLoading = (state: UserState) => state.isLoading;
export const selectUserError = (state: UserState) => state.error;
export const selectLastLoginAt = (state: UserState) => state.lastLoginAt;

// Computed selectors
export const selectUserDisplayName = (state: UserState) =>
  state.user ? `${state.user.firstName} ${state.user.lastName}` : "Guest";

export const selectIsUserActive = (state: UserState) =>
  state.isAuthenticated && state.user?.status === "active";

export const selectUserInitials = (state: UserState) => {
  if (!state.user) return "GU";
  return `${state.user.firstName[0]}${state.user.lastName[0]}`.toUpperCase();
};
```

3. **Má dokumentaci:**

````typescript
/**
 * User store for managing authentication and user data.
 *
 * Features:
 * - Authentication (login/logout)
 * - User data management
 * - Error handling
 * - Persistence (non-sensitive data only)
 * - DevTools integration
 *
 * @example
 * ```tsx
 * const user = useUserStore(selectUser);
 * const login = useUserStore(state => state.login);
 *
 * // Login
 * await login('user@example.com', 'password');
 *
 * // Get user data
 * if (user) {
 *   console.log(user.name);
 * }
 * ```
 */
export const useUserStore = create<UserState>()(/* ... */);
````

4. **Splňuje performance kritéria:**

- Immutable updates via spread operator
- Selective selectors
- `useShallow` for multiple values
- DevTools only in development
- Proper persistence configuration

---

## ✅ Verification

Po refactoringu zkontroluj:

- [ ] Prochází `review-zustand.md` s 8+/10?
- [ ] NO direct state mutations?
- [ ] Immutable updates (spread operator)?
- [ ] Selective subscriptions?
- [ ] Persist only non-sensitive data?
- [ ] DevTools configured properly?

**Pokud ANO všude → refactoring HOTOV ✅**
