---
description: Styling guidelines and Tailwind CSS best practices
---

# 🎨 Styling Guidelines & Tailwind CSS Best Practices

Komplexní pravidla pro stylování pomocí Tailwind CSS, variants a organizaci stylů.

## 📋 Obsah dokumentu

- **🎯 Kdy použít jaký přístup** - Inline vs Variants vs Utils
- **✨ Tailwind Variants** - Class Variance Authority patterns
- **🔧 mergeStyles utility** - Slučování a podmíněné třídy
- **📁 Organizace stylů** - Kde ukládat jaké styly
- **❌ Anti-patterns** - Co se nesmí dělat
- **✅ Best Practices** - Doporučené postupy

## ⚠️ **ZÁKLADNÍ PRAVIDLA - POVINNÉ**

- ✅ **POUZE Tailwind CSS** - žádné custom CSS soubory nebo inline styles
- ✅ **Tailwind first** - pokud lze styl nadefinovat v Tailwind, použij ho
- ✅ **Variants pro složité styly** - více než 5 tříd nebo podmínky = tailwind-variants
- ✅ **mergeStyles pro slučování** - použij `mergeStyles()` z `@/lib/mergeStyles`
- ❌ **Žádné inline object styles** - `style={{ ... }}` je zakázáno (výjimka: dynamické hodnoty)

## 🎯 Kdy použít jaký přístup

### ✅ Inline Tailwind classes

**Použij když:**

- Méně než 5 tříd
- Žádné podmínky nebo ternary operátory
- Použito pouze jednou v komponentě
- Statické, jednoduché styly

```tsx
// ✅ SPRÁVNĚ - jednoduché, statické styly
<div className="flex items-center gap-2 p-4 bg-white rounded-lg">
  <span className="text-sm font-medium">Label</span>
</div>

// ✅ SPRÁVNĚ - použití mergeStyles pro override
<Button className={mergeStyles("bg-blue-500", props.className)} />
```

### ✅ Tailwind Variants

**Použij když:**

- Více než 5 tříd na jednom elementu
- Obsahuje ternary operátory nebo podmínky
- Komponenta má různé varianty (size, color, variant, state)
- Styly se opakují nebo jsou složité
- Potřebuješ compound variants (kombinace variant)

```tsx
// ✅ SPRÁVNĚ - tailwind-variants pro složité varianty
import { tv, type VariantProps } from "tailwind-variants";

const buttonVariants = tv({
  // Base styles - společné pro všechny varianty
  base: "inline-flex items-center justify-center rounded-lg font-semibold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none",
  variants: {
    variant: {
      primary: "bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500",
      secondary:
        "bg-gray-200 text-gray-900 hover:bg-gray-300 focus:ring-gray-500",
      ghost: "bg-transparent hover:bg-gray-100 text-gray-700",
      danger: "bg-red-600 text-white hover:bg-red-700 focus:ring-red-500",
    },
    size: {
      sm: "px-3 py-1.5 text-sm",
      md: "px-4 py-2 text-base",
      lg: "px-6 py-3 text-lg",
    },
    fullWidth: {
      true: "w-full",
      false: "w-auto",
    },
  },
  // Compound variants - kombinace více variant
  compoundVariants: [
    {
      variant: "primary",
      size: "lg",
      class: "shadow-lg shadow-blue-500/20",
    },
  ],
  defaultVariants: {
    variant: "primary",
    size: "md",
    fullWidth: false,
  },
});

// Export typu pro props
export type ButtonVariants = VariantProps<typeof buttonVariants>;

// Použití v komponentě
interface ButtonProps extends ButtonVariants {
  children: React.ReactNode;
  className?: string;
}

export const Button = ({
  variant,
  size,
  fullWidth,
  className,
  children,
}: ButtonProps) => {
  return (
    <button
      className={mergeStyles(
        buttonVariants({ variant, size, fullWidth }),
        className
      )}
    >
      {children}
    </button>
  );
};

// Použití komponenty
<Button variant="primary" size="lg">
  Click me
</Button>;
```

