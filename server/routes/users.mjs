import express from "express";
import { UserController } from "../api/controllers/user-controller.js";
import authMiddleware from "../middleware/auth-middleware.js";

const router = express.Router();

router.post("/register", UserController.register);
router.get("/wishlist/:userId", UserController.getWishlist);
router.get("/cart/:userId", UserController.getCart);
router.get("/search", UserController.searchByFilters);
router.put("/:userId", UserController.update);
router.get("/:userId", UserController.get);
router.delete("/:userId", UserController.delete);
router.get("/", UserController.list);
router.post("/cart/add-item",authMiddleware ,UserController.addItemToCart);
router.post("/wishlist/add-item",authMiddleware, UserController.addItemToWishlist);
router.post("/cart/remove-item", authMiddleware, UserController.removeItemFromCart);
router.post("/wishlist/remove-item", authMiddleware, UserController.removeItemFromWishlist);
router.post("/cart/update-quantity", authMiddleware, UserController.updateCartItemQuantity);

export default router;
