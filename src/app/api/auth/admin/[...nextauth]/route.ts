import { handlers } from "@/config/auth/authAdmin";

// Na této cestě to nebude fungovat. Auth js to očekává na api/auth/[...nextauth]. Kvůli oddělenému přihlášení to tak musím mít.
// Odhlašovat se musím přes server actions
export const { GET, POST } = handlers;
