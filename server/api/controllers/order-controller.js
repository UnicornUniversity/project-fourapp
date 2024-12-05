import OrderAbl from "../../abl/order-abl.js"; // Import business logiky pro objednávky
import userDao from "../../dao/user-dao.js"; // Import pro práci s uživateli
import { ApiError } from "../../utils/error.mjs";

class OrderController {
  // Vytvoření nové objednávky
  static async create(req, res, next) {
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
      res.status(201).json(newOrder);
    } catch (error) {
      next(error);
    }
  }

  // Dokončení objednávky
  static async complete(req, res, next) {
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
      res.status(200).json(updatedOrder);
    } catch (error) {
      next(error);
    }
  }

  // Přidání platební metody k objednávce
  static async addPaymentMethod(req, res, next) {
    const { id } = req.params;
    const { payment_method } = req.body;

    try {
      const updatedOrder = await OrderAbl.addPaymentMethod(id, payment_method);
      res.status(200).json(updatedOrder);
    } catch (error) {
      next(error);
    }
  }

  // Filtrování objednávek podle uživatele
  static async filterByUser(req, res, next) {
    const { user_id, year, month } = req.query;

    try {
      const orders = await OrderAbl.listOrdersByFilter(user_id, year, month);
      res.status(200).json(orders);
    } catch (error) {
      next(error);
    }
  }
}

export default OrderController;
