import { ApiError } from "../utils/error.mjs";

export const checkAdminRole = (req, res, next) => {
  if (req.user && req.user.role === "Admin") {
    next();
  } else {
    next(ApiError.forbidden("Admin access required"));
  }
};