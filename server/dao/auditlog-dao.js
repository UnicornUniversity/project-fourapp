import mongoose from "mongoose";
import { AuditLog } from "../models/Auditlog.mjs";
import { ApiError } from "../utils/error.mjs";

class auditLogDao {
  static async create(log) {
    try {
      if (!log.typeOfObject || !log.actionType || !log.status) {
        throw ApiError.badRequest("Missing required fields in log data");
      }

      if (!log.timestamp) {
        log.timestamp = new Date();
      }

      return await AuditLog.create(log);
    } catch (error) {
      console.error("Error creating AuditLog:", error.message);
      throw ApiError.internalServerError("Failed to create AuditLog", {
        originalError: error.message,
      });
    }
  }

  static async list() {
    try {
      return await AuditLog.find().sort({ timestamp: -1 });
    } catch (error) {
      throw ApiError.internalServerError("Failed to fetch AuditLogs", {
        originalError: error.message,
      });
    }
  }

  static async listByUserId(userId) {
    try {
      return await AuditLog.find({ userId }).sort({ timestamp: -1 });
    } catch (error) {
      throw ApiError.internalServerError("Failed to fetch AuditLogs by userId", {
        originalError: error.message,
      });
    }
  }

  static async listByTypeOfObjectAndId(typeOfObject, objectId) {
    try {
      const query = { typeOfObject };

      if (objectId) {
        if (!mongoose.Types.ObjectId.isValid(objectId)) {
          throw ApiError.badRequest(`Invalid ObjectId format: ${objectId}`);
        }
        query.objectId = new mongoose.Types.ObjectId(objectId);
      }

      return await AuditLog.find(query).sort({ timestamp: -1 });
    } catch (error) {
      console.error("Error in listByTypeOfObjectAndId:", error.message);
      throw ApiError.internalServerError("Failed to fetch AuditLogs by type and id", {
        originalError: error.message,
      });
    }
  }

  static async listByStatus(status) {
    try {
      if (!["success", "error"].includes(status)) {
        throw ApiError.badRequest("Invalid status value");
      }
      return await AuditLog.find({ status }).sort({ timestamp: -1 });
    } catch (error) {
      throw ApiError.internalServerError("Failed to fetch AuditLogs by status", {
        originalError: error.message,
      });
    }
  }

  static async getPagedLogs(page, limit) {
    try {
      const skip = (page - 1) * limit;

      // Počet záznamů
      const total = await AuditLog.countDocuments();

      // Data s limitem a stránkováním
      const data = await AuditLog.find()
        .sort({ timestamp: -1 })
        .skip(skip)
        .limit(limit);

      return { data, total };
    } catch (error) {
      console.error("Error fetching paged AuditLogs:", error.message);
      throw ApiError.internalServerError("Failed to fetch paged AuditLogs", {
        originalError: error.message,
      });
    }
  }
}

export default auditLogDao;
