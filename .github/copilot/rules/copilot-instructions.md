# Copilot Configuration — D3S Klient Zona UI

## 🧠 Global Principles
- Always use **React + TypeScript + Tailwind CSS** for all UI code.
- Follow **modern clean aesthetic** — soft shadows, rounded corners, good spacing.
- All code must be **production-ready** and **consistent** across components.
- Write clean JSX and readable Tailwind classes (no duplicates or redundant utilities).
- Never use inline styles unless absolutely required.
- Prefer reusable components from **shadcn/ui** and icons from **lucide-react**.
- Do not use any external CSS unless explicitly mentioned.

---

## 🎨 Tailwind Rules
- Always use **Tailwind utility classes** for layout, spacing, typography, and colors.
- **Never use margin-top** or `mt-*` unless explicitly required.  
  → Use `space-y-*` or `gap-y-*` for vertical spacing instead.
- Keep **consistent padding**:
  - `px-4 py-3` for cards, containers, and sections.
  - `p-2` or `p-3` for compact inner blocks.
- Always prefer `gap-*` over individual margins in flex or grid layouts.
- Use **responsive classes** (`sm:`, `md:`, `lg:`) for layout adjustments.
- Include **dark mode variants**:
  - Use `bg-white dark:bg-[#0B0B0B]`
  - Use `text-gray-800 dark:text-gray-100`
- No negative margins, ever.

---

## 💠 Layout & Structure
- Always wrap main content in a `<div className="container mx-auto px-4">`.
- Use **grid or flex** layouts, never float or absolute positioning unless necessary.
- When using grids:
  - `grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6`
- When using flex:
  - `flex items-center justify-between gap-4`
- Never place unrelated items outside their logical parent container.
- Group related content into logical sections with clear headings.

---

## 🧩 Components
- Prefer **shadcn/ui** base components:
  - Buttons → `import { Button } from "@/components/ui/button"`
  - Cards → `import { Card, CardContent } from "@/components/ui/card"`
  - Inputs → `import { Input } from "@/components/ui/input"`
- Wrap visual components with `<Card>` for grouping.
- Icons → `import { IconName } from "lucide-react"`
- All buttons must use `rounded-2xl` and have hover/active transitions.
- Use motion effects via `framer-motion` for subtle animations:
  - Example: `<motion.div whileHover={{ scale: 1.02 }}>...</motion.div>`

---

## 📱 Responsiveness
- Mobile first: start simple, then add responsive variants (`sm:`, `md:`, `lg:`).
- On mobile, stack vertically. On larger screens, use grid or flex for layout.
- Avoid horizontal scrolling at all costs.

---

## 🌙 Theming
- Support **light/dark mode** automatically.
- Default light theme: minimal white background, soft shadows.
- Dark mode: matte dark background (`#0B0B0B`) with subtle highlights.
- Always test text contrast (no gray-on-gray).

---

## 🧾 Code Style
- Use TypeScript for all new files
- Follow React functional components with hooks
- Use proper TypeScript types (avoid `any`)
- Keep JSX readable: one prop per line when long.
- Use clear semantic HTML elements (`<section>`, `<header>`, `<footer>`, etc.).
- Avoid redundant divs; wrap meaningfully.
- Avoid unnecessary comments or TODOs.
- Always export a default React component.
- Follow existing ESLint configuration

---

## 💬 Example Expectations

✅ **Good**
```jsx
<Card className="bg-white dark:bg-[#0B0B0B] p-4 rounded-2xl shadow-md">
  <CardContent className="flex flex-col gap-4">
    <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
      Game Overview
    </h2>
    <p className="text-gray-600 dark:text-gray-300">
      Discover our immersive escape rooms.
    </p>
  </CardContent>
</Card>
```

❌ **Bad**
```jsx
<div style={{ marginTop: 20, background: "white" }}>
  <h2>Game Overview</h2>
</div>
```

---

## 🚫 Never
- Don't use inline styles for colors, spacing, or layout.
- Don't use margin-top, `mt-*`, or negative spacing.
- Don't use absolute positioning for layout (only for overlays/modals).
- Don't use px values outside Tailwind utilities.
- Don't use lorem ipsum placeholders.

---

## ⚡ Optional Enhancements
- Use `motion.div` for subtle card hover animations.
- Add hover transitions for interactivity.
- Use optimized image components where possible.

---

## 📦 Project Structure
- `apps/web/` - Main web application
- `packages/ui/` - Shared UI components
- `packages/eslint-config/` - Shared ESLint configurations
- `packages/typescript-config/` - Shared TypeScript configurations
- `scripts/` - Build and setup scripts

### File Organization
- Components go in `src/components/`
- Hooks go in `src/hooks/`
- Types/Interfaces go in `src/types/` or `src/interfaces/`
- Utils go in `src/utils/`
- Localization files go in `src/locales/`

---

## 🛠️ Commands
- Install dependencies: `pnpm install`
- Run dev server: `pnpm run dev`
- Build: `pnpm run build`
- Lint: `pnpm run lint`

---

## 📝 Notes
- This is a **monorepo** structure managed with **pnpm workspaces** and **Turbo**
- Use **pnpm**, not npm or yarn
- Follow the workspace structure when adding new packages
- Assume project already has **shadcn/ui**, **framer-motion**, and **lucide-react** installed
- Default to **dark mode styling** if unsure
- All generated React + Tailwind code must respect this configuration strictly
