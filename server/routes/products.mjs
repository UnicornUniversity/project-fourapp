import { Router } from "express";
import ProductController from "../api/controllers/product-controller.mjs";

const router = new Router();

router.post("/", ProductController.create);
router.get("/", ProductController.list);
router.get("/:id", ProductController.get);
router.put("/:id", ProductController.update);
router.delete("/:id", ProductController.delete);

export default router;
