import auditLogDao from "../dao/auditlog-dao.js";

const logAction = (actionType, typeOfObject, objectId, userId, previousData, newData, status = "success", description = "") => async (req, res, next) => {
  try {
    await auditLogDao.create({
      actionType,
      typeOfObject,
      objectId,
      userId: req.user.id || userId,
      previousData,
      newData,
      status,
      description,
    });
    next();
  } catch (err) {
    console.error("Failed to log action:", err);
    next(err);
  }
};

export default logAction;
