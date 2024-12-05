import { ApiError } from "./error.mjs";

export { ApiError }; // Re-export ApiError

export const requireParam = (value, params) => {
  const paramValue = params[value];
  if (!params[value]) {
    throw ApiError.badRequest(`${value} is a required search param`);
  }

  return paramValue;
};