### ✅ Utils/styles soubory

**Použij když:**

- Složité výpočty stylů na základě props
- Sdíleno mezi více komponentami
- Business logika pro styling
- Mapování hodnot na Tailwind třídy

```tsx
// ✅ SPRÁVNĚ - utils/styles pro složitou logiku
// components/Card/utils/cardStyles.ts
export const getCardGradient = (index: number, gradients: string[]): string => {
  return gradients[index % gradients.length];
};

export const getCardIconColor = (index: number, colors: string[]): string => {
  return colors[index % colors.length];
};

// Použití
import { getCardGradient } from "./utils/cardStyles";

<div
  className={mergeStyles(
    "bg-gradient-to-br",
    getCardGradient(index, GRADIENTS)
  )}
/>;
```

## 🔧 mergeStyles Utility

**Projekt používá vlastní `mergeStyles` utilitu místo `cn`.**

### Import a použití

```tsx
import { mergeStyles } from "@/lib/mergeStyles";

// Základní použití - slučování tříd
const className = mergeStyles("px-4 py-2", "bg-blue-500", "hover:bg-blue-600");

// S podmínkami
const className = mergeStyles(
  "px-4 py-2",
  isActive && "bg-blue-500",
  isDisabled && "opacity-50 pointer-events-none"
);

// S ternary
const className = mergeStyles(
  "px-4 py-2",
  variant === "primary" ? "bg-blue-500" : "bg-gray-500"
);

// S tailwind-variants a override className
const className = mergeStyles(
  buttonVariants({ variant, size }),
  props.className // umožňuje parent přepsat styly
);
```

### 📜 Pravidla pro mergeStyles

1. **Vždy používej pro slučování více className** - ne string concatenation
2. **Poslední argument vyhře** - tailwind-merge zajistí správné merged classes
3. **Props className vždy poslední** - umožní parent komponentě override

```tsx
// ❌ ŠPATNĚ - string concatenation
className={`px-4 py-2 ${variant === "primary" ? "bg-blue-500" : "bg-gray-500"} ${className}`}

// ✅ SPRÁVNĚ - mergeStyles
className={mergeStyles(
  "px-4 py-2",
  variant === "primary" ? "bg-blue-500" : "bg-gray-500",
  className
)}
```

## ❌ Anti-patterns - CO NEDĚLAT

### 1. Dlouhé className řetězce

```tsx
// ❌ ŠPATNĚ - nepřehledný dlouhý className
<div className="group relative overflow-hidden rounded-2xl bg-white dark:bg-slate-800 border-2 border-slate-300/60 dark:border-slate-600/60 hover:border-transparent transition-all duration-500 shadow-md hover:shadow-2xl hover:shadow-amber-500/30 hover:-translate-y-1">
  Content
</div>;

// ✅ SPRÁVNĚ - extrahuj do tailwind-variants variant
const cardVariants = tv({
  "group relative overflow-hidden rounded-2xl transition-all duration-500",
  {
    variants: {
      theme: {
        light: "bg-white border-slate-300/60 hover:shadow-amber-500/30",
        dark: "bg-slate-800 border-slate-600/60",
      },
      hover: {
        true: "hover:border-transparent hover:shadow-2xl hover:-translate-y-1",
      },
    },
  }
);

<div className={cardVariants({ theme: "light", hover: true })}>Content</div>;
```

### 2. Podmíněné styly v className

```tsx
// ❌ ŠPATNĚ - ternary a podmínky přímo v className
<div
  className={`absolute inset-0 bg-gradient-to-br ${gradient} ${
    isHovered ? "opacity-90" : "opacity-15"
  } transition-opacity duration-500`}
/>

// ✅ SPRÁVNĚ - použij tailwind-variants s variants
const overlayVariants = tv({
  "absolute inset-0 bg-gradient-to-br transition-opacity duration-500",
  {
    variants: {
      state: {
        default: "opacity-15",
        hovered: "opacity-90",
      },
    },
  }
);

<div className={mergeStyles(overlayVariants({ state: isHovered ? "hovered" : "default" }), gradient)} />

// ✅ JEŠTĚ LEPŠÍ - group-hover utilities
<div className={mergeStyles("absolute inset-0 bg-gradient-to-br opacity-15 group-hover:opacity-90 transition-opacity duration-500", gradient)} />
```

