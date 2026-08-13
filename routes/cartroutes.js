import express from "express";
import authenticate from "../middlewares/authentication.js";
import authorize from "../middlewares/authorization.js";
import {
  createCart,
  getCart,
  getallCarts,
  addItemtoCart,
  removeCartItem,
  deleteCart,
  getCarts,
} from "../controllers/cartController.js";

const router = express.Router();
router.get("/Allcarts", authenticate, authorize("admin"), getCarts);
router.post("/", authenticate, createCart);
router.get("/", authenticate, getallCarts);
router.get("/:cartId", authenticate, getCart);
router.patch("/:cartId/add", authenticate, addItemtoCart);
router.delete("/:cartId/items/:itemsId", authenticate, removeCartItem);
router.delete("/:cartId", authenticate, deleteCart);
export default router;
