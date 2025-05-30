import ErrorLibraryType from "../types/errorLibrary/ErrorLibraryType";

class ValidationError extends Error {
  statusCode: number;
  statusText: string;

  constructor(message: keyof ErrorLibraryType) {
    super(message);
    this.name = "ValidationError";
    this.statusCode = 400;
    this.statusText = "Chyba validace";

    Object.setPrototypeOf(this, new.target.prototype);
  }
}

export default ValidationError;
