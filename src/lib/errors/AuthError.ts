import { AuthError as NextAuthError } from "next-auth";

class AuthError extends NextAuthError {
  constructor(message: string) {
    super(message);
    this.name = "AuthError";
    this.message = message;
  }
}

export default AuthError;
