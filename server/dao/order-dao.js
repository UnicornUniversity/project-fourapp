import Order from "../models/Order.js";
import { ApiError } from "../utils/error.mjs";

class orderDao {
  // Vytvoření nové objednávky
  static async create(orderData) {
    const newOrder = new Order(orderData);
    return await newOrder.save();
  }

  // Získání objednávky podle ID
  static async get(id) {
    return await Order.findById(id);
  }

  // Seznam všech objednávek
  static async list() {
    return await Order.find({});
  }

  // Aktualizace objednávky
  static async update(orderData) {
    const { id, ...updateData } = orderData;
    const updatedOrder = await Order.findByIdAndUpdate(id, updateData, {
      new: true,
    });
    if (!updatedOrder) throw ApiError.notFound("Order not found");
    return updatedOrder;
  }

  // Aktualizace platební metody
  static async updatePaymentMethod(id, payment_method) {
    const updatedOrder = await Order.findByIdAndUpdate(
      id,
      { payment_method },
      { new: true }
    );
    if (!updatedOrder) throw ApiError.notFound("Order not found");
    return updatedOrder;
  }

  // Smazání objednávky
  static async delete(id) {
    const deletedOrder = await Order.findByIdAndDelete(id);
    if (!deletedOrder) throw ApiError.notFound("Order not found");
    return deletedOrder;
  }

  // Filtrování objednávek podle uživatele, roku a měsíce
  static async listByFilter(user_id, year, month) {
    const query = { user_id };
    if (year) {
      query.createdAt = {
        $gte: new Date(year, 0, 1),
        $lte: new Date(year, 11, 31),
      };
    }

    if (month) {
      query.createdAt = {
        $gte: new Date(year, month - 1, 1),
        $lte: new Date(year, month, 0),
      };
    }

    return await Order.find(query);
  }
}

export default orderDao;
