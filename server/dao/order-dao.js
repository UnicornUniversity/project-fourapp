import Order from "../models/Order.js";
import { Product } from "../models/Product.mjs";
import { ApiError } from "../utils/error.mjs";

class orderDao {
  static async create(orderData) {
    try {
      const newOrder = new Order(orderData);
      return await newOrder.save();
    } catch (error) {
      throw ApiError.badRequest("Failed to create order", {
        originalError: error.message,
      });
    }
  }

  static async get(id) {
    const order = await Order.findById(id);
    if (!order) {
      throw ApiError.notFound("Order not found");
    }
    return order;
  }

  static async getProductById(productId) {
    const product = await Product.findById(productId);
    if (!product) {
      throw ApiError.notFound("Product not found");
    }
    return product;
  }

  static async list() {
    return await Order.find({});
  }

  static async update(orderData) {
    const { id, ...updateData } = orderData;
    console.log(updateData)
    const updatedOrder = await Order.findByIdAndUpdate(id, updateData, {
      new: true,
    });
    if (!updatedOrder) {
      throw ApiError.notFound("Order not found");
    }
    return updatedOrder;
  }

  static async updatePaymentMethod(id, payment_method) {
    const updatedOrder = await Order.findByIdAndUpdate(
      id,
      { payment_method },
      { new: true }
    );
    if (!updatedOrder) {
      throw ApiError.notFound("Order not found");
    }
    return updatedOrder;
  }

  static async delete(id) {
    const deletedOrder = await Order.findByIdAndDelete(id);
    if (!deletedOrder) {
      throw ApiError.notFound("Order not found");
    }
    return deletedOrder;
  }

  static async listByFilter(user_id, year, month) {
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
  }

  static async findByUserId(userId) {
    try {
      return await Order.find({ user_id: userId })
        .sort({ createdAt: -1 })
        .populate("products_array.id");
    } catch (error) {
      throw ApiError.internal("Failed to fetch user orders", error.message);
    }
  }
}

export default orderDao;
