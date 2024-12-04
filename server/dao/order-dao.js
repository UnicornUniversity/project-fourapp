import Order from "../models/Order.js";
import { Product } from "../models/Product.mjs";
import { ApiError } from "../utils/error.mjs";

class orderDao {
  // Vytvoření nové objednávky
  static async create(orderData) {
    try {
      const newOrder = new Order(orderData);
      return await newOrder.save();
    } catch (error) {
      throw ApiError.badRequest("Failed to create order", error.message);
    }
  }

  // Získání objednávky podle ID
  static async get(id) {
    try {
      const order = await Order.findById(id);
      if (!order) throw ApiError.notFound("Order not found");
      return order;
    } catch (error) {
      throw ApiError.badRequest("Failed to get order", error.message);
    }
  }

  // Seznam všech objednávek
  static async list() {
    try {
      return await Order.find({});
    } catch (error) {
      throw ApiError.badRequest("Failed to list orders", error.message);
    }
  }

  // Aktualizace objednávky
  static async update(orderData) {
    try {
      const { id, ...updateData } = orderData;
      const updatedOrder = await Order.findByIdAndUpdate(id, updateData, {
        new: true,
      });
      if (!updatedOrder) throw ApiError.notFound("Order not found");
      return updatedOrder;
    } catch (error) {
      throw ApiError.badRequest("Failed to update order", error.message);
    }
  }

  // Aktualizace platební metody
  static async updatePaymentMethod(id, payment_method) {
    try {
      const updatedOrder = await Order.findByIdAndUpdate(
        id,
        { payment_method },
        { new: true }
      );
      if (!updatedOrder) throw ApiError.notFound("Order not found");
      return updatedOrder;
    } catch (error) {
      throw ApiError.badRequest(
        "Failed to update payment method",
        error.message
      );
    }
  }

  // Smazání objednávky
  static async delete(id) {
    try {
      const deletedOrder = await Order.findByIdAndDelete(id);
      if (!deletedOrder) throw ApiError.notFound("Order not found");
      return deletedOrder;
    } catch (error) {
      throw ApiError.badRequest("Failed to delete order", error.message);
    }
  }

  // Filtrování objednávek podle uživatele, roku a měsíce
  static async listByFilter(user_id, year, month) {
    try {
      const query = { user_id };
      if (year)
        query.createdAt = {
          $gte: new Date(year, 0, 1),
          $lte: new Date(year, 11, 31),
        };
      if (month)
        query.createdAt = {
          $gte: new Date(year, month - 1, 1),
          $lte: new Date(year, month, 0),
        };
      return await Order.find(query);
    } catch (error) {
      throw ApiError.badRequest(
        "Failed to list orders by filter",
        error.message
      );
    }
  }
}

export default orderDao;
