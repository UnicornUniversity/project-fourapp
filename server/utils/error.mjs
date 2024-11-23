import { MongooseError } from "mongoose";

export class ApiError extends Error {
  constructor(message, statusCode, errors = []) {
    super(message);
    this.name = this.constructor.name; // ApiError
    this.statusCode = statusCode;
    this.errors = errors;

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, this.constructor);
    }
  }

  static fromMessage(message, statusCode = 500) {
    return new ApiError(message, statusCode);
  }

  static badRequest(message = "Bad request") {
    return new ApiError(message, 400);
  }

  static forbidden(message = "Forbidden") {
    return new ApiError(message, 403);
  }

  static notFound(message = "Not found") {
    return new ApiError(message, 404);
  }

  static internalServerError(message = "Unexpected error") {
    return new ApiError(message, 500);
  }

  static fromError(error) {
    console.error(error);
    if (!error || typeof error !== "object") {
      return new ApiError("Unknown error", 500);
    }

    if (error instanceof MongooseError) {
      return ApiError.internalServerError("Mongoose error");
    }
    if (error instanceof Error) {
      return ApiError.internalServerError(error.message);
    }

    return ApiError.internalServerError();
  }
}
