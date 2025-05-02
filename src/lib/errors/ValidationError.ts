import ErrorLibraryType from "../types/errorLibrary/ErrorLibraryType";

class ValidationError extends Error {
  constructor(message: keyof ErrorLibraryType) {
    super(message);
    this.name = "ValidationError";
    this.message = message;
  }
}

export default ValidationError;
