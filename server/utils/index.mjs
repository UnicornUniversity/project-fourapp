import { ApiError } from "./error.mjs";

export const requireParam = (value, params) => {
  if (!params[value]) {
    throw ApiError.badRequest(`${value} is a required search param`);
  }

  return params.value;
};
