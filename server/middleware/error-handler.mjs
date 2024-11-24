import { ApiError } from "../utils/error.mjs";

// https://expressjs.com/en/guide/error-handling.html
const errorHandler = (error, _req, res, _next) => {
  if (error instanceof ApiError) {
    res.status(error.statusCode).json(error.jsonObject());
  } else {
    console.error("Unexpected Error: ", error);

    res.status(500).json(ApiError.internalServerError().jsonObject());
  }
};

export default errorHandler;
