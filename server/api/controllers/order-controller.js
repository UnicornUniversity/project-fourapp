import express from "express";
import mongoose from "mongoose";
import OrderAbl from "../../abl/order-abl.js";
import userDao from "../../dao/user-dao.js";
import { ApiError } from "../../utils/error.mjs";

const router = express.Router();

router.post("/", async (req, res, next) => {
  const { user_id } = req.body;

  try {
    if (!user_id) {
      throw ApiError.badRequest("Missing user_id");
    }

    if (!mongoose.Types.ObjectId.isValid(user_id)) {
      throw ApiError.badRequest(`Invalid user_id format: ${user_id}`);
    }

    const user = await userDao.findById(user_id);
    if (!user) {
      throw ApiError.notFound("User not found");
    }

    if (!user.cart_array || user.cart_array.length === 0) {
      throw ApiError.badRequest("User's cart is empty");
    }

    const newOrder = await OrderAbl.createOrder(user_id);

    res.status(201).json({ message: "Order created successfully", newOrder });
  } catch (error) {
    next(error);
  }
});

router.post("/:id/complete", async (req, res, next) => {
  const { id } = req.params;
  const { shipping_method, total_cost, shipping_address, payment_method } =
    req.body;

  try {
    const updatedOrder = await OrderAbl.completeOrder(
      id,
      shipping_method,
      total_cost,
      shipping_address,
      payment_method
    );

    res
      .status(200)
      .json({ message: "Order completed successfully", updatedOrder });
  } catch (error) {
    next(error);
  }
});

router.patch("/:id/payment", async (req, res, next) => {
  const { id } = req.params;
  const { payment_method } = req.body;

  try {
    if (!payment_method) {
      throw ApiError.badRequest("Missing payment_method");
    }

    const updatedOrder = await OrderAbl.addPaymentMethod(id, payment_method);

    res.status(200).json({
      message: "Payment method added successfully",
      updatedOrder,
    });
  } catch (error) {
    next(error);
  }
});

router.delete("/:id", async (req, res, next) => {
  const { id } = req.params;

  try {
    const deletedOrder = await OrderAbl.deleteOrder(id);

    res
      .status(200)
      .json({ message: "Order deleted successfully", deletedOrder });
  } catch (error) {
    next(error);
  }
});

export default router;
