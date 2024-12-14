import auditLogDao from "../../dao/auditlog-dao.js";
import mongoose from "mongoose";

class AuditLogController {
  static async list(req, res, next) {
    try {
      const logs = await auditLogDao.list();
      res.status(200).json(logs);
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

      const logs = await auditLogDao.listByTypeOfObjectAndId(typeOfObject, objectId);
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

  static async create(req, res, next) {
    try {
      const { actionType, typeOfObject, objectId, userId, status, description } = req.body;

      // Validace povinných polí
      if (!actionType || !typeOfObject || !status) {
        return res.status(400).json({ error: "Missing required fields" });
      }

      const newLog = await auditLogDao.create({
        actionType,
        typeOfObject,
        objectId,
        userId,
        status,
        description,
      });

      res.status(201).json(newLog);
    } catch (error) {
      next(error);
    }
  }
}

export default AuditLogController;
