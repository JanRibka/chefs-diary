class UnauthorizedError extends Error {
  statusCode: number;

  constructor(message = "Unauthorized") {
    super(message);
    this.name = "UnauthorizedError";
    this.statusCode = 401;

    // Fix pro správné stack trace při dědění v TypeScriptu
    Object.setPrototypeOf(this, new.target.prototype);
  }
}

export default UnauthorizedError;
