import { z } from "zod";

export const registerSchema = z.object({
  login: z
    .string()
    .min(1, "Username is required")
    .max(100, "Username must be less than 100 characters"),
  email: z.string().email("Invalid email format"),
  password: z
    .string()
    .min(1, "Password is required")
    .max(100, "Password must be less than 100 characters"),
});
