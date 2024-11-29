import { MongooseError } from "mongoose";
import { ZodError } from "zod";

export class ApiError extends Error {
  constructor(message, statusCode, extensions = {}) {
    super(message);
    this.name = this.constructor.name; // ApiError
    this.statusCode = statusCode;
    this.extensions = extensions;

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, this.constructor);
    }
  }

  jsonObject() {
    return {
      message: this.message,
      status: this.statusCode,
      extensions: this.extensions,
    };
  }

  static fromMessage(message, statusCode = 500, extensions = {}) {
    return new ApiError(message, statusCode, extensions);
  }

  static badRequest(message = "Bad request", extensions = {}) {
    return new ApiError(message, 400, extensions);
  }

  static forbidden(message = "Forbidden", extensions = {}) {
    return new ApiError(message, 403, extensions);
  }

  static notFound(message = "Not found", extensions = {}) {
    return new ApiError(message, 404, extensions);
  }

  static internalServerError(message = "Unexpected error", extensions = {}) {
    return new ApiError(message, 500, extensions);
  }

  static fromError(error, message = undefined, extensions = {}) {
    if (!error || typeof error !== "object") {
      return new ApiError(message || "Unknown error", 500);
    }

    if (error instanceof ApiError) {
      return new ApiError(
        message || error.message,
        error.statusCode,
        error.extensions
      );
    }

    if (error instanceof MongooseError) {
      return ApiError.internalServerError(
        message || "Mongoose error",
        extensions
      );
    }
    if (error instanceof ZodError) {
      return ApiError.badRequest(message || "Validation error", {
        ...extensions,
        validationErrors: error.errors,
      });
    }
    if (error instanceof Error) {
      return ApiError.internalServerError(message || error.message, extensions);
    }

    return ApiError.internalServerError(message || "Unknown error", extensions);
  }
}
