import orderDao from "../dao/order-dao.js";
import userDao from "../dao/user-dao.js";
import { ApiError } from "../utils/error.mjs";
import { Product } from "../models/Product.mjs";
import mongoose from "mongoose";

class OrderAbl {
  // Vytvoření objednávky
  static async createOrder(user_id) {
    const user = await userDao.findById(user_id);
    console.log(user, user_id, 1);
    if (!user) throw ApiError.notFound("User not found");

    const cart = user.cart_array || [];
    if (cart.length === 0) throw ApiError.badRequest("User's cart is empty");
    const productIds = cart.map(
      (item) => new mongoose.Types.ObjectId(item.productId)
    );
    const products = await Product.find({ _id: { $in: productIds } });

    const order = {
      user_id,
      products_array: cart.map((item) => {
        const product = products.find(
          (p) => p._id.toString() === item.productId.toString()
        );
        if (!product)
          throw ApiError.notFound(`Product ${item.productId} not found`);

        const variant = product.variants.find(
          (v) => v._id.toString() === item.variantId.toString()
        );
        if (!variant)
          throw ApiError.notFound(`Variant ${item.variantId} not found`);

        return {
          id: product._id,
          variantId: variant._id,
          quantity: item.quantity,
        };
      }),
      billing_address: user.billing_address,
      shipping_address: user.shipping_address,
      total_cost: await this.calculateTotalCost(cart),
      status: "pending",
    };

    return await orderDao.create(order);
  }

  // Výpočet celkové ceny
  static async calculateTotalCost(cart) {
    let totalCost = 0;
    for (const item of cart) {
      const product = await Product.findById(item.productId);
      if (!product)
        throw ApiError.notFound(`Product ${item.productId} not found`);

      const variant = product.variants.find(
        (v) => v._id.toString() === item.variantId.toString()
      );
      if (!variant)
        throw ApiError.notFound(`Variant ${item.variantId} not found`);

      totalCost += product.price * item.quantity; // Pokud má varianta vlastní cenu, nahraď `product.price` cenou varianty.
    }
    return totalCost;
  }

  // Dokončení objednávky
  static async completeOrder(
    id,
    shipping_method,
    total_cost,
    shipping_address,
    payment_method
  ) {
    const validShippingMethods = ["Standard", "Express", "Courier"];
    const validPaymentMethods = ["Credit Card", "PayPal", "Bank Transfer"];

    if (!validShippingMethods.includes(shipping_method)) {
      throw ApiError.badRequest("Invalid shipping method");
    }

    if (!validPaymentMethods.includes(payment_method)) {
      throw ApiError.badRequest("Invalid payment method");
    }

    const order = await orderDao.get(id);
    if (!order) throw ApiError.notFound("Order not found");
    if (order.status !== "pending") {
      throw ApiError.forbidden("Order is not in pending state");
    }

    return await orderDao.update({
      id,
      shipping_method,
      total_cost,
      shipping_address,
      payment_method,
      status: "processing",
    });
  }
  
  // Přidání platební metody
  static async addPaymentMethod(id, payment_method) {
    return await orderDao.updatePaymentMethod(id, payment_method);
  }

  // Filtrování objednávek podle uživatele
  static async listOrdersByFilter(user_id, year, month) {
    return await orderDao.listByFilter(user_id, year, month);
  }

  // Získání všech objednávek
  static async getAllOrders() {
    try {
      return await orderDao.list();
    } catch (error) {
      throw ApiError.internal("Failed to retrieve orders", error.message);
    }
  }

  static async listOrders() {
    try {
      return await orderDao.list();
    } catch (error) {
      throw {
        status: 500,
        message: "Failed to list orders",
        details: error.message,
      };
    }
  }

  // Smazání objednávky podle ID
  static async deleteOrder(id) {
    try {
      const order = await orderDao.delete(id);
      if (!order) {
        throw ApiError.notFound("Order not found");
      }
      return order;
    } catch (error) {
      throw ApiError.internal("Failed to delete order", error.message);
    }
  }

  static async getUserOrders(userId) {
    try {
      const user = await userDao.findById(userId);
      if (!user) throw ApiError.notFound("User not found");

      const orders = await orderDao.findByUserId(userId);
      return orders;
    } catch (error) {
      throw ApiError.fromError(error, "Failed to get user orders");
    }
  }
}

export default OrderAbl;
