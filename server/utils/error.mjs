export class ApiError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.name = this.constructor.name; // ApiError
    this.statusCode = statusCode;

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, this.constructor);
    }
  }

  static fromMessage(message, statusCode = 500) {
    return new ApiError(message, statusCode);
  }

  static forbidden(message = undefined) {
    return new ApiError(message, 403);
  }

  static notFound(message = undefined) {
    return new ApiError(message, 404);
  }
}
