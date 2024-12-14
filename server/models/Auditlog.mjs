import { model, Schema } from "mongoose";

const auditLogSchema = new Schema(
  {
    userId: { type: Schema.Types.Mixed, required: false }, // Povolit jak ObjectId, tak String
    typeOfObject: { type: String, required: true },
    objectId: { type: Schema.Types.ObjectId, required: false },
    actionType: { type: String, required: true },
    timestamp: { type: Date, default: Date.now },
    status: { type: String, enum: ["success", "error"], required: true },
    previousData: { type: Object, default: null },
    newData: { type: Object, default: null },
    description: { type: String, default: "" },
  },
  { timestamps: true } // Automaticky přidává createdAt a updatedAt
);

export const AuditLog = model("AuditLog", auditLogSchema);
