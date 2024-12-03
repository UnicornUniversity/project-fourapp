import { ProductAbl } from "../../abl/product-abl.mjs";
import { requireParam } from "../../utils/index.mjs";
import { listProductsQuerySchema } from "../../types/products.mjs";

export default class ProductController {
  static async create(req, res, next) {
    try {
      const product = await ProductAbl.create(req.body);

      res.status(201).json(product);
    } catch (error) {
      next(error);
    }
  }

  static async delete(req, res, next) {
    try {
      const id = requireParam("id", req.params);
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
      const id = requireParam("id", req.params);
      const updatedProduct = await ProductAbl.update(id, req.body);

      res.status(200).json(updatedProduct);
    } catch (error) {
      next(error);
    }
  }

  static async get(req, res, next) {
    try {
      const id = requireParam("id", req.params);
      const product = await ProductAbl.get(id);

      res.status(200).json(product);
    } catch (error) {
      next(error);
    }
  }
}
