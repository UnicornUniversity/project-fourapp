import { Router } from "express";
import { OrderController } from "../api/controllers/order-controller.js";
import authMiddleware from "../middleware/auth-middleware.js";

const router = new Router();

router.get("/", OrderController.list);
router.post("/", authMiddleware, OrderController.create);
router.delete("/:id", OrderController.deleteOrder);
router.post("/:id/complete", OrderController.completeOrder);
router.patch("/:id/payment", OrderController.addPaymentMethod);

export default router;
