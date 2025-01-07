import UserAbl from "../../abl/user-abl.js";
import { requireParam } from "../../utils/index.mjs";
import { ApiError } from "../../utils/error.mjs";

export class UserController {
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

      const updatedUser = await UserAbl.updateUser(userId, updatedData);

      res.status(200).json(updatedUser);
    } catch (error) {
      next(error);
    }
  }

  static async delete(req, res, next) {
    try {
      const userId = requireParam("userId", req.params);

      await UserAbl.deleteUser(userId);
      res.status(204).send();
    } catch (error) {
      next(error);
    }
  }

  static async register(req, res, next) {
    try {
      await UserAbl.createUser(req.body);

      res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
      next(error);
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
