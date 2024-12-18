import mongoose from "mongoose";
import { AuditLog } from "../models/Auditlog.mjs";
import { ApiError } from "../utils/error.mjs";

class auditLogDao {
  static async create(log) {
    return await AuditLog.create(log);
  }

  static async list() {
    return await AuditLog.find().sort({ timestamp: -1 });
  }

  static async listByUserId(userId) {
    return await AuditLog.find({ userId }).sort({ timestamp: -1 });
  }

  static async listByTypeOfObjectAndId(typeOfObject, objectId) {
    const query = { typeOfObject };

    if (objectId) {
      if (!mongoose.Types.ObjectId.isValid(objectId)) {
        throw ApiError.badRequest(`Invalid ObjectId format: ${objectId}`);
      }
      query.objectId = new mongoose.Types.ObjectId(objectId);
    }

    return await AuditLog.find(query).sort({ timestamp: -1 });
  }

  static async listByStatus(status) {
    if (!["success", "error"].includes(status)) {
      throw ApiError.badRequest("Invalid status value");
    }
    return await AuditLog.find({ status }).sort({ timestamp: -1 });
  }

  static async getPagedLogs(page, limit) {
    const skip = page * limit;

    // Počet záznamů
    const total = await AuditLog.countDocuments();

    // Data s limitem a stránkováním
    const data = await AuditLog.find()
      .sort({ timestamp: -1 })
      .skip(skip)
      .limit(limit);

    return { data, total };
  }
}

export default auditLogDao;
