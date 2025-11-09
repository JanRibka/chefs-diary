import { handlers } from "@/config/auth/auth";

// Expose default handlers at /api/auth/* so client-side Auth.js calls hit a valid endpoint.
export const { GET, POST } = handlers;
