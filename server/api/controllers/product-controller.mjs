import { ProductAbl } from "../../abl/product-abl.mjs";
import { requireParam } from "../../utils/index.mjs";
import { listProductsQuerySchema } from "../../types/products.mjs";
import { Types } from "mongoose";
import logAction from "../../middleware/auditlog-middleware.js";
import { ApiError } from "../../utils/error.mjs";

export default class ProductController {
  static async create(req, res, next) {
    try {
      const product = await ProductAbl.create(req.body);

      await logAction(
        "create",
        "product",
        product._id,
        req.user?.id || "system",
        null,
        req.body,
        "success",
        "Product created successfully"
      )(req, res, next);

      res.status(201).json(product);
    } catch (error) {
      const apiError = ApiError.fromError(error);
      await logAction(
        "create",
        "product",
        null,
        req.user?.id || "system",
        null,
        req.body,
        "error",
        apiError.message
      )(req, res, next);
      next(error);
    }
  }

  static async delete(req, res, next) {
    try {
      const id = requireParam("productId", req.params);

      // Validate ID
      if (!Types.ObjectId.isValid(id)) {
        throw ApiError.badRequest("Invalid product ID");
      }

      const product = await ProductAbl.get(id);
      if (!product) {
        throw ApiError.notFound("Product not found");
      }

      await ProductAbl.delete(id);

      await logAction(
        "delete",
        "product",
        id,
        req.user?.id || "system",
        product,
        null,
        "success",
        "Product deleted successfully"
      )(req, res, next);

      res.status(204).send();
    } catch (error) {
      const apiError = ApiError.fromError(error);
      await logAction(
        "delete",
        "product",
        req.params.productId,
        req.user?.id || "system",
        null,
        null,
        "error",
        apiError.message
      )(req, res, next);
      next(error);
    }
  }

  static async list(req, res, next) {
    try {
      const filters = listProductsQuerySchema.parse(req.query);
      const result = await ProductAbl.list(filters);
      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }

  static async update(req, res, next) {
    try {
      const id = requireParam("productId", req.params);

      // Validate ID
      if (!Types.ObjectId.isValid(id)) {
        throw ApiError.badRequest("Invalid product ID");
      }

      const previousProduct = await ProductAbl.get(id);
      if (!previousProduct) {
        throw ApiError.notFound("Product not found");
      }

      const updatedProduct = await ProductAbl.update(id, req.body);

      await logAction(
        "update",
        "product",
        id,
        req.user?.id || "system",
        previousProduct,
        req.body,
        "success",
        "Product updated successfully"
      )(req, res, next);

      res.status(200).json(updatedProduct);
    } catch (error) {
      const apiError = ApiError.fromError(error);
      await logAction(
        "update",
        "product",
        req.params.productId,
        req.user?.id || "system",
        null,
        req.body,
        "error",
        apiError.message
      )(req, res, next);
      next(error);
    }
  }

  static async get(req, res, next) {
    try {
      const id = requireParam("productId", req.params);

      // Validate ID
      if (!Types.ObjectId.isValid(id)) {
        throw ApiError.badRequest("Invalid product ID");
      }

      const product = await ProductAbl.get(id);
      if (!product) {
        throw ApiError.notFound("Product not found");
      }

      res.status(200).json(product);
    } catch (error) {
      next(error);
    }
  }

  static async getLatest(req, res, next) {
    try {
      const latestProducts = await ProductAbl.getLatest();
      res.status(200).json({ products: latestProducts });
    } catch (error) {
      next(error);
    }
  }
}
