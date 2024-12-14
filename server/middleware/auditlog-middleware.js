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

    // Validace userId (pouze pokud je poskytován)
    if (resolvedUserId !== "system" && !mongoose.Types.ObjectId.isValid(resolvedUserId)) {
      throw ApiError.badRequest("Invalid userId format");
    }

    // Validace objectId (pouze pokud je poskytován)
    const resolvedObjectId = objectId && mongoose.Types.ObjectId.isValid(objectId) ? objectId : null;

    await auditLogDao.create({
      actionType,
      typeOfObject,
      objectId: resolvedObjectId, // Ukládáme pouze validní ObjectId
      userId: resolvedUserId === "system" ? undefined : resolvedUserId,
      previousData,
      newData,
      status,
      description,
      timestamp: new Date(),
    });

    next(); // Vždy voláme next()
  } catch (error) {
    console.error("Failed to log action:", error);
    next(ApiError.fromError(error, "Failed to log action"));
  }
};

export default logAction;
