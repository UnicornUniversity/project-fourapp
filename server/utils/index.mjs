import { ApiError } from "./error.mjs";

export { ApiError }; // Re-export ApiError

export const requireParam = (value, params) => {
  if (!params[value]) {
    throw ApiError.badRequest(`${value} is a required search param`);
  }

  return params[value]; // Correctly access the key
};