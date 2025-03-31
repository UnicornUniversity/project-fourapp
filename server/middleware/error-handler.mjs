import { ApiError } from "../utils/error.mjs";

// https://expressjs.com/en/guide/error-handling.html
const errorHandler = (error, _req, res, _next) => {
  if (error instanceof ApiError) {
    res.status(error.statusCode).json(error.jsonObject());
  } else {
    const apiError = ApiError.fromError(error);

    res.status(apiError.statusCode).json(apiError.jsonObject());
  }
};

export default errorHandler;
