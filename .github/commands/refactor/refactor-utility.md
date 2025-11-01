---
description: Refactor utility function podle review pravidel
args:
  - name: utilityPath
    description: Cesta k utility k refactoringu
    required: false
---

# 🔨 Utility Refactoring{{#if utilityPath}}: {{utilityPath}}{{/if}}

Refactoruj {{#if utilityPath}}**{{utilityPath}}**{{else}}aktuálně otevřenou utility funkci{{/if}} podle review best practices.

## 🎯 Refactoring Checklist

**DŮLEŽITÉ:** Aplikuj VŠECHNA následující pravidla:

### 📁 Naming

- [ ] Function: camelCase, verb-based (`formatDate`, `validateEmail`)
- [ ] Booleans: `is*/has*/can*`
- [ ] Transformers: `to*/parse*/convert*`
- [ ] NO abbreviations

### 💎 TypeScript

- [ ] Explicit param types
- [ ] Explicit return type
- [ ] Generics for reusable
- [ ] Type guards
- [ ] NO `any` (use `unknown`)

### ⚙️ Design

- [ ] Pure function (no side effects)
- [ ] Same input = same output
- [ ] Single responsibility
- [ ] NO external state mutations
- [ ] Predictable

### 🛡️ Error Handling

- [ ] Input validation
- [ ] Try-catch where needed
- [ ] Clear error messages
- [ ] Typed errors
- [ ] NO silent failures
- [ ] Edge cases handled

### 🚀 Performance

- [ ] Optimal algorithm complexity
- [ ] NO unnecessary loops
- [ ] Early returns
- [ ] Efficient data structures
- [ ] Large data considered

### 🧪 Testability

- [ ] Pure = easy to test
- [ ] Predictable I/O
- [ ] Edge cases identified
- [ ] Mock-free testing

### 📚 Documentation

- [ ] JSDoc with @param/@returns/@throws/@example
- [ ] Clear descriptions
- [ ] Complex logic explained

### � Reusability

- [ ] Flexible params
- [ ] Good defaults
- [ ] NO hard-coded values
- [ ] Composable
- [ ] Well-defined API

---

## 🔧 Refactoring Steps

**Krok 1: Analyze** - identifikuj všechny problémy z review  
**Krok 2: Fix Naming** - přejmenuj podle konvencí  
**Krok 3: Add Types** - doplň všechny missing types  
**Krok 4: Make Pure** - odstraň side effects  
**Krok 5: Add Validation** - přidej input validation a error handling  
**Krok 6: Optimize** - zlepši performance  
**Krok 7: Document** - přidej JSDoc

---

## �📝 Výstup

Vytvoř refactorovanou utility funkci která:

1. **Splňuje všechny body checklistu**
2. **Má strukturu:**

```typescript
// Custom error types
export class ValidationError extends Error {
  constructor(
    message: string,
    public readonly field: string,
    public readonly value: unknown
  ) {
    super(message);
    this.name = "ValidationError";
  }
}

export class FormatError extends Error {
  constructor(
    message: string,
    public readonly input: unknown
  ) {
    super(message);
    this.name = "FormatError";
  }
}

// Type guards
export function isValidEmail(email: unknown): email is string {
  return typeof email === "string" && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export function isValidDate(date: unknown): date is Date {
  return date instanceof Date && !isNaN(date.getTime());
}

/**
 * Formats a date according to the specified format.
 *
 * @param date - Date to format (Date object or ISO string)
 * @param format - Format pattern (default: 'YYYY-MM-DD')
 * @returns Formatted date string
 *
 * @throws {ValidationError} When date is invalid
 * @throws {FormatError} When format is unsupported
 *
 * @example
 * formatDate(new Date('2023-01-01'), 'YYYY-MM-DD') // '2023-01-01'
 * formatDate('2023-01-01T00:00:00Z', 'DD/MM/YYYY') // '01/01/2023'
 */
export function formatDate(
  date: Date | string,
  format: string = "YYYY-MM-DD"
): string {
  // Input validation
  if (!date) {
    throw new ValidationError("Date is required", "date", date);
  }

  // Parse date
  const parsedDate = typeof date === "string" ? new Date(date) : date;

  if (!isValidDate(parsedDate)) {
    throw new ValidationError("Invalid date provided", "date", date);
  }

  // Format validation
  const supportedFormats = ["YYYY-MM-DD", "DD/MM/YYYY", "MM/DD/YYYY"];
  if (!supportedFormats.includes(format)) {
    throw new FormatError(`Unsupported format: ${format}`, format);
  }

  // Extract components
  const year = parsedDate.getFullYear();
  const month = String(parsedDate.getMonth() + 1).padStart(2, "0");
  const day = String(parsedDate.getDate()).padStart(2, "0");

  // Format output
  return format
    .replace("YYYY", String(year))
    .replace("MM", month)
    .replace("DD", day);
}

/**
 * Validates an email address.
 *
 * @param email - Email string to validate
 * @returns True if email is valid
 *
 * @example
 * isValidEmail('user@example.com') // true
 * isValidEmail('invalid-email') // false
 */
export function validateEmail(email: unknown): email is string {
  return isValidEmail(email);
}

/**
 * Capitalizes the first letter of each word in a string.
 *
 * @param text - Text to capitalize
 * @returns Capitalized text
 *
 * @throws {ValidationError} When input is not a string
 *
 * @example
 * capitalizeWords('hello world') // 'Hello World'
 */
export function capitalizeWords(text: unknown): string {
  if (typeof text !== "string") {
    throw new ValidationError("Input must be a string", "text", text);
  }

  return text
    .toLowerCase()
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}
```

3. **Má dokumentaci:**

```typescript
/**
 * Formats a date according to the specified format.
 *
 * @param date - Date to format (Date object or ISO string)
 * @param format - Format pattern (default: 'YYYY-MM-DD')
 * @returns Formatted date string
 *
 * @throws {ValidationError} When date is invalid
 * @throws {FormatError} When format is unsupported
 *
 * @example
 * formatDate(new Date('2023-01-01'), 'YYYY-MM-DD') // '2023-01-01'
 */
export function formatDate(date: Date | string, format?: string): string {
  // implementation
}
```

4. **Splňuje quality kritéria:**

- Pure functions (no side effects)
- Input validation
- Typed errors
- Optimal performance
- Full JSDoc documentation
- Type guards pro runtime safety

---

## ✅ Verification

Po refactoringu zkontroluj:

- [ ] Prochází `review-utility.md` s 8+/10?
- [ ] Function je pure (no side effects)?
- [ ] Input validation present?
- [ ] NO `any` types?
- [ ] JSDoc dokumentace?
- [ ] Edge cases handled?

**Pokud ANO všude → refactoring HOTOV ✅**
