---
description: Refactor API service podle review pravidel
args:
  - name: servicePath
    description: Cesta k service k refactoringu
    required: false
---

# 🔨 API Service Refactoring{{#if servicePath}}: {{servicePath}}{{/if}}

## ⚠️ **STRIKTNÍ INSTRUKCE - DRŽET SE PRAVIDEL**

**VŽDY aplikujte VŠECHNA pravidla z [Architecture Guidelines](../rules/architecture-guidelines.md) - žádné vlastní interpretace nebo zjednodušení!**

- ✅ **Pouze pravidla z guidelines** - ne vlastní úsudek
- ✅ **Žádné zjednodušení** - pravidla platí pro VŠECHNY API services

## ⚠️ Scope refactoringu

- Reorganizuj existující implementaci služby; zachovej současné API chování.
- Nepřidávej nové endpointy ani extra funkcionalitu, pokud to nepožaduje review.
- Dodrž guidelines tím, že upravíš stávající kód, nikoli že vytvoříš servis od nuly.

## 📋 Reference Guidelines

**DŮLEŽITÉ:** Tento příkaz implementuje **VŠECHNA** pravidla z [Architecture Guidelines](../rules/architecture-guidelines.md):

- **[Error Handling Patterns](../rules/architecture-guidelines.md#error-handling-patterns)** - Typed errors, status codes, interceptors
- **[Performance Guidelines](../rules/architecture-guidelines.md#performance-guidelines)** - AbortController support, timeout handling
- **[Documentation Guidelines](../rules/architecture-guidelines.md#documentation-guidelines)** - JSDoc dokumentace pro API metody

## 🎯 Refactoring Checklist

**NEOPAKUJ pravidla zde - aplikuj přímo z [Architecture Guidelines](../rules/architecture-guidelines.md)!**

- [ ] **Typed errors** a proper error handling?
- [ ] **AbortController support** pro request cancellation?
- [ ] **Auth/error interceptors** implementovány?
- [ ] **JSDoc dokumentace** pro API metody?
- [ ] Prochází `review-api.md` s 8+/10?

---

## 📝 Výstup

```tsx
interface User {
  id: string;
  email: string;
}

class ApiError extends Error {
  constructor(message: string, public status: number, public code: string) {
    super(message);
  }
}

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 10000,
});

apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export const userService = {
  async getUser(id: string, signal?: AbortSignal): Promise {
    const response = await apiClient.get<ApiResponse>(`/users/${id}`, {
      signal,
    });
    return response.data;
  },

  async createUser(data: CreateUserDto): Promise {
    const response = await apiClient.post<ApiResponse>("/users", data);
    return response.data;
  },
};
```
