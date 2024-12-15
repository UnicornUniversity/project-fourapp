import { model, Schema } from "mongoose";

const auditLogSchema = new Schema(
  {
    invokedBy: { type: Schema.Types.ObjectId, required: false },
    method: { type: String, required: true },
    path: { type: String, required: true },
    status: { type: String, required: true },
    headers: { type: Object, required: false },
    query: { type: Object, required: false },
    params: { type: Object, required: false },
    body: { type: Object, required: false },
  },
  { timestamps: true }
);

export const AuditLog = model("AuditLog", auditLogSchema);
