import { Router } from "express";
import OrderController from "../api/controllers/order-controller.js";

const router = new Router();

router.post("/", OrderController.create);
router.post("/:id/complete", OrderController.complete);
router.patch("/:id/payment", OrderController.addPaymentMethod);
router.get("/filter", OrderController.filterByUser);

export default router;
