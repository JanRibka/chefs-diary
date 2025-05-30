class ConflictError extends Error {
  statusCode: number;
  statusText: string;

  constructor(message = "Conflict") {
    super(message);
    this.name = "ConflictError";
    this.statusCode = 409;
    this.statusText = "Konflikt";

    Object.setPrototypeOf(this, new.target.prototype);
  }
}

export default ConflictError;
