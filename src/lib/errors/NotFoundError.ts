class NotFoundError extends Error {
  statusCode: number;
  statusText: string;

  constructor(message = "NotFound") {
    super(message);
    this.name = "NotFoundError";
    this.statusCode = 404;
    this.statusText = "Nenalezeno";

    Object.setPrototypeOf(this, new.target.prototype);
  }
}

export default NotFoundError;
