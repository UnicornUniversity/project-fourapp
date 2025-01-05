import { Router } from "express";
import ProductController from "../api/controllers/product-controller.mjs";
import upload from "../middleware/upload-middleware.js";
import authMiddleware from "../middleware/auth-middleware.js";
import { checkAdminRole } from "../middleware/role-middleware.js";

const router = new Router();

router.post("/", ProductController.create);
router.post("/:productId/variants", ProductController.addVariant);
router.get("/", ProductController.list);
router.get("/latest", ProductController.getLatest);
router.get("/:productId", ProductController.get);
router.put("/:productId", ProductController.update);
router.delete("/:productId", ProductController.delete);
router.post(
  "/:productId/variants/:variantId/images",
  authMiddleware,
  checkAdminRole,
  upload.array("images", 5),
  ProductController.uploadVariantImages
);

export default router;
