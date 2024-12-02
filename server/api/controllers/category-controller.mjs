import { CategoryAbl } from "../../abl/category-abl.mjs";
import { requireParam } from "../../utils/index.mjs";

export default class CategoryController {
  static async create(req, res, next) {
    try {
      const category = await CategoryAbl.create(req.body);

      res.status(201).json(category);
    } catch (error) {
      next(error);
    }
  }

  static async update(req, res, next) {
    try {
      const id = requireParam("id", req.params);
      const updatedCategory = await CategoryAbl.update(id, req.body);

      res.status(200).json(updatedCategory);
    } catch (error) {
      next(error);
    }
  }

  static async delete(req, res, next) {
    try {
      const id = requireParam("id", req.params);
      await CategoryAbl.delete(id);

      res.status(204).send();
    } catch (error) {
      next(error);
    }
  }

  static async list(req, res, next) {
    try {
      const categories = await CategoryAbl.list();

      res.status(200).json({ categories });
    } catch (error) {
      next(error);
    }
  }

  static async get(req, res, next) {
    try {
      const id = requireParam("id", req.params);
      const category = await CategoryAbl.get(id);

      res.status(200).json(category);
    } catch (error) {
      next(error);
    }
  }

  static async getSubcategories(req, res, next) {
    try {
      const id = requireParam("categoryId", req.params);
      const subcategories = await CategoryAbl.getSubcategories(id);

      res.status(200).json({ subcategories });
    } catch (error) {
      next(error);
    }
  }

  static async getCategoryTree(req, res, next) {
    try {
      const id = requireParam("categoryId", req.params);
      const tree = await CategoryAbl.getCategoryTree(id);

      res.status(200).json(tree);
    } catch (error) {
      next(error);
    }
  }
}
