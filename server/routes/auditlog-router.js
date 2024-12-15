import express from "express";
import AuditLogController from "../api/controllers/auditlog-controller.js";

const router = express.Router();

router.post("/", AuditLogController.create);
router.get("/", AuditLogController.list); // Podpora query parametrů pro stránkování
router.get("/by-user/:userId", AuditLogController.listByUserId);
router.get("/by-type-and-id", AuditLogController.listByTypeAndId);
router.get("/by-status", AuditLogController.listByStatus);

export default router;
