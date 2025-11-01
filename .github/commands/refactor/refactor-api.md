---
description: Refactor API service podle review pravidel
args:
  - name: servicePath
    description: Cesta k service k refactoringu
    required: false
---

# 🔨 API Service Refactoring{{#if servicePath}}: {{servicePath}}{{/if}}

## 🎯 Refactoring Checklist

### 📁 Naming

- [ ] Methods: `get/create/update/delete{Entity}`

### 💎 TypeScript

- [ ] Request DTOs typed
- [ ] Response types typed
- [ ] NO `any`

### 🌐 HTTP Client

- [ ] Auth interceptors
- [ ] Error interceptors

### 🛡️ Error Handling

- [ ] Typed errors
- [ ] Status codes handled

### ⚡ Performance

- [ ] AbortController support

---

## 📝 Výstup

```tsx
interface User {
  id: string;
  email: string;
}

class ApiError extends Error {
  constructor(
    message: string,
    public status: number,
    public code: string
  ) {
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
