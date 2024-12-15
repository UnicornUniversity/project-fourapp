import { Router } from "express";
import ProductController from "../api/controllers/product-controller.mjs";

const router = new Router();

router.post("/", ProductController.create);
router.get("/", ProductController.list);
router.get("/:productId", ProductController.get);
router.put("/:productId", ProductController.update);
router.delete("/:productId", ProductController.delete);
router.get("/latest", ProductController.getLatest);

export default router;
