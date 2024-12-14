import express from "express";
import mongoose from "mongoose";
import OrderAbl from "../../abl/order-abl.js";
import userDao from "../../dao/user-dao.js";
import { ApiError } from "../../utils/error.mjs";
import logAction from "../../middleware/auditlog-middleware.js";

const router = express.Router();

router.post("/", async (req, res, next) => {
  const { user_id } = req.body;

  try {
    if (!user_id) {
      await logAction(
        "create",
        "order",
        null,
        "unknown_user",
        null,
        null,
        "error",
        "Missing user_id"
      )(req, res, () => {});
      throw ApiError.badRequest("Missing user_id");
    }

    if (!mongoose.Types.ObjectId.isValid(user_id)) {
      await logAction(
        "create",
        "order",
        null,
        user_id,
        null,
        null,
        "error",
        `Invalid user_id format: ${user_id}`
      )(req, res, () => {});
      throw ApiError.badRequest(`Invalid user_id format: ${user_id}`);
    }

    const user = await userDao.findById(user_id);
    if (!user) {
      await logAction(
        "create",
        "order",
        null,
        user_id,
        null,
        null,
        "error",
        "User not found"
      )(req, res, () => {});
      throw ApiError.notFound("User not found");
    }

    if (!user.cart_array || user.cart_array.length === 0) {
      await logAction(
        "create",
        "order",
        null,
        user_id,
        null,
        null,
        "error",
        "User's cart is empty"
      )(req, res, () => {});
      throw ApiError.badRequest("User's cart is empty");
    }

    const newOrder = await OrderAbl.createOrder(user_id);

    await logAction(
      "create",
      "order",
      newOrder._id,
      user_id,
      null,
      newOrder,
      "success",
      "Order created successfully"
    )(req, res, next);

    res.status(201).json({ message: "Order created successfully", newOrder });
  } catch (error) {
    const apiError = ApiError.fromError(error);

    res.status(apiError.statusCode).json(apiError.jsonObject());
  }
});


router.post("/:id/complete", async (req, res, next) => {
  const { id } = req.params;
  const { shipping_method, total_cost, shipping_address, payment_method } = req.body;

  try {
    const updatedOrder = await OrderAbl.completeOrder(
      id,
      shipping_method,
      total_cost,
      shipping_address,
      payment_method
    );

    await logAction(
      "update",
      "order",
      id,
      req.user?.id || "system",
      null,
      { shipping_method, total_cost, shipping_address, payment_method },
      "success",
      "Order completed successfully"
    )(req, res, () => {
      res.status(200).json({ message: "Order completed successfully", updatedOrder });
    });
  } catch (error) {
    const apiError = ApiError.fromError(error);
    await logAction(
      "update",
      "order",
      id,
      req.user?.id || "system",
      null,
      { shipping_method, total_cost, shipping_address, payment_method },
      "error",
      apiError.message
    )(req, res, () => {
      res.status(apiError.statusCode).json(apiError.jsonObject());
    });
  }
});

router.patch("/:id/payment", async (req, res, next) => {
  const { id } = req.params;
  const { payment_method } = req.body;

  try {
    if (!payment_method) {
      await logAction(
        "update",
        "order",
        id,
        req.user?.id || "system",
        null,
        null,
        "error",
        "Missing payment_method"
      )(req, res, () => {});
      throw ApiError.badRequest("Missing payment_method");
    }

    const updatedOrder = await OrderAbl.addPaymentMethod(id, payment_method);

    await logAction(
      "update",
      "order",
      id,
      req.user?.id || "system",
      null,
      { payment_method },
      "success",
      "Payment method updated successfully"
    )(req, res, next);

    res.status(200).json({
      message: "Payment method added successfully",
      updatedOrder,
    });
  } catch (error) {
    const apiError = ApiError.fromError(error);
    await logAction(
      "update",
      "order",
      id,
      req.user?.id || "system",
      null,
      { payment_method },
      "error",
      apiError.message
    )(req, res, () => {
      res.status(apiError.statusCode).json(apiError.jsonObject());
    });
  }
});

router.delete("/:id", async (req, res, next) => {
  const { id } = req.params;

  try {
    const deletedOrder = await OrderAbl.deleteOrder(id);

    await logAction(
      "delete",
      "order",
      id,
      req.user?.id || "system",
      deletedOrder,
      null,
      "success",
      "Order deleted successfully"
    )(req, res, () => {
      res.status(200).json({ message: "Order deleted successfully", deletedOrder });
    });
  } catch (error) {
    const apiError = ApiError.fromError(error);
    await logAction(
      "delete",
      "order",
      id,
      req.user?.id || "system",
      null,
      null,
      "error",
      apiError.message
    )(req, res, () => {
      res.status(apiError.statusCode).json(apiError.jsonObject());
    });
  }
});

export default router;
