import { AuthError as NextAuthError } from "next-auth";

import ErrorLibraryType from "../types/errorLibrary/ErrorLibraryType";

// TODO: Tento error smazat a používat míto něho jiné
class AuthError extends NextAuthError {
  constructor(message: keyof ErrorLibraryType) {
    super(message);
    this.name = "AuthError";
    this.message = message;
  }
}

export default AuthError;
