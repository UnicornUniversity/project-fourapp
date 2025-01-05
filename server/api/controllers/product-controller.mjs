import { ProductAbl } from "../../abl/product-abl.mjs";
import { requireParam } from "../../utils/index.mjs";
import { listProductsQuerySchema } from "../../types/products.mjs";
import { Types } from "mongoose";
import { ApiError } from "../../utils/error.mjs";

export default class ProductController {
  static async create(req, res, next) {
    try {
      const product = await ProductAbl.create(req.body);

      res.status(201).json(product);
    } catch (error) {
      next(error);
    }
  }

  static async addVariant(req, res, next) {
    try {
      const productId = requireParam("productId", req.params);

      if (!Types.ObjectId.isValid(productId)) {
        throw ApiError.badRequest("Invalid product ID");
      }

      const updatedProduct = await ProductAbl.addVariant(productId, req.body);
      res.status(201).json(updatedProduct);
    } catch (error) {
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

      res.status(204).send();
    } catch (error) {
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

      res.status(200).json(updatedProduct);
    } catch (error) {
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

  static async uploadVariantImages(req, res, next) {
    try {
      const { productId, variantId } = req.params;

      if (!req.files || req.files.length === 0) {
        throw ApiError.badRequest("No files uploaded");
      }

      const imageUrls = req.files.map(
        (file) => `/images/products/${file.filename}`
      );

        await ProductAbl.updateVariantImages(
        productId,
        variantId,
        imageUrls
      );

      res.status(200).json({
        message: "Images uploaded successfully",
        images: imageUrls,
      });
    } catch (error) {
      next(error);
    }
  }
}
