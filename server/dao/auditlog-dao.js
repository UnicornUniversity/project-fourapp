import mongoose from "mongoose";

const AuditLogSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    typeOfObject: { type: String, required: true },
    objectId: { type: mongoose.Schema.Types.ObjectId, required: true },
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

export default {
  async create(log) {
    return AuditLog.create(log);
  },
  async list() {
    return AuditLog.find().sort({ timestamp: -1 });
  },
  async listByUserId(userId) {
    return AuditLog.find({ userId }).sort({ timestamp: -1 });
  },
  async listByTypeOfObjectAndId(typeOfObject, objectId) {
    return AuditLog.find({ typeOfObject, objectId }).sort({ timestamp: -1 });
  },
  async listByStatus(status) {
    return AuditLog.find({ status }).sort({ timestamp: -1 });
  },
};
