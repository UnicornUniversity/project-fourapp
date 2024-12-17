import { Router } from "express";
import CategoryController from "../api/controllers/category-controller.mjs";

const router = new Router();

router.post("/", CategoryController.create);
router.get("/", CategoryController.list);
router.get("/alltree" , CategoryController.getCategoriesTree);
router.get("/:categoryId", CategoryController.get);
router.put("/:categoryId", CategoryController.update);
router.delete("/:categoryId", CategoryController.delete);
router.get("/:categoryId/categories", CategoryController.getSubcategories);
router.get("/:categoryId/tree", CategoryController.getCategoryTree);

export default router;
