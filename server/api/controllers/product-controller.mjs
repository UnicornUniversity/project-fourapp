import { ProductAbl } from "../../abl/product-abl.mjs";
import { requireParam } from "../../utils/index.mjs";
import { listProductsQuerySchema } from "../../types/products.mjs";
import { Types } from "mongoose";
import logAction from "../../middleware/auditlog-middleware.js";

export default class ProductController {
  static async create(req, res, next) {
    try {
      const product = await ProductAbl.create(req.body);

      // Logování vytvoření produktu bez autentifikace
      await logAction(
        "create",
        "product",
        product._id,
        "system", // Pevná hodnota, pokud není potřeba uživatel pak se dá přidat req.user.id aby auditlog přidal usera co udělal změnu
        null,
        req.body,
        "success",
        "Product created successfully"
      )(req, res, next);

      res.status(201).json(product);
    } catch (error) {
      next(error);
    }
  }

  static async delete(req, res, next) {
    try {
      const id = Types.ObjectId.createFromHexString(
        requireParam("productId", req.params)
      );
      const product = await ProductAbl.get(id);

      // Logování před smazáním bez autentifikace
      await logAction(
        "delete",
        "product",
        id,
        "system", // Pevná hodnota, pokud není potřeba uživatel pak se dá přidat req.user.id aby auditlog přidal usera co udělal změnu
        product,
        null,
        "success",
        "Product deleted successfully"
      )(req, res, next);

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
      const id = Types.ObjectId.createFromHexString(
        requireParam("productId", req.params)
      );
      const previousProduct = await ProductAbl.get(id);
      const updatedProduct = await ProductAbl.update(id, req.body);

      // Logování aktualizace produktu bez autentifikace
      await logAction(
        "update",
        "product",
        id,
        "system", // Pevná hodnota, pokud není potřeba uživatel pak se dá přidat req.user.id aby auditlog přidal usera co udělal změnu
        previousProduct,
        req.body,
        "success",
        "Product updated successfully"
      )(req, res, next);

      res.status(200).json(updatedProduct);
    } catch (error) {
      next(error);
    }
  }

  static async get(req, res, next) {
    try {
      const id = Types.ObjectId.createFromHexString(
        requireParam("productId", req.params)
      );
      const product = await ProductAbl.get(id);
      res.status(200).json(product);
    } catch (error) {
      next(error);
    }
  }
}
