import express from "express";
import { signup, signin, google, logout } from "../controllers/authController.js";
const router = express.Router();

router.post("/api/auth/signup", signup);
router.post("/api/auth/signin", signin);
router.post("/api/auth/google", google);
router.get("/api/auth/logout", logout)

export default router;