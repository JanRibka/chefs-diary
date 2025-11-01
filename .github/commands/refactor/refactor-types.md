---
description: Refactor TypeScript types podle review pravidel
args:
  - name: typesPath
    description: Cesta k types souboru k refactoringu
    required: false
---

# 🔨 Types Refactoring{{#if typesPath}}: {{typesPath}}{{/if}}

Refactoruj {{#if typesPath}}**{{typesPath}}**{{else}}aktuálně otevřený types soubor{{/if}} podle review best practices.

## 🎯 Refactoring Checklist

**DŮLEŽITÉ:** Aplikuj VŠECHNA následující pravidla:

### 📁 Naming

- [ ] PascalCase types/interfaces
- [ ] NO `I` prefix (use `User`, not `IUser`)
- [ ] Proper suffixes (`Props`, `Dto`, `Response`)
- [ ] Descriptive generics (`TData` not just `T`)

### 💎 Type vs Interface

- [ ] Type pro unions/intersections/primitives/tuples
- [ ] Interface pro object shapes/props/extendable
- [ ] Interface pro extendable objekty

### 🎯 Design

- [ ] NO `any` (use `unknown`)
- [ ] Proper `?` vs `| undefined`
- [ ] `readonly` where immutable
- [ ] Discriminated unions
- [ ] Proper null handling

### 🛠️ Utility Types

- [ ] Use built-ins (Partial, Pick, Omit, Record)
- [ ] Custom reusable utilities
- [ ] Type guards pro runtime validation

### 🎣 Generics

- [ ] Constraints where needed
- [ ] Default types
- [ ] Descriptive names for complex
- [ ] NO unnecessary generics

### � Enums

- [ ] Prefer union types (`type Status = 'a' | 'b'`)
- [ ] Enums only for numeric/reverse mapping

### 🛡️ Type Safety

- [ ] Minimal `as` assertions
- [ ] NO `as any`
- [ ] Type guards
- [ ] Branded types for important primitives
- [ ] Proper narrowing

### 📚 Documentation

- [ ] JSDoc for complex types
- [ ] Property descriptions
- [ ] Examples for complex patterns

---

## 🔧 Refactoring Steps

**Krok 1: Analyze** - identifikuj všechny problémy z review  
**Krok 2: Fix Naming** - přejmenuj podle konvencí  
**Krok 3: Type vs Interface** - rozděl správně  
**Krok 4: Remove Any** - nahraď `any` za `unknown` nebo specifické typy  
**Krok 5: Add Safety** - přidej type guards a branded types  
**Krok 6: Document** - přidej JSDoc kde potřeba

---

## 📝 Výstup

Vytvoř refactorovaný types soubor který:

1. **Splňuje všechny body checklistu**
2. **Má strukturu:**

```typescript
// Imports
import type { ReactNode } from "react";

// Union types (prefer over enums)
export type UserRole = "admin" | "user" | "guest";
export type LoadingState = "idle" | "loading" | "success" | "error";

// Branded types for type safety
export type UserId = string & { readonly __brand: "UserId" };
export type Email = string & { readonly __brand: "Email" };

// Interfaces for object shapes
export interface User {
  readonly id: UserId;
  readonly email: Email;
  readonly name: string;
  readonly role: UserRole;
  readonly createdAt: Date;
}

// Discriminated unions
export type AsyncData<T> =
  | { status: "idle" }
  | { status: "loading" }
  | { status: "success"; data: T }
  | { status: "error"; error: Error };

// Generic constraints
export interface ApiResponse<TData = unknown> {
  data: TData;
  message: string;
  statusCode: number;
}

// Utility types
export type PublicUser = Omit<User, "createdAt">;
export type UserUpdate = Partial<Pick<User, "name" | "email">>;
export type UserMap = Record<UserId, User>;

// Type guards
export function isUser(value: unknown): value is User {
  return (
    typeof value === "object" &&
    value !== null &&
    "id" in value &&
    "email" in value &&
    "name" in value &&
    "role" in value
  );
}

export function isUserId(value: unknown): value is UserId {
  return typeof value === "string" && value.length > 0;
}

// Component props interfaces
export interface ButtonProps {
  children: ReactNode;
  variant?: "primary" | "secondary";
  size?: "sm" | "md" | "lg";
  disabled?: boolean;
  onClick?: () => void;
}
```

3. **Má dokumentaci:**

```typescript
/**
 * User entity representing a system user
 * @property id - Unique branded identifier
 * @property email - Validated email address
 * @property name - Display name
 * @property role - User permissions level
 * @property createdAt - Account creation timestamp
 */
export interface User {
  readonly id: UserId;
  readonly email: Email;
  readonly name: string;
  readonly role: UserRole;
  readonly createdAt: Date;
}

/**
 * Type guard to check if unknown value is a valid User
 * @param value - Value to check
 * @returns True if value is User object
 *
 * @example
 * if (isUser(data)) {
 *   console.log(data.name); // TypeScript knows it's User
 * }
 */
export function isUser(value: unknown): value is User {
  // implementation
}
```

4. **Splňuje type safety kritéria:**

- NO `any` types
- Branded types pro důležité primitivy
- Type guards pro runtime validation
- Discriminated unions místo enums
- Proper readonly usage

---

## ✅ Verification

Po refactoringu zkontroluj:

- [ ] Prochází `review-types.md` s 8+/10?
- [ ] Žádné `any` types?
- [ ] NO `I` prefix na interfaces?
- [ ] Proper type guards?
- [ ] JSDoc dokumentace?

**Pokud ANO všude → refactoring HOTOV ✅**
