import mongoose from "mongoose";
import { ApiError } from "../utils/error.mjs"; // Ujistěte se, že cesta je správná

const AuditLogSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.Mixed, required: false },
    typeOfObject: { type: String, required: true },
    objectId: { type: mongoose.Schema.Types.ObjectId, required: false },
    actionType: { type: String, required: true },
    timestamp: { type: Date, default: Date.now },
    status: { type: String, enum: ["success", "error"], required: true },
    previousData: { type: Object, default: null },
    newData: { type: Object, default: null },
    description: { type: String, default: "" },
  },
  { timestamps: true }
);

const AuditLog = mongoose.model("AuditLog", AuditLogSchema);

class auditLogDao {
  static async create(log) {
    try {
      if (!log.typeOfObject || !log.actionType || !log.status) {
        throw ApiError.badRequest("Missing required fields in log data");
      }
      return await AuditLog.create(log);
    } catch (error) {
      throw ApiError.badRequest("Failed to create AuditLog", { originalError: error.message });
    }
  }

  static async list() {
    try {
      return await AuditLog.find().sort({ timestamp: -1 });
    } catch (error) {
      throw ApiError.internal("Failed to fetch AuditLogs", { originalError: error.message });
    }
  }

  static async listByUserId(userId) {
    try {
      if (!mongoose.Types.ObjectId.isValid(userId)) {
        throw ApiError.badRequest("Invalid userId format");
      }
      return await AuditLog.find({ userId }).sort({ timestamp: -1 });
    } catch (error) {
      throw ApiError.internal("Failed to fetch AuditLogs by userId", { originalError: error.message });
    }
  }

  static async listByTypeOfObjectAndId(typeOfObject, objectId) {
    try {
      if (objectId && !mongoose.Types.ObjectId.isValid(objectId)) {
        throw ApiError.badRequest("Invalid objectId format");
      }
      return await AuditLog.find({ typeOfObject, objectId }).sort({ timestamp: -1 });
    } catch (error) {
      throw ApiError.internal("Failed to fetch AuditLogs by type and id", { originalError: error.message });
    }
  }

  static async listByStatus(status) {
    try {
      if (!["success", "error"].includes(status)) {
        throw ApiError.badRequest("Invalid status value");
      }
      return await AuditLog.find({ status }).sort({ timestamp: -1 });
    } catch (error) {
      throw ApiError.internal("Failed to fetch AuditLogs by status", { originalError: error.message });
    }
  }
}

export default auditLogDao;
