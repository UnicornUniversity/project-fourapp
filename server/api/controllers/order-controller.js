import express from "express";
import OrderAbl from "../../abl/order-abl.js"; // Import business logiky pro objednávky
import userDao from "../../dao/user-dao.js"; // Import pro práci s uživateli
import { ApiError } from "../../utils/error.mjs";

const router = express.Router();

// Vytvoření nové objednávky
router.post("/", async (req, res) => {
  const { user_id } = req.body;

  try {
    // Načtení uživatele
    const user = await userDao.findById(user_id);
    if (!user) {
      throw ApiError.notFound("User not found");
    }

    // Ověření, zda má uživatel produkty v košíku
    if (!user.cart_array || user.cart_array.length === 0) {
      throw ApiError.badRequest("User's cart is empty");
    }

    // Vytvoření objednávky přes OrderAbl
    const newOrder = await OrderAbl.createOrder(user_id);
    res.status(201).json({ message: "Order created successfully", newOrder });
  } catch (error) {
    console.error("Error creating order:", error.message);
    res.status(error.statusCode || 500).json({ error: error.message });
  }
});

// Dokončení objednávky
router.post("/:id/complete", async (req, res) => {
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
    res.status(200).json({ message: "Order completed successfully", updatedOrder });
  } catch (error) {
    console.error("Error completing order:", error.message);
    res.status(error.statusCode || 500).json({ error: error.message });
  }
});

// Přidání platební metody k objednávce
router.patch("/:id/payment", async (req, res) => {
  const { id } = req.params;
  const { payment_method } = req.body;

  try {
    const updatedOrder = await OrderAbl.addPaymentMethod(id, payment_method);
    res.status(200).json({ message: "Payment method added successfully", updatedOrder });
  } catch (error) {
    console.error("Error updating payment method:", error.message);
    res.status(error.statusCode || 500).json({ error: error.message });
  }
});

// Filtrování objednávek podle uživatele
router.get("/filter", async (req, res) => {
  const { user_id, year, month } = req.query;

  try {
    const orders = await OrderAbl.listOrdersByFilter(user_id, year, month);
    res.status(200).json(orders);
  } catch (error) {
    console.error("Error filtering orders:", error.message);
    res.status(error.statusCode || 500).json({ error: error.message });
  }
});

// Získání všech objednávek
router.get("/", async (req, res) => {
  try {
    const orders = await OrderAbl.listOrders();
    res.status(200).json(orders);
  } catch (error) {
    console.error("Error getting all orders:", error.message);
    res.status(error.statusCode || 500).json({ error: error.message });
  }
});

// Odstranění objednávky
router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const deletedOrder = await OrderAbl.deleteOrder(id);
    res.status(200).json({ message: "Order deleted successfully", deletedOrder });
  } catch (error) {
    console.error("Error deleting order:", error.message);
    res.status(error.statusCode || 500).json({ error: error.message });
  }
});

export default router;