### 3. Inline object styles

**PRAVIDLO: Inline object styles jsou povoleny POUZE pro dynamické hodnoty nebo jednorázové použití.**

```tsx
//✅ SPRÁVNĚ - jednorázové použití, inline je OK
<div
  className="absolute inset-0 opacity-5"
  style={{
    backgroundImage: "radial-gradient(circle at 20px 20px, currentColor 1px, transparent 1px)",
    backgroundSize: "40px 40px",
  }}
/>

// ✅ SPRÁVNĚ - dynamické hodnoty (musí být inline)
<div
  style={{
    top: `${position.y}px`,
    left: `${position.x}px`,
  }}
/>

// ❌ ŠPATNĚ - používá se vícekrát, mělo by být v konstantě
// Component A
<div style={{ backgroundImage: "...", backgroundSize: "40px 40px" }} />
// Component B
<div style={{ backgroundImage: "...", backgroundSize: "40px 40px" }} />

// ✅ SPRÁVNĚ - opakující se style object v konstantě
// constants/styleConfig.ts
export const PATTERN_DOTS_STYLE = {
  backgroundImage: "radial-gradient(circle at 20px 20px, currentColor 1px, transparent 1px)",
  backgroundSize: "40px 40px",
} as const;

// Použití ve více komponentách
<div style={PATTERN_DOTS_STYLE} className="absolute inset-0 opacity-5" />

// ✅ JEŠTĚ LEPŠÍ - pokud se opakuje často, dej do global.css
// styles/global.css
.pattern-dots {
  background-image: radial-gradient(circle at 20px 20px, currentColor 1px, transparent 1px);
  background-size: 40px 40px;
}

// Použití
<div className="pattern-dots absolute inset-0 opacity-5" />
```

**Pravidlo pro rozhodování:**

- **Použito 1x** → inline style object je OK
- **Použito 2-3x** → vytvoř konstantu
- **Použito 4+x** → přesuň do global.css jako CSS třídu

### 4. Opakující se style patterns

```tsx
// ❌ ŠPATNĚ - opakování stejných stylů
<div className="px-8 py-6 border-b border-slate-200/50 dark:border-slate-700/50">
  Header
</div>
<div className="px-8 py-5 border-t border-slate-200/50 dark:border-slate-700/50">
  Footer
</div>

// ✅ SPRÁVNĚ - extrahuj do tailwind-variants nebo konstanty
const sectionVariants = tv({"px-8 border-slate-200/50 dark:border-slate-700/50", {
  variants: {
    type: {
      header: "py-6 border-b",
      footer: "py-5 border-t",
    },
  },
});

<div className={sectionVariants({ type: "header" })}>Header</div>
<div className={sectionVariants({ type: "footer" })}>Footer</div>
```

## 📁 Organizace stylů

