import mongoose from "mongoose";
import auditLogDao from "../dao/auditlog-dao.js";
import { ApiError } from "../utils/error.mjs";

export const auditRoute = async (req, res, next) => {
  try {
    if (req.method === "GET") {
      return next();
    }

    const invokedBy = req.user?._id;
    if (invokedBy && !mongoose.Types.ObjectId.isValid(invokedBy)) {
      throw ApiError.badRequest("Invalid userId format");
    }

    res.on("finish", async () => {
      await auditLogDao.create({
        invokedBy,
        method: req.method,
        path: req.path,
        status: res.statusCode,
        body: req.body,
        headers: req.headers,
        query: req.query,
        params: req.params,
        response: res.data,
      });
    });

    next();
  } catch (error) {
    console.error("Failed to log action:", error);
    next(ApiError.fromError(error, "Failed to log action"));
  }
};
