import express from "express";
import authenticate from "../middlewares/authentication.js";
import authorize from "../middlewares/authorization.js";
import {
  getProduct,
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../controllers/productcontroller.js";

const router = express.Router();

router.get("/", getProducts);
router.get("/:id", getProduct);
router.post("/", authenticate, authorize("admin"), createProduct);
router.patch("/:id", authenticate, authorize("admin"), updateProduct);
router.delete("/:id", authenticate, authorize("admin"), deleteProduct);
export default router;