**Pro kompletní folder strukturu viz [Architecture Guidelines - Folder Structure](../architecture-guidelines.md#-folder-structure-standards)**

### Struktura souborů pro styling

```
ComponentName/
├── ComponentName.tsx                   # Hlavní komponenta
├── components/
│   └── SubComponent.tsx           # Subkomponenty s inline styles nebo vlastními variants
├── styles/
│   ├── componentVariants.ts       # tailwind-variants variants pro komponentu
│   └── componentUtils.ts          # Složité style utility funkce (pokud potřeba)
├── utils/                          # Utility funkce (business logika, ne styly)
│   └── variantUtils.ts            # Utility pro styly (např. getVariantIndex)
├── constants/                      # Konstanty specifické pro tuto komponentu
│   └── categoryIcons.tsx          # Např. mapování ikon, texty, config
└── types/
    └── ComponentProps.ts          # Props včetně variant types
```

**📖 Detailní pravidla pro folder strukturu najdeš v [Architecture Guidelines](../architecture-guidelines.md#-folder-structure-standards)**

### Kdy vytvořit styles/ folder

**✅ Vytvoř styles/ folder když:**

- Komponenta má více než 2 tailwind-variants variant definitions
- Potřebuješ složité style utility funkce
- Styly se sdílí mezi více subkomponentami

**❌ Nevytvářej styles/ folder když:**

- Jednoduchá komponenta s inline Tailwind
- Styly jsou pouze v constants (gradients, colors)

### Příklad organizace

```tsx
// ✅ SPRÁVNĚ - jednoduché komponenty bez styles/ folder
SimpleButton/
├── SimpleButton.tsx               // tailwind-variants inline v komponentě
└── types/
    └── SimpleButtonProps.ts

// ✅ SPRÁVNĚ - složité komponenty se styles/ folder
Card/
├── Card.tsx                        // Čistý orchestrátor
├── components/
│   ├── CardHeader.tsx
│   ├── CardContent.tsx
│   └── CardFooter.tsx
├── styles/
│   ├── cardVariants.ts            // Všechny tailwind-variants variants
│   └── cardUtils.ts               // Style utility funkce
├── constants/
│   └── cardConfig.ts              // Gradient arrays, color maps
└── types/
    └── CardProps.ts
```

## ✅ Best Practices

### 1. tailwind-variants Variant organization

```tsx
// ✅ SPRÁVNĚ - dobře organizované varianty
const componentVariants = tv({
  // 1. Base styles - vždy jako první argument
  // Tip: Pro lepší čitelnost dlouhých stylů použij pole
  base: [
    "inline-flex items-center justify-center",
    "rounded-lg font-semibold",
    "transition-all duration-200",
    "focus:outline-none focus:ring-2 focus:ring-offset-2",
    "disabled:opacity-50 disabled:pointer-events-none"
  ],
  variants: {
    // 2. Visual variants - barvy, velikosti
    variant: {
      primary: "bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500",
      secondary: "bg-gray-200 text-gray-900 hover:bg-gray-300 focus:ring-gray-500",
    },
    // ...
  }
});
      size: {
        sm: "...",
        md: "...",
        lg: "...",
      },
      // 3. State variants - disabled, loading, active
      state: {
        default: "...",
        disabled: "...",
        loading: "...",
      },
      // 4. Boolean variants - na konci
      fullWidth: {
        true: "w-full",
        false: "w-auto",
      },
    },
    // 5. Compound variants - speciální kombinace
    compoundVariants: [
      {
        variant: "primary",
        size: "lg",
        class: "special-styles",
      },
    ],
    // 6. Default variants - vždy definuj
    defaultVariants: {
      variant: "primary",
      size: "md",
      state: "default",
      fullWidth: false,
    },
  }
);
```

### 2. Naming conventions pro variants

```tsx
// ✅ SPRÁVNĚ - konzistentní pojmenování
const buttonVariants = tv({"base", {
  variants: {
    // Variant typu - popisné názvy
    variant: {
      primary: "...", // ne "blue"
      secondary: "...", // ne "gray"
      danger: "...", // ne "red"
    },
    // Velikosti - sm/md/lg/xl
    size: {
      sm: "...",
      md: "...",
      lg: "...",
    },
    // Boolean - true/false (ne yes/no)
    fullWidth: {
      true: "...",
      false: "...",
    },
  },
});
```

### 3. Export variants jako types

```tsx
// ✅ SPRÁVNĚ - export typu pro reusability
import { tv, type VariantProps } from "tailwind-variants";

export const buttonVariants = tv({"...", { ... });

// Export typu
export type ButtonVariants = VariantProps<typeof buttonVariants>;

// Použití v interface
interface ButtonProps extends ButtonVariants {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}
```

### 4. Destrukturuj variant props

```tsx
// ✅ SPRÁVNĚ - separuj variant props od ostatních
const Button = ({
  variant,
  size,
  fullWidth, // variant props
  className,
  children,
  onClick, // ostatní props
  ...props // rest props pro HTML attributes
}: ButtonProps) => {
  return (
    <button
      className={mergeStyles(
        buttonVariants({ variant, size, fullWidth }),
        className
      )}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
};
```

### 5. Responsive variants

```tsx
// ✅ SPRÁVNĚ - responsive pomocí Tailwind utilities
const cardVariants = tv({"grid gap-3", {
  variants: {
    columns: {
      1: "grid-cols-1",
      2: "grid-cols-1 md:grid-cols-2",
      3: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
      4: "grid-cols-2 md:grid-cols-3 lg:grid-cols-4",
    },
  },
});

// Použití
<div className={cardVariants({ columns: 4 })}>
  {items.map((item) => (
    <Card key={item.id} {...item} />
  ))}
</div>;
```

## 🎨 Advanced Patterns

### Slots (pro komplexní komponenty)

```tsx
// ✅ SPRÁVNĚ - tailwind-variants slots pro komponenty s více částmi
import { tv } from "tailwind-variants";

const alertVariants = tv({"", {
  variants: {
    variant: {
      info: "",
      success: "",
      warning: "",
      error: "",
    },
  },
  slots: {
    base: "rounded-lg border p-4",
    icon: "flex-shrink-0",
    content: "ml-3 flex-1",
    title: "font-medium text-sm",
    description: "text-sm mt-1",
  },
  variants: {
    variant: {
      info: {
        base: "bg-blue-50 border-blue-200",
        icon: "text-blue-600",
        title: "text-blue-900",
        description: "text-blue-700",
      },
      success: {
        base: "bg-green-50 border-green-200",
        icon: "text-green-600",
        title: "text-green-900",
        description: "text-green-700",
      },
    },
  },
});

// Použití
const Alert = ({ variant, title, description }) => {
  const styles = alertVariants({ variant });

  return (
    <div className={styles.base()}>
      <div className={styles.icon()}>
        <Icon />
      </div>
      <div className={styles.content()}>
        <div className={styles.title()}>{title}</div>
        <div className={styles.description()}>{description}</div>
      </div>
    </div>
  );
};
```

## 📋 Checklist pro styling

Před commitem zkontroluj:

- [ ] **Žádné inline object styles** (kromě dynamických hodnot)
- [ ] **Žádné dlouhé className** (> 5 tříd = extrahuj do tailwind-variants)
- [ ] **Žádné ternary v className** (přesuň do tailwind-variants variants)
- [ ] **mergeStyles pro slučování** - ne string concatenation
- [ ] **Props className vždy poslední** v mergeStyles()
- [ ] **tailwind-variants má defaultVariants** - nikdy nezapomeň
- [ ] **Export variant types** - pro reusability
- [ ] **Opakující se styly** - extrahuj do tailwind-variants nebo utils
- [ ] **Responsive classes** - použij Tailwind breakpoints

## 🔍 Review Checklist

Při review stylů zkontroluj:

1. **Organizace**

   - [ ] Styly jsou na správném místě (inline/tailwind-variants/utils)
   - [ ] tailwind-variants variants jsou logicky uspořádané
   - [ ] Konstanty jsou v constants/, ne hardcoded

2. **Qualita**

   - [ ] Žádné duplicity stylů
   - [ ] Konzistentní naming conventions
   - [ ] Správné použití mergeStyles

3. **Performance**

   - [ ] Žádné zbytečné inline funkce v className
   - [ ] tailwind-variants variants jsou mimo komponentu (ne re-created každý render)

4. **Maintainability**
   - [ ] Styly jsou čitelné a srozumitelné
   - [ ] Dobře pojmenované varianty
   - [ ] Dokumentace složitých pattern
