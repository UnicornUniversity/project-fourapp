import express from 'express';
import UserAbl from '../../abl/user-abl.js';
import { requireParam } from '../../utils/index.mjs';

const router = express.Router();

class UserController {
  static async getWishlist(req, res, next) {
    try {
      const userId = requireParam('userId', { value: req.params.userId });
      const wishlist = await UserAbl.getWishlist(userId);
      res.status(200).json(wishlist);
    } catch (error) {
      next(error);
    }
  }

  static async getCart(req, res, next) {
    try {
      const userId = requireParam('userId', { value: req.params.userId });
      const cart = await UserAbl.getCart(userId);
      res.status(200).json(cart);
    } catch (error) {
      next(error);
    }
  }

  static async update(req, res, next) {
    try {
      const userId = requireParam("userId", { value: req.params.userId });
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
      const userId = requireParam('userId', { value: req.params.userId });
      await UserAbl.deleteUser(userId);
      res.status(204).send();
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

router.get('/wishlist/:userId', UserController.getWishlist);
router.get('/cart/:userId', UserController.getCart);
router.put('/:userId', UserController.update);
router.delete('/:userId', UserController.delete);
router.get('/', UserController.list);
router.get('/search', UserController.searchByFilters);

export default router;
