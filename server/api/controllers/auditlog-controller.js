import auditLogDao from "../../dao/auditlog-dao.js";
import mongoose from "mongoose";

class AuditLogController {
  static async list(req, res, next) {
    try {
      const { page = 1, limit = 10 } = req.query;

      // Validace query parametrů
      const pageNumber = parseInt(page, 10);
      const limitNumber = parseInt(limit, 10);

      if (pageNumber < 1 || limitNumber < 1) {
        res
          .status(400)
          .json({ error: "Page and limit must be positive integers." });
        return;
      }

      const logs = await auditLogDao.getPagedLogs(pageNumber, limitNumber);

      res.status(200).json({
        message: "Audit logs retrieved successfully",
        data: logs.data,
        total: logs.total,
        page: pageNumber,
        limit: limitNumber,
      });
    } catch (error) {
      next(error);
    }
  }

  static async listByUserId(req, res, next) {
    try {
      const { userId } = req.query;
      const logs = await auditLogDao.listByUserId(userId);
      res.status(200).json(logs);
    } catch (error) {
      next(error);
    }
  }

  static async listByTypeAndId(req, res, next) {
    try {
      const { typeOfObject, objectId } = req.query;

      // Pokud je `objectId` poskytnuto, validujeme ho
      if (objectId && !mongoose.Types.ObjectId.isValid(objectId)) {
        return res.status(400).json({ error: "Invalid objectId format" });
      }

      const logs = await auditLogDao.listByTypeOfObjectAndId(
        typeOfObject,
        objectId
      );
      res.status(200).json(logs);
    } catch (error) {
      next(error);
    }
  }

  static async listByStatus(req, res, next) {
    try {
      const { status } = req.query;
      const logs = await auditLogDao.listByStatus(status);
      res.status(200).json(logs);
    } catch (error) {
      next(error);
    }
  }
}

export default AuditLogController;
