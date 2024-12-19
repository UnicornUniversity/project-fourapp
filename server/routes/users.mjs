import express from "express";
import { UserController } from "../api/controllers/user-controller.js";

const router = express.Router();

router.post("/register", UserController.register);
router.get("/wishlist/:userId", UserController.getWishlist);
router.get("/cart/:userId", UserController.getCart);
router.get("/search", UserController.searchByFilters);
router.put("/:userId", UserController.update);
router.get("/:userId", UserController.get);
router.delete("/:userId", UserController.delete);
router.get("/", UserController.list);
router.post("/cart/add-item", UserController.addItemToCart);
router.post("/wishlist/add-item", UserController.addItemToWishlist);

export default router;
