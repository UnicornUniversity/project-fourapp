import OrderAbl from "../../abl/order-abl.js";
import userDao from "../../dao/user-dao.js";
import { ApiError } from "../../utils/error.mjs";

export class OrderController {
  static async create(req, res, next) {
    try {
      const userId = req.user?.id;

      const user = await userDao.findById(userId);
      if (!user) {
        throw ApiError.notFound("User not found");
      }

      if (!user.cart_array || user.cart_array.length === 0) {
        throw ApiError.badRequest("User's cart is empty");
      }

      const newOrder = await OrderAbl.createOrder(userId);

      res.status(201).json({ message: "Order created successfully", newOrder });
    } catch (error) {
      next(error);
    }
  }

  static async completeOrder(req, res, next) {
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
  }

  static async addPaymentMethod(req, res, next) {
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
  }

  static async deleteOrder(req, res, next) {
    const { id } = req.params;

    try {
      const deletedOrder = await OrderAbl.deleteOrder(id);

      res
        .status(200)
        .json({ message: "Order deleted successfully", deletedOrder });
    } catch (error) {
      next(error);
    }
  }

  static async list(req, res, next) {
    try {
      const orders = await OrderAbl.listOrders();

      res.status(200).json(orders);
    } catch (error) {
      next(error);
    }
  }

  static async getUserOrders(req, res, next) {
    try {
      const userId = req.params.userId;
      
      if (req.user.id !== userId) {
        throw ApiError.forbidden("You can only view your own orders");
      }

      const orders = await OrderAbl.getUserOrders(userId);
      res.status(200).json(orders);
    } catch (error) {
      next(error);
    }
  }
}
