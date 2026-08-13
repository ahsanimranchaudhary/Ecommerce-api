import express from "express";
import authenticate from "../middlewares/authentication.js";
import authorize from "../middlewares/authorization.js";
import {
  createOrder,
  getuserOrderbyId,
  getalluserOrder,
  deleteuserOrderbyId,
  deletealluserOrder,
  getOrders, // admin
  updateOrderstatus, // admin
} from "../controllers/orderController.js";

const router = express.Router();
router.post("/", authenticate, createOrder);
router.get("/", authenticate, getalluserOrder);
router.delete("/", authenticate, deletealluserOrder);
router.get("/:orderId", authenticate, getuserOrderbyId);
router.delete("/:orderId", authenticate, deleteuserOrderbyId);

router.get("/admin", authenticate, authorize("admin"), getOrders);
router.patch("/admin/:orderId/status",authenticate,authorize("admin"),updateOrderstatus,);

export default router;
