import mongoose from "mongoose";
import auditLogDao from "../dao/auditlog-dao.js";
import { ApiError } from "../utils/error.mjs";

const logAction = (
  actionType,
  typeOfObject,
  objectId,
  userId,
  previousData,
  newData,
  status = "success",
  description = ""
) => async (req, res, next) => {
  try {
    const resolvedUserId = userId || "system";
    if (resolvedUserId !== "system" && !mongoose.Types.ObjectId.isValid(resolvedUserId)) {
      throw ApiError.badRequest("Invalid userId format");
    }

    await auditLogDao.create({
      actionType,
      typeOfObject,
      objectId,
      userId: resolvedUserId,
      previousData,
      newData,
      status,
      description,
    });

    next();
  } catch (error) {
    next(ApiError.internal("Failed to log action", { originalError: error.message }));
  }
};

export default logAction;
