class ForbiddenError extends Error {
  statusCode: number;
  statusText: string;

  constructor(message = "Forbidden") {
    super(message);
    this.name = "ForbiddenError";
    this.statusCode = 403;
    this.statusText = "Nemáte oprávnění";

    Object.setPrototypeOf(this, new.target.prototype);
  }
}

export default ForbiddenError;
