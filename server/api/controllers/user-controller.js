import express from "express";
import UserAbl from "../../abl/user-abl.js";
import { requireParam } from "../../utils/index.mjs";
import { ApiError } from "../../utils/error.mjs";
import logAction from "../../middleware/auditlog-middleware.js";

const router = express.Router();

class UserController {
  static async get(req, res, next) {
    try {
      const userId = requireParam("userId", req.params);
      const user = await UserAbl.getUser(userId);
      res.status(200).json(user);
    } catch (error) {
      next(error);
    }
  }

  static async getWishlist(req, res, next) {
    try {
      const userId = requireParam("userId", req.params);
      const wishlist = await UserAbl.getWishlist(userId);
      res.status(200).json(wishlist);
    } catch (error) {
      next(error);
    }
  }

  static async addItemToWishlist(req, res, next) {
    try {
      const userId = req.user.id; // Middleware pro ověření uživatele
      const { productId, variantId } = req.body;
  
      if (!productId || !variantId) {
        throw ApiError.badRequest("Product ID and Variant ID are required");
      }
  
      const updatedWishlist = await UserAbl.addItemToWishlist(
        userId,
        productId,
        variantId
      );
  
      res.status(200).json(updatedWishlist);
    } catch (error) {
      next(ApiError.fromError(error));
    }
  }
  
  static async getCart(req, res, next) {
    try {
      const userId = requireParam("userId", req.params);
      const cart = await UserAbl.getCart(userId);
      res.status(200).json(cart);
    } catch (error) {
      next(error);
    }
  }

  static async addItemToCart(req, res, next) {
    try {
      const userId = req.user.id; // Předpokládá middleware pro autentizaci
      const { productId, variantId, quantity } = req.body;
  
      if (!productId || !variantId) {
        throw ApiError.badRequest("Product ID and Variant ID are required");
      }
  
      const updatedCart = await UserAbl.addItemToCart(
        userId,
        productId,
        variantId,
        quantity || 1
      );
  
      res.status(200).json(updatedCart);
    } catch (error) {
      next(ApiError.fromError(error));
    }
  }
  
  static async update(req, res, next) {
    try {
      const userId = requireParam("userId", req.params);
      const updatedData = req.body;

      if (!updatedData || Object.keys(updatedData).length === 0) {
        throw ApiError.badRequest("No data provided for update.");
      }

      const previousUser = await UserAbl.getUser(userId);
      const updatedUser = await UserAbl.updateUser(userId, updatedData);

      await logAction(
        "update",
        "user",
        userId,
        req.user?.id || "system",
        previousUser,
        updatedData,
        "success",
        "User updated successfully"
      )(req, res, next);

      res.status(200).json(updatedUser);
    } catch (error) {
      const apiError = ApiError.fromError(error);
      await logAction(
        "update",
        "user",
        req.params.userId,
        req.user?.id || "system",
        null,
        req.body,
        "error",
        apiError.message
      )(req, res, next);
      res.status(apiError.statusCode).json(apiError.jsonObject());
    }
  }

  static async delete(req, res, next) {
    try {
      const userId = requireParam("userId", req.params);
      const previousUser = await UserAbl.getUser(userId);

      await logAction(
        "delete",
        "user",
        userId,
        req.user?.id || "system",
        previousUser,
        null,
        "success",
        "User deleted successfully"
      )(req, res, next);

      await UserAbl.deleteUser(userId);
      res.status(204).send();
    } catch (error) {
      const apiError = ApiError.fromError(error);
      await logAction(
        "delete",
        "user",
        req.params.userId,
        req.user?.id || "system",
        null,
        null,
        "error",
        apiError.message
      )(req, res, next);
      res.status(apiError.statusCode).json(apiError.jsonObject());
    }
  }

  static async register(req, res, next) {
    try {
      const newUser = await UserAbl.createUser(req.body);

      await logAction(
        "create",
        "user",
        newUser._id,
        "system", // Registrace neobsahuje uživatelské ID
        null,
        req.body, // Nová data uživatele
        "success",
        "User registered successfully"
      )(req, res, next);

      res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
      const apiError = ApiError.fromError(error);

      await logAction(
        "create",
        "user",
        null, // Uživatel nebyl vytvořen, takže není ID
        "system",
        null,
        req.body,
        "error",
        apiError.message
      )(req, res, next);

      res.status(apiError.statusCode).json(apiError.jsonObject());
    }
  }

  static async list(req, res, next) {
    try {
      const { limit, page } = req.query;
      const users = await UserAbl.listUsers({ limit, page });
      res.status(200).json(users);
    } catch (error) {
      next(error);
    }
  }

  static async searchByFilters(req, res, next) {
    try {
      const filters = req.query;
      const users = await UserAbl.searchByFilters(filters);
      res.status(200).json(users);
    } catch (error) {
      next(error);
    }
  }
}

router.post("/register", UserController.register);
router.get("/wishlist/:userId", UserController.getWishlist);
router.get("/cart/:userId", UserController.getCart);
router.put("/:userId", UserController.update);
router.get("/:userId", UserController.get);
router.delete("/:userId", UserController.delete);
router.get("/", UserController.list);
router.get("/search", UserController.searchByFilters);
router.post("/cart/add-item", UserController.addItemToCart);
router.post("/wishlist/add-item", UserController.addItemToWishlist);

export default router;
