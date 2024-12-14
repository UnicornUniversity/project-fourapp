import auditLogDao from "../../dao/auditlog-dao.js";
import { ApiError } from "../../utils/error.mjs";

class AuditLogController {
  static async create(req, res, next) {
    try {
      const log = await auditLogDao.create(req.body);
      res.status(201).json(log);
    } catch (error) {
      next(error);
    }
  }

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
      const logs = await auditLogDao.listByUserId(req.params.userId);
      res.status(200).json(logs);
    } catch (error) {
      next(error);
    }
  }

  static async listByTypeAndId(req, res, next) {
    try {
      const logs = await auditLogDao.listByTypeOfObjectAndId(req.query.typeOfObject, req.query.objectId);
      res.status(200).json(logs);
    } catch (error) {
      next(error);
    }
  }

  static async listByStatus(req, res, next) {
    try {
      const logs = await auditLogDao.listByStatus(req.query.status);
      res.status(200).json(logs);
    } catch (error) {
      next(error);
    }
  }
}

export default AuditLogController;
