import express from "express";
import { signup, signin } from "../controllers/authController.js";
const router = express.Router();

router.post("/api/auth/signup", signup);
router.post("/api/auth/signin", signin);

export default router;