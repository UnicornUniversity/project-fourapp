import express from "express";
import OrderAbl from "../../abl/order-abl.js";
import { userDao } from "../../dao/user-dao.js";
import { ApiError } from "../../utils/error.mjs";

const router = express.Router();

router.post("/", async (req, res) => {
  const { user_id } = req.body;

  try {
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
    const apiError = ApiError.fromError(error);
    console.error(apiError.message);
    res.status(apiError.statusCode).json(apiError.jsonObject());
  }
});

router.post("/:id/complete", async (req, res) => {
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
    const apiError = ApiError.fromError(error);
    console.error(apiError.message);
    res.status(apiError.statusCode).json(apiError.jsonObject());
  }
});

router.patch("/:id/payment", async (req, res) => {
  const { id } = req.params;
  const { payment_method } = req.body;

  try {
    const updatedOrder = await OrderAbl.addPaymentMethod(id, payment_method);
    res
      .status(200)
      .json({ message: "Payment method added successfully", updatedOrder });
  } catch (error) {
    const apiError = ApiError.fromError(error);
    console.error(apiError.message);
    res.status(apiError.statusCode).json(apiError.jsonObject());
  }
});

router.get("/filter", async (req, res) => {
  const { user_id, year, month } = req.query;

  try {
    const orders = await OrderAbl.listOrdersByFilter(user_id, year, month);
    res.status(200).json(orders);
  } catch (error) {
    const apiError = ApiError.fromError(error);
    console.error(apiError.message);
    res.status(apiError.statusCode).json(apiError.jsonObject());
  }
});

router.get("/", async (req, res) => {
  try {
    const orders = await OrderAbl.listOrders();
    res.status(200).json(orders);
  } catch (error) {
    const apiError = ApiError.fromError(error);
    console.error(apiError.message);
    res.status(apiError.statusCode).json(apiError.jsonObject());
  }
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const deletedOrder = await OrderAbl.deleteOrder(id);
    res
      .status(200)
      .json({ message: "Order deleted successfully", deletedOrder });
  } catch (error) {
    const apiError = ApiError.fromError(error);
    console.error(apiError.message);
    res.status(apiError.statusCode).json(apiError.jsonObject());
  }
});

export default router;
