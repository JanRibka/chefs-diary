class UnauthorizedError extends Error {
  statusCode: number;
  statusText: string;

  constructor(message = "Unauthorized") {
    super(message);
    this.name = "UnauthorizedError";
    this.statusCode = 401;
    this.statusText = "Nejste přihlášení";

    // Fix pro správné stack trace při dědění v TypeScriptu
    Object.setPrototypeOf(this, new.target.prototype);
  }
}

export default UnauthorizedError;
