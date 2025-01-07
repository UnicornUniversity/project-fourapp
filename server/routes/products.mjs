import { Router } from "express";
import ProductController from "../api/controllers/product-controller.mjs";
import upload from "../middleware/upload-middleware.js";

const router = new Router();

router.post("/", upload.array("images", 5), ProductController.create);
router.post(
  "/:productId/variants",
  upload.array("images", 5),
  ProductController.addVariant
);
router.get("/", ProductController.list);
router.get("/latest", ProductController.getLatest);
router.get("/:productId", ProductController.get);
router.put("/:productId", ProductController.update);
router.delete("/:productId", ProductController.delete);

export default router;
