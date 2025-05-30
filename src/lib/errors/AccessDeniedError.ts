class AccessDeniedError extends Error {
  statusCode: number;
  statusText: string;

  constructor(message = "AccessDenied") {
    super(message);
    this.name = "AccessDeniedError";
    this.statusCode = 403;
    this.statusText = "Přístup odepřen";

    Object.setPrototypeOf(this, new.target.prototype);
  }
}

export default AccessDeniedError;
