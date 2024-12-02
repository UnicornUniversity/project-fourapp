import orderDao from "../dao/order-dao.js";
import userDao from "../dao/user-dao.js";
import { ApiError } from "../utils/error.mjs";

class OrderAbl {
  // Vytvoření objednávky
  static async createOrder(user_id) {
    const user = await userDao.findById(user_id);
    if (!user) throw ApiError.notFound("User not found");

    const cart = user.cart_array || [];
    if (cart.length === 0) throw ApiError.badRequest("User's cart is empty");

    const order = {
      user_id,
      products_array: cart.map((item) => ({
        id: item.id,
        variantId: item.variantId,
        quantity: item.quantity,
      })),
      billing_address: {
        street: user.billing_address.billing_street_address,
        city: user.billing_address.billing_city,
        zip_code: user.billing_address.billing_zip_code,
        country: user.billing_address.billing_country,
      },
      shipping_address: {
        street: user.shipping_address.shipping_street_address,
        city: user.shipping_address.shipping_city,
        zip_code: user.shipping_address.shipping_zip_code,
        country: user.shipping_address.shipping_country,
      },
      total_cost: await this.calculateTotalCost(cart),
      status: "pending",
    };

    return await orderDao.create(order);
  }

  // Výpočet celkové ceny
  static async calculateTotalCost(cart) {
    let totalCost = 0;
    for (const item of cart) {
      const product = await orderDao.getProductById(item.id);
      if (!product) throw ApiError.notFound(`Product ${item.id} not found`);
      totalCost += product.price * item.quantity;
    }
    return totalCost;
  }

  // Dokončení objednávky
  static async completeOrder(id, shipping_method, total_cost, shipping_address, payment_method) {
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
}

export default OrderAbl;
