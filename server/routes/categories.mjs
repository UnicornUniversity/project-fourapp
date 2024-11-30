import { Router } from "express";
import CategoryController from "../api/controllers/category-controller.mjs";

const router = new Router();

router.post("/", CategoryController.create);
router.get("/", CategoryController.list);
router.get(":id", CategoryController.get);
router.put(":id", CategoryController.update);
router.delete(":id", CategoryController.delete);
router.get("/:categoryId/categories", CategoryController.getSubcategories);
router.get("/:categoryId/tree", CategoryController.getCategoryTree);

export default router;
