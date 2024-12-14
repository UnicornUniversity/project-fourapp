import auditLogDao from "../../dao/auditlog-dao.js";
import { requireParam } from "../../utils/index.mjs";

class AuditLogController {
  static async create(req, res, next) {
    try {
      const log = await auditLogDao.create(req.body);
      res.status(201).json(log);
    } catch (err) {
      next(err);
    }
  }

  static async list(req, res, next) {
    try {
      const logs = await auditLogDao.list();
      res.status(200).json(logs);
    } catch (err) {
      next(err);
    }
  }

  static async listByUserId(req, res, next) {
    try {
      const userId = requireParam("userId", req.params);
      const logs = await auditLogDao.listByUserId(userId);
      res.status(200).json(logs);
    } catch (err) {
      next(err);
    }
  }

  static async listByTypeAndId(req, res, next) {
    try {
      const { typeOfObject, objectId } = req.query;
      const logs = await auditLogDao.listByTypeOfObjectAndId(
        typeOfObject,
        objectId
      );
      res.status(200).json(logs);
    } catch (err) {
      next(err);
    }
  }

  static async listByStatus(req, res, next) {
    try {
      const status = requireParam("status", req.query);
      const logs = await auditLogDao.listByStatus(status);
      res.status(200).json(logs);
    } catch (err) {
      next(err);
    }
  }
}

export default AuditLogController;
