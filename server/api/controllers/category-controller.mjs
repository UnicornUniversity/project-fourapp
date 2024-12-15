import { Types } from "mongoose";
import { CategoryAbl } from "../../abl/category-abl.mjs";
import { requireParam } from "../../utils/index.mjs";
import logAction from "../../middleware/auditlog-middleware.js";
import { ApiError } from "../../utils/error.mjs";

export default class CategoryController {
  static async create(req, res, next) {
    try {
      const category = await CategoryAbl.create(req.body);

      await logAction(
        "create",
        "category",
        category._id,
        req.user?.id || "system",
        null,
        req.body,
        "success",
        "Category created successfully"
      )(req, res, next);

      res.status(201).json(category);
    } catch (error) {
      await logAction(
        "create",
        "category",
        null,
        req.user?.id || "system",
        null,
        req.body,
        "error",
        error.message
      )(req, res, () => {
        next(error);
      });
    }
  }

  static async update(req, res, next) {
    try {
      const id = Types.ObjectId.createFromHexString(
        requireParam("categoryId", req.params)
      );
      const previousCategory = await CategoryAbl.get(id);
      const updatedCategory = await CategoryAbl.update(id, req.body);

      await logAction(
        "update",
        "category",
        id,
        req.user?.id || "system",
        previousCategory,
        req.body,
        "success",
        "Category updated successfully"
      )(req, res, next);

      res.status(200).json(updatedCategory);
    } catch (error) {
      await logAction(
        "update",
        "category",
        req.params.categoryId,
        req.user?.id || "system",
        null,
        req.body,
        "error",
        error.message
      )(req, res, () => {
        next(error);
      });
    }
  }

  static async delete(req, res, next) {
    try {
      const id = Types.ObjectId.createFromHexString(
        requireParam("categoryId", req.params)
      );
      const category = await CategoryAbl.get(id);
      
      if (!category) {
        await logAction(
          "delete",
          "category",
          id,
          req.user?.id || "system",
          null,
          null,
          "error",
          "Category not found"
        )(req, res, () => {});
        throw ApiError.notFound("Category not found");
      }
      
      await logAction(
        "delete",
        "category",
        id,
        req.user?.id || "system",
        category,
        null,
        "success",
        "Category deleted successfully"
      )(req, res, next);

      await CategoryAbl.delete(id);
      res.status(204).send();
    } catch (error) {
      await logAction(
        "delete",
        "category",
        req.params.categoryId,
        req.user?.id || "system",
        null,
        null,
        "error",
        error.message
      )(req, res, () => {
        next(error);
      });
    }
  }

  static async list(req, res, next) {
    try {
      const categories = await CategoryAbl.list();
      res.status(200).json({ categories });
    } catch (error) {
      next(error); // Logování není potřeba u listování
    }
  }

  static async get(req, res, next) {
    try {
      const id = Types.ObjectId.createFromHexString(
        requireParam("categoryId", req.params)
      );
      const category = await CategoryAbl.get(id);
      res.status(200).json(category);
    } catch (error) {
      next(error); // Logování není potřeba u get endpointu
    }
  }

  static async getSubcategories(req, res, next) {
    try {
      const id = Types.ObjectId.createFromHexString(
        requireParam("categoryId", req.params)
      );
      const subcategories = await CategoryAbl.getSubcategories(id);
      res.status(200).json({ subcategories });
    } catch (error) {
      next(error); // Logování není potřeba
    }
  }

  static async getCategoryTree(req, res, next) {
    try {
      const id = Types.ObjectId.createFromHexString(
        requireParam("categoryId", req.params)
      );
      const tree = await CategoryAbl.getCategoryTree(id);
      res.status(200).json(tree);
    } catch (error) {
      next(error); // Logování není potřeba
    }
  }
}
