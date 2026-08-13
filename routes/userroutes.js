import express from "express";
import authenticate from "../middlewares/authentication.js";
import authorize from "../middlewares/authorization.js";
import {
  registerUser,
  loginUser,
  getallUser,
} from "../controllers/usercontroller.js";
const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/admin/getallusers", authenticate, authorize("admin"), getallUser);

export default router;
